import { describe, expect, it } from 'vitest';
import type { Category, PostSummary } from '@data/posts';
import {
  adjacentPosts,
  archiveMonths,
  archiveYears,
  categoryWithDescendants,
  formatMonthYear,
  formatPostDate,
  pageNumbers,
  pagePath,
  paginate,
  postsInCategory,
  postsInPeriod,
  postsWithTag,
  relatedPosts,
} from './helpers';

const post = (
  slug: string,
  date: string,
  extra: Partial<PostSummary> = {},
): PostSummary => ({
  id: 1,
  title: slug,
  slug,
  date,
  modified: date,
  author: 'james',
  categories: [],
  tags: [],
  description: '',
  excerpt: '',
  ...extra,
});

const newest = post('newest', '2021-03-15T13:41:22.000Z', {
  tags: ['sosa'],
  categories: ['updates'],
});
const middle = post('middle', '2020-12-23T20:33:39.000Z', {
  tags: ['sosa', 'chat'],
  categories: ['rebuild'],
});
const oldest = post('oldest', '2014-02-27T09:00:12.000Z', {
  categories: ['updates'],
});
const allPosts = [newest, middle, oldest];

const categoryTree: Category[] = [
  { slug: 'updates', name: 'Updates', path: 'updates', parent: null },
  {
    slug: 'rebuild',
    name: 'Rebuild',
    path: 'updates/rebuild',
    parent: 'updates',
  },
  { slug: 'gaming', name: 'Gaming', path: 'gaming', parent: null },
];

describe('formatPostDate', () => {
  it('matches the WordPress "F jS, Y" format', () => {
    expect(formatPostDate('2020-12-23T20:33:39.000Z', 'en-GB')).toBe(
      'December 23rd, 2020',
    );
    expect(formatPostDate('2021-03-01T14:19:46.000Z', 'en-GB')).toBe(
      'March 1st, 2021',
    );
    expect(formatPostDate('2014-03-22T09:00:00.000Z', 'en-GB')).toBe(
      'March 22nd, 2014',
    );
    expect(formatPostDate('2014-03-11T09:00:00.000Z', 'en-GB')).toBe(
      'March 11th, 2014',
    );
  });

  it('formats month and year archives', () => {
    expect(formatMonthYear('2020-06-07T12:40:51.000Z', 'en-GB')).toBe(
      'June 2020',
    );
  });
});

describe('pagination', () => {
  it('slices a page and reports the total', () => {
    expect(paginate([1, 2, 3, 4, 5], 2, 2)).toEqual({
      pageEntries: [3, 4],
      totalPages: 3,
    });
    expect(paginate([], 1, 12).totalPages).toBe(1);
  });

  it('builds WordPress style page paths', () => {
    expect(pagePath('/', 1)).toBe('/');
    expect(pagePath('/', 3)).toBe('/page/3/');
    expect(pagePath('/tag/sosa/', 2)).toBe('/tag/sosa/page/2/');
  });

  it('collapses distant pages into gaps like paginate_links', () => {
    expect(pageNumbers(1, 15)).toEqual([1, 2, 3, 4, 'gap', 15]);
    expect(pageNumbers(8, 15)).toEqual([
      1,
      'gap',
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      'gap',
      15,
    ]);
    expect(pageNumbers(1, 3)).toEqual([1, 2, 3]);
  });
});

describe('taxonomy queries', () => {
  it('includes child categories in a parent archive', () => {
    expect(categoryWithDescendants(categoryTree[0], categoryTree)).toEqual([
      'updates',
      'rebuild',
    ]);
    expect(
      postsInCategory(allPosts, categoryTree[0], categoryTree).map(
        (post) => post.slug,
      ),
    ).toEqual(['newest', 'middle', 'oldest']);
    expect(
      postsInCategory(allPosts, categoryTree[1], categoryTree).map(
        (post) => post.slug,
      ),
    ).toEqual(['middle']);
  });

  it('filters by tag and by period', () => {
    expect(postsWithTag(allPosts, 'chat').map((post) => post.slug)).toEqual([
      'middle',
    ]);
    expect(postsInPeriod(allPosts, '2020').map((post) => post.slug)).toEqual([
      'middle',
    ]);
    expect(
      postsInPeriod(allPosts, '2021', '3').map((post) => post.slug),
    ).toEqual(['newest']);
    expect(postsInPeriod(allPosts, '2021', '04')).toEqual([]);
  });

  it('lists archive periods', () => {
    expect(archiveYears(allPosts)).toEqual(['2014', '2020', '2021']);
    expect(archiveMonths(allPosts)).toEqual(['2014-02', '2020-12', '2021-03']);
  });
});

describe('related and adjacent posts', () => {
  it('prefers shared tags, then shared categories', () => {
    expect(relatedPosts(newest, allPosts).map((post) => post.slug)).toEqual([
      'middle',
    ]);
    expect(relatedPosts(oldest, allPosts).map((post) => post.slug)).toEqual([
      'newest',
    ]);
  });

  it('walks the date order for previous and next', () => {
    expect(adjacentPosts(middle, allPosts)).toEqual({
      previous: oldest,
      next: newest,
    });
    expect(adjacentPosts(newest, allPosts).next).toBeUndefined();
    expect(adjacentPosts(oldest, allPosts).previous).toBeUndefined();
  });
});
