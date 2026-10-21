import { useParams } from 'react-router';
import { PageMeta } from '@components/PageMeta';
import { PostGrid } from '@components/PostGrid';
import { findCategoryByPath, posts } from '@data/posts';
import { NotFound } from '@features/NotFound';
import { pagePath, postsInCategory } from '@helpers';
import { splitArchivePath } from './splitArchivePath';

export function CategoryArchive() {
  const { '*': splat } = useParams();
  const { path, page } = splitArchivePath(splat ?? '');
  const category = findCategoryByPath(path);

  if (!category) return <NotFound />;

  const basePath = `/category/${category.path}/`;

  return (
    <div className="container-fluid mt-4">
      <PageMeta title={category.name} path={pagePath(basePath, page)} />
      <PostGrid
        posts={postsInCategory(posts, category)}
        basePath={basePath}
        page={page}
      />
    </div>
  );
}
