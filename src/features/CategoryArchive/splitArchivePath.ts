export function splitArchivePath(splat: string) {
  const segments = splat.split('/').filter(Boolean);
  const pageIndex = segments.length - 2;
  const hasPage =
    pageIndex >= 0 &&
    segments[pageIndex] === 'page' &&
    /^\d+$/.test(segments[pageIndex + 1]);

  if (hasPage) {
    return {
      path: segments.slice(0, pageIndex).join('/'),
      page: Number(segments[pageIndex + 1]),
    };
  }

  return { path: segments.join('/'), page: 1 };
}
