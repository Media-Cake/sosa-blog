import type { MDXContent } from 'mdx/types';

type PostModule = { default: MDXContent };

const modules = import.meta.glob<PostModule>('./posts/*.mdx');
const loaded = new Map<string, MDXContent>();
const pending = new Map<string, Promise<MDXContent>>();

const modulePath = (slug: string) => `./posts/${slug}.mdx`;

export function loadPostContent(slug: string) {
  const cached = loaded.get(slug);
  if (cached) return Promise.resolve(cached);

  const inFlight = pending.get(slug);
  if (inFlight) return inFlight;

  const importer = modules[modulePath(slug)];
  if (!importer) return Promise.reject(new Error(`Unknown post ${slug}`));

  const promise = importer().then((module) => {
    loaded.set(slug, module.default);
    pending.delete(slug);
    return module.default;
  });
  pending.set(slug, promise);
  return promise;
}

export function readPostContent(slug: string) {
  const content = loaded.get(slug);
  if (content) return content;

  throw loadPostContent(slug);
}
