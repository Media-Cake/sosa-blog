import { Link } from 'react-router';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import type { PostSummary } from '@data/posts';
import placeholder from '@assets/img/lowdetailfaces.jpg';
import styles from './RelatedPosts.module.scss';

type RelatedPostsProps = {
  posts: PostSummary[];
};

export function RelatedPosts({ posts }: RelatedPostsProps) {
  const { t } = useTranslation('common', { keyPrefix: 'sidebar' });

  if (posts.length === 0) return null;

  return (
    <>
      <h5 className={styles.heading}>{t('otherPosts')}</h5>
      <ul className={classNames(styles.list, 'mb-4')}>
        {posts.map((post) => (
          <li key={post.slug} className={styles.item}>
            <Link
              className={classNames(styles.image, 'mb-2')}
              to={`/${post.slug}/`}
            >
              <img src={post.thumbnail ?? placeholder} alt="" />
              <div className={styles.overlay} />
              <span>{post.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
