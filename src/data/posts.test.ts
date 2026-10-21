import { describe, expect, it } from 'vitest';
import {
  authors,
  categories,
  findCategoryByPath,
  findPost,
  posts,
  tags,
} from './posts';

describe('posts index', () => {
  it('is sorted newest first', () => {
    const dates = posts.map((post) => post.date);
    const sorted = [...dates].sort((first, second) =>
      second.localeCompare(first),
    );

    expect(dates).toEqual(sorted);
  });

  it('has unique slugs', () => {
    const slugs = new Set(posts.map((post) => post.slug));

    expect(slugs.size).toBe(posts.length);
  });

  it('only references known taxonomy and authors', () => {
    const categorySlugs = new Set(categories.map((category) => category.slug));
    const tagSlugs = new Set(tags.map((tag) => tag.slug));
    const authorSlugs = new Set(authors.map((author) => author.slug));

    for (const post of posts) {
      expect(authorSlugs.has(post.author), post.slug).toBe(true);
      for (const category of post.categories) {
        expect(categorySlugs.has(category), `${post.slug} ${category}`).toBe(
          true,
        );
      }
      for (const tag of post.tags) {
        expect(tagSlugs.has(tag), `${post.slug} ${tag}`).toBe(true);
      }
    }
  });

  it('resolves nested category paths', () => {
    expect(findCategoryByPath('updates/rebuild')?.slug).toBe('rebuild');
    expect(findCategoryByPath('rebuild')).toBeUndefined();
  });

  it('finds posts by slug', () => {
    expect(findPost('a-sosa-retrospective')?.title).toBe(
      'A SoSa Retrospective',
    );
    expect(findPost('nope')).toBeUndefined();
  });
});
