import classNames from 'classnames';
import { Trans, useTranslation } from 'react-i18next';
import { FeaturedImage } from '@components/FeaturedImage';
import { PageMeta } from '@components/PageMeta';
import { Sidebar } from '@components/Sidebar';
import { posts } from '@data/posts';
import { NOT_FOUND_PATH } from '@routes';
import styles from './NotFound.module.scss';

export function NotFound() {
  const { t } = useTranslation('common', { keyPrefix: 'notFound' });

  return (
    <div className={classNames(styles.container, 'row')}>
      <PageMeta title={t('pageTitle')} path={NOT_FOUND_PATH} />
      <div className="col-12 col-md-8 col-lg-9">
        <FeaturedImage title={t('title')} variant="notFound" />
        <div className={classNames(styles.content, 'p-3')}>
          <p>{t('sorry')}</p>
          <p>
            <Trans
              t={t}
              i18nKey="learnMore"
              components={{
                sosa: <a href="https://sosa.net" />,
                link: <a href="https://sosa.net" />,
              }}
            />
          </p>
        </div>
      </div>
      <div className="col-12 col-md-4 col-lg-3">
        <Sidebar relatedPosts={posts.slice(0, 6)} />
      </div>
    </div>
  );
}
