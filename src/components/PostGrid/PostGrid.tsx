import { useTranslation } from 'react-i18next';
import { Pagination } from '@components/Pagination';
import { PostCard } from '@components/PostCard';
import type { PostSummary } from '@data/posts';
import { POSTS_PER_PAGE, paginate } from '@helpers';
import styles from './PostGrid.module.scss';

type PostGridProps = {
  posts: PostSummary[];
  basePath: string;
  page: number;
};

export function PostGrid({ posts, basePath, page }: PostGridProps) {
  const { t } = useTranslation('common', { keyPrefix: 'listing' });
  const { pageEntries, totalPages } = paginate(posts, page, POSTS_PER_PAGE);

  if (pageEntries.length === 0) {
    return (
      <div className={styles.noPosts}>
        <p>{t('noPosts')}</p>
      </div>
    );
  }

  return (
    <>
      <div className="row">
        {pageEntries.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
      <Pagination basePath={basePath} current={page} total={totalPages} />
    </>
  );
}
