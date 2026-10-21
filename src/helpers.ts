import { categories, type Category, type PostSummary } from '@data/posts';

export const POSTS_PER_PAGE = 12;

const ordinalSuffix = (day: number) => {
  const remainderOfHundred = day % 100;
  if (remainderOfHundred >= 11 && remainderOfHundred <= 13) return 'th';

  const remainderOfTen = day % 10;
  if (remainderOfTen === 1) return 'st';
  if (remainderOfTen === 2) return 'nd';
  if (remainderOfTen === 3) return 'rd';
  return 'th';
};

export function formatPostDate(isoDate: string, locale = 'en-GB') {
  const date = new Date(isoDate);
  const month = new Intl.DateTimeFormat(locale, {
    month: 'long',
    timeZone: 'UTC',
  }).format(date);
  const day = date.getUTCDate();

  return `${month} ${day}${ordinalSuffix(day)}, ${date.getUTCFullYear()}`;
}

export function formatMonthYear(isoDate: string, locale = 'en-GB') {
  return new Intl.DateTimeFormat(locale, {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(isoDate));
}

export function paginate<Entry>(
  entries: Entry[],
  page: number,
  perPage: number,
) {
  const totalPages = Math.max(1, Math.ceil(entries.length / perPage));
  const start = (page - 1) * perPage;

  return { pageEntries: entries.slice(start, start + perPage), totalPages };
}

export function pagePath(basePath: string, page: number) {
  if (page <= 1) return basePath;
  return `${basePath}page/${page}/`;
}

export function pageNumbers(current: number, total: number, midSize = 3) {
  const numbers: Array<number | 'gap'> = [];
  for (let page = 1; page <= total; page += 1) {
    const nearCurrent = Math.abs(page - current) <= midSize;
    const isEnd = page === 1 || page === total;
    if (nearCurrent || isEnd) {
      numbers.push(page);
      continue;
    }

    const last = numbers[numbers.length - 1];
    if (last !== 'gap') numbers.push('gap');
  }

  return numbers;
}

export function categoryWithDescendants(
  category: Category,
  all: Category[] = categories,
): string[] {
  const children = all.filter(
    (candidate) => candidate.parent === category.slug,
  );
  return [
    category.slug,
    ...children.flatMap((child) => categoryWithDescendants(child, all)),
  ];
}

export function postsInCategory(
  allPosts: PostSummary[],
  category: Category,
  allCategories: Category[] = categories,
) {
  const slugs = new Set(categoryWithDescendants(category, allCategories));
  return allPosts.filter((post) =>
    post.categories.some((slug) => slugs.has(slug)),
  );
}

export function postsWithTag(allPosts: PostSummary[], tag: string) {
  return allPosts.filter((post) => post.tags.includes(tag));
}

export function postsInPeriod(
  allPosts: PostSummary[],
  year: string,
  month?: string,
) {
  const prefix = month ? `${year}-${month.padStart(2, '0')}` : year;
  return allPosts.filter((post) => post.date.startsWith(prefix));
}

export function relatedPosts(
  post: PostSummary,
  allPosts: PostSummary[],
  limit = 6,
) {
  const others = allPosts.filter((candidate) => candidate.slug !== post.slug);
  if (post.tags.length > 0) {
    const tagSet = new Set(post.tags);
    return others
      .filter((candidate) => candidate.tags.some((tag) => tagSet.has(tag)))
      .slice(0, limit);
  }

  const categorySet = new Set(post.categories);
  return others
    .filter((candidate) =>
      candidate.categories.some((slug) => categorySet.has(slug)),
    )
    .slice(0, limit);
}

export function adjacentPosts(post: PostSummary, allPosts: PostSummary[]) {
  const index = allPosts.findIndex((candidate) => candidate.slug === post.slug);
  if (index === -1) return { previous: undefined, next: undefined };

  return { previous: allPosts[index + 1], next: allPosts[index - 1] };
}

export function archiveMonths(allPosts: PostSummary[]) {
  const months = new Set(allPosts.map((post) => post.date.slice(0, 7)));
  return [...months].sort();
}

export function archiveYears(allPosts: PostSummary[]) {
  const years = new Set(allPosts.map((post) => post.date.slice(0, 4)));
  return [...years].sort();
}
