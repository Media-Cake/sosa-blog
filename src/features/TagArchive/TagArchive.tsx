import { useParams } from 'react-router';
import { PageMeta } from '@components/PageMeta';
import { PostGrid } from '@components/PostGrid';
import { findTag, posts } from '@data/posts';
import { NotFound } from '@features/NotFound';
import { pagePath, postsWithTag } from '@helpers';

export function TagArchive() {
  const { tag: tagSlug, page: pageParam } = useParams();
  const tag = findTag(tagSlug ?? '');
  const page = Number(pageParam ?? 1);

  if (!tag) return <NotFound />;

  const basePath = `/tag/${tag.slug}/`;

  return (
    <div className="container-fluid mt-4">
      <PageMeta title={tag.name} path={pagePath(basePath, page)} />
      <PostGrid
        posts={postsWithTag(posts, tag.slug)}
        basePath={basePath}
        page={page}
      />
    </div>
  );
}
