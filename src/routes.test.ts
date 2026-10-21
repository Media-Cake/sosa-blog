import { describe, expect, it } from 'vitest';
import { posts } from '@data/posts';
import { POSTS_PER_PAGE } from '@helpers';
import { isMonth, isYear, postSlugFromPath, prerenderPaths } from './routes';

describe('prerenderPaths', () => {
  const paths = prerenderPaths();

  it('covers every post, the home pages, archives and the 404 page', () => {
    expect(paths).toContain('/');
    expect(paths).toContain('/page/2/');
    expect(paths).toContain('/a-sosa-retrospective/');
    expect(paths).toContain('/category/updates/rebuild/');
    expect(paths).toContain('/tag/sosa/');
    expect(paths).toContain('/2020/06/');
    expect(paths).toContain('/2020/');
    expect(paths).toContain('/contact-us/');
    expect(paths).toContain('/404.html');
    expect(paths.filter((path) => path.startsWith('/page/')).length).toBe(
      Math.ceil(posts.length / POSTS_PER_PAGE) - 1,
    );
  });

  it('has no duplicates and every path ends with a slash', () => {
    expect(new Set(paths).size).toBe(paths.length);
    for (const path of paths) {
      expect(path === '/404.html' || path.endsWith('/'), path).toBe(true);
    }
  });
});

describe('route guards', () => {
  it('recognises years and months', () => {
    expect(isYear('2020')).toBe(true);
    expect(isYear('page')).toBe(false);
    expect(isMonth('06')).toBe(true);
    expect(isMonth('6')).toBe(true);
    expect(isMonth('13')).toBe(false);
    expect(isMonth(undefined)).toBe(false);
  });
});

describe('postSlugFromPath', () => {
  it('returns the slug only for a known post', () => {
    expect(postSlugFromPath('/a-sosa-retrospective/')).toBe(
      'a-sosa-retrospective',
    );
    expect(postSlugFromPath('/a-sosa-retrospective')).toBe(
      'a-sosa-retrospective',
    );
    expect(postSlugFromPath('/2020/')).toBeUndefined();
    expect(postSlugFromPath('/tag/sosa/')).toBeUndefined();
    expect(postSlugFromPath('/')).toBeUndefined();
  });
});
