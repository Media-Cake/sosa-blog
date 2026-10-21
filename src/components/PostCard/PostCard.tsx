import { Link } from 'react-router';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { findAuthor, type PostSummary } from '@data/posts';
import { formatPostDate } from '@helpers';
import placeholder from '@assets/img/lowdetailfaces.jpg';
import styles from './PostCard.module.scss';

type PostCardProps = {
  post: PostSummary;
};

export function PostCard({ post }: PostCardProps) {
  const { t, i18n } = useTranslation('common', { keyPrefix: 'postCard' });
  const author = findAuthor(post.author);
  const permalink = `/${post.slug}/`;

  return (
    <div className="col-12 col-md-4 col-lg-3">
      <div className={classNames(styles.card, 'mb-3')}>
        <img
          src={post.thumbnail ?? placeholder}
          className={styles.image}
          alt={post.title}
        />
        <div className={styles.body}>
          <p className={styles.small}>
            {t('byline', { date: formatPostDate(post.date, i18n.language) })}
            {author ? (
              <a href={author.url} rel="author">
                {author.name}
              </a>
            ) : (
              post.author
            )}
          </p>
          <h5 className={styles.title}>
            <Link to={permalink}>{post.title}</Link>
          </h5>
          <div className={styles.text}>
            <p>{post.excerpt}</p>
            <p className={styles.readMore}>
              <Link to={permalink}>{t('readFullPost')}</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
