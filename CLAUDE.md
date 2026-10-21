@../code-standards/react/STANDARD.md

## Project

Static replacement for the WordPress blog at blog.sosa.net. No backend: every page is prerendered to
plain HTML at build time and hydrated by React in the browser.

- **Content** lives in `src/content/posts/*.mdx`, one file per article, frontmatter = the fields of
  `PostSummary` in `src/data/posts.ts`. `src/data/posts.json` and `src/data/taxonomy.json` are the
  indexes the listings, archives and sidebar read; they were generated together with the MDX files by
  the migration tool in the sibling `sosa-blog-wp/tools` checkout and must stay in step (the tests in
  `src/data/posts.test.ts` check that). A new post means a new MDX file **and** a new entry in
  `posts.json`.
- **Article images** keep their WordPress paths under `public/wp-content/uploads/` so old inbound links
  keep working. Only files referenced by a post or used as a featured image were copied.
- **URLs** mirror WordPress exactly: `/<slug>/`, `/page/N/`, `/category/<path>/`, `/tag/<slug>/`,
  `/<year>/`, `/<year>/<month>/`, `/contact-us/`, all with trailing slashes. `src/routes.ts` owns the
  patterns and `prerenderPaths()` enumerates every page to write.
- **Prerendering** is the `sosa-prerender` plugin in `vite.config.mts`: after the client bundle it runs
  a Node build of `src/prerender.tsx`, renders each path with `StaticRouter`, and writes
  `dist/<path>/index.html` (`dist/404.html` for the not-found page). React 19 hoists `<title>`/`<meta>`
  rendered by `PageMeta` to the front of the string; `render()` splits them into the `<head>`. Nothing
  runs at request time: the Node build is deleted after the HTML is written and only `dist/` is deployed.
- MDX bodies are code-split: `src/content/index.ts` loads them on demand and `main.tsx` waits for the
  current post's module before hydrating so server and client markup match.
- Comments are the third-party Replybox embed the WordPress site used (`Comments` component); the
  contact form opens a `mailto:` because there is no server to post to.
- Deploy target is Cloudflare Pages (`public/_redirects` carries the author-page redirect).
