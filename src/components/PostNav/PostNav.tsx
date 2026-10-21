import { Link } from 'react-router';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import type { PostSummary } from '@data/posts';
import styles from './PostNav.module.scss';

type PostNavProps = {
  previous?: PostSummary;
  next?: PostSummary;
};

export function PostNav({ previous, next }: PostNavProps) {
  const { t } = useTranslation('common', { keyPrefix: 'post' });

  if (!previous && !next) return null;

  return (
    <nav className={classNames(styles.nav, 'my-4')}>
      <div className={styles.links}>
        {previous && (
          <Link
            to={`/${previous.slug}/`}
            rel="prev"
            className={styles.previous}
          >
            {t('previous', { title: previous.title })}
          </Link>
        )}
        {next && (
          <Link to={`/${next.slug}/`} rel="next" className={styles.next}>
            {t('next', { title: next.title })}
          </Link>
        )}
      </div>
    </nav>
  );
}
