import { useParams } from 'react-router';
import { PageMeta } from '@components/PageMeta';
import { PostGrid } from '@components/PostGrid';
import { posts } from '@data/posts';
import { pagePath } from '@helpers';

export function Home() {
  const { page: pageParam } = useParams();
  const page = Number(pageParam ?? 1);

  return (
    <div className="container-fluid mt-4">
      <PageMeta path={pagePath('/', page)} />
      <PostGrid posts={posts} basePath="/" page={page} />
    </div>
  );
}
