import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { build, type Plugin } from 'vite';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import mdx from '@mdx-js/rollup';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';

type ServerEntry = {
  render: (url: string) => Promise<{ head: string; html: string }>;
  prerenderPaths: () => string[];
};

const mdxPlugin = () =>
  mdx({
    remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter, remarkGfm],
  });

function outputFile(outDir: string, path: string) {
  if (path.endsWith('.html')) return join(outDir, path);

  return join(outDir, path, 'index.html');
}

function prerender(): Plugin {
  let outDir = 'dist';
  let root = process.cwd();

  return {
    name: 'sosa-prerender',
    apply: 'build',
    configResolved(config) {
      outDir = config.build.outDir;
      root = config.root;
    },
    async closeBundle() {
      const serverDir = resolve(root, outDir, '.server');
      await build({
        configFile: false,
        root,
        logLevel: 'warn',
        plugins: [react(), mdxPlugin()],
        resolve: { tsconfigPaths: true },
        build: {
          ssr: 'src/prerender.tsx',
          outDir: serverDir,
          emptyOutDir: true,
          copyPublicDir: false,
        },
      });

      const entry = (await import(
        pathToFileURL(join(serverDir, 'prerender.js')).href
      )) as ServerEntry;
      const template = readFileSync(
        resolve(root, outDir, 'index.html'),
        'utf8',
      );

      for (const path of entry.prerenderPaths()) {
        const { head, html } = await entry.render(path);
        const page = template
          .replace('<!--app-head-->', head)
          .replace('<!--app-html-->', html);
        const file = outputFile(resolve(root, outDir), path);
        mkdirSync(dirname(file), { recursive: true });
        writeFileSync(file, page);
      }

      rmSync(serverDir, { recursive: true, force: true });
    },
  };
}

export default defineConfig({
  plugins: [mdxPlugin(), react(), prerender()],
  resolve: { tsconfigPaths: true },
  test: {
    include: ['src/**/*.test.ts'],
  },
});
