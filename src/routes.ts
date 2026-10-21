import { categories, findPost, posts, tags } from '@data/posts';
import {
  POSTS_PER_PAGE,
  archiveMonths,
  archiveYears,
  pagePath,
  postsInCategory,
  postsInPeriod,
  postsWithTag,
} from '@helpers';

export const routes = {
  home: '/',
  homePage: '/page/:page/',
  post: '/:slug/',
  category: '/category/*',
  tag: '/tag/:tag/',
  tagPage: '/tag/:tag/page/:page/',
  yearPage: '/:year/page/:page/',
  month: '/:year/:month/',
  monthPage: '/:year/:month/page/:page/',
  contact: '/contact-us/',
  notFound: '*',
} as const;

export const NOT_FOUND_PATH = '/404.html';

export const isYear = (value: string | undefined) =>
  /^\d{4}$/.test(value ?? '');

export const isMonth = (value: string | undefined) =>
  /^(0?[1-9]|1[0-2])$/.test(value ?? '');

export function postSlugFromPath(path: string) {
  const match = path.match(/^\/([^/]+)\/?$/);
  if (!match) return undefined;

  return findPost(match[1])?.slug;
}

const listingPaths = (basePath: string, count: number) => {
  const totalPages = Math.max(1, Math.ceil(count / POSTS_PER_PAGE));
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  return pages.map((page) => pagePath(basePath, page));
};

export function prerenderPaths() {
  const home = listingPaths('/', posts.length);
  const singles = posts.map((post) => `/${post.slug}/`);
  const categoryArchives = categories.flatMap((category) =>
    listingPaths(
      `/category/${category.path}/`,
      postsInCategory(posts, category).length,
    ),
  );
  const tagArchives = tags
    .filter((tag) => postsWithTag(posts, tag.slug).length > 0)
    .flatMap((tag) =>
      listingPaths(`/tag/${tag.slug}/`, postsWithTag(posts, tag.slug).length),
    );
  const yearArchives = archiveYears(posts).flatMap((year) =>
    listingPaths(`/${year}/`, postsInPeriod(posts, year).length),
  );
  const monthArchives = archiveMonths(posts).flatMap((yearMonth) => {
    const [year, month] = yearMonth.split('-');
    return listingPaths(
      `/${year}/${month}/`,
      postsInPeriod(posts, year, month).length,
    );
  });

  return [
    ...home,
    ...singles,
    ...categoryArchives,
    ...tagArchives,
    ...yearArchives,
    ...monthArchives,
    routes.contact,
    NOT_FOUND_PATH,
  ];
}
