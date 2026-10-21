import { describe, expect, it } from 'vitest';
import { splitArchivePath } from './splitArchivePath';

describe('splitArchivePath', () => {
  it('separates a nested category path from its page number', () => {
    expect(splitArchivePath('updates/rebuild/page/2/')).toEqual({
      path: 'updates/rebuild',
      page: 2,
    });
    expect(splitArchivePath('updates/')).toEqual({ path: 'updates', page: 1 });
    expect(splitArchivePath('')).toEqual({ path: '', page: 1 });
  });

  it('treats a non-numeric page as part of the path', () => {
    expect(splitArchivePath('updates/page/x/')).toEqual({
      path: 'updates/page/x',
      page: 1,
    });
  });
});
