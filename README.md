# SoSa Blog

Static replacement for the WordPress blog at blog.sosa.net. Vite + React, every article is an MDX
file, and the whole site is prerendered to plain HTML at build time. There is no server: `dist/` is
deployed as-is to Cloudflare Pages.

## Requirements

- Node 24, npm

## Scripts

| Command                   | What it does                                              |
| ------------------------- | --------------------------------------------------------- |
| `npm install`             | Install dependencies                                      |
| `npm run dev`             | Dev server at http://localhost:5173 with hot reload       |
| `npm run build`           | Type-check, bundle and prerender every page into `dist/`  |
| `npm run preview`         | Serve the built `dist/` locally                           |
| `npm test`                | Vitest unit tests                                         |
| `npm run lint`            | ESLint                                                    |
| `npm run format`          | Prettier                                                  |
| `npm run storybook`       | Storybook at http://localhost:6006                        |
| `npm run build-storybook` | Static Storybook build                                    |

## Layout

```
src/
  components/   Reusable UI (Header, PostCard, Pagination, Sidebar, …), one folder each with
                .tsx, .module.scss, .stories.tsx and index.ts
  features/     Pages: Home, Post, CategoryArchive, TagArchive, DateArchive, Contact, NotFound
  content/      posts/*.mdx (one per article) and the loader that code-splits them
  data/         posts.json and taxonomy.json indexes plus typed accessors (posts.ts)
  i18n/         react-i18next setup and the English strings
  assets/       Global SCSS, fonts and theme images
  routes.ts     URL patterns and prerenderPaths(), the list of every page to write
  prerender.tsx Build-time entry: renders a path to HTML (used only by vite.config.mts)
  main.tsx      Browser entry: hydrates the prerendered HTML
public/
  wp-content/uploads/   Article images, kept at their original WordPress paths
  _redirects            Cloudflare Pages redirects (author pages go to sosa.net)
```

## Writing a post

1. Add `src/content/posts/<slug>.mdx` with the frontmatter fields of `PostSummary`
   (see `src/data/posts.ts`): `slug`, `title`, `date`, `excerpt`, `author`, `categories`, `tags`,
   `featuredImage`.
2. Add a matching entry to `src/data/posts.json`. The listings, archives and sidebar read the JSON
   index rather than the MDX files, and `src/data/posts.test.ts` fails if the two drift apart.
3. Put any images under `public/wp-content/uploads/<year>/<month>/` and reference them with that
   absolute path.
4. New categories or tags also need an entry in `src/data/taxonomy.json`.

The post appears on the home page, its category/tag/date archives and the sidebar automatically.
The URL is `/<slug>/`.

## How prerendering works

`npm run build` bundles the client app, then the `sosa-prerender` plugin in `vite.config.mts` builds
`src/prerender.tsx` for Node, renders every path from `prerenderPaths()` with React's
`renderToString`, and writes `dist/<path>/index.html` (`dist/404.html` for the not-found page). The
Node build is deleted afterwards. In the browser `main.tsx` loads the current article's MDX chunk and
hydrates the existing HTML, so there is no flash of empty content and no runtime server.

## Deploying

Cloudflare Pages: build command `npm run build`, output directory `dist`.

## Origin

The articles, images and indexes were generated from the WordPress database by the migration tool in
the sibling `sosa-blog-wp/tools` checkout. That tool is only needed if the WordPress export has to be
re-run; day-to-day editing is done directly in the MDX files.
