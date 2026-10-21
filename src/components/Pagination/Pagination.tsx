import { Link } from 'react-router';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { pageNumbers, pagePath } from '@helpers';
import styles from './Pagination.module.scss';

type PaginationProps = {
  basePath: string;
  current: number;
  total: number;
};

export function Pagination({ basePath, current, total }: PaginationProps) {
  const { t } = useTranslation('common', { keyPrefix: 'pagination' });

  if (total < 2) return null;

  return (
    <div className="row">
      <nav
        className={classNames(styles.container, 'w-100')}
        aria-label={t('label')}
      >
        <ul className={classNames(styles.pagination, 'justify-content-center')}>
          {current > 1 && (
            <li className={styles.item}>
              <Link
                className={styles.link}
                to={pagePath(basePath, current - 1)}
              >
                {t('previous')}
              </Link>
            </li>
          )}
          {pageNumbers(current, total).map((page, index) => {
            if (page === 'gap') {
              return (
                <li key={`gap-${index}`} className={styles.item}>
                  <span className={classNames(styles.link, styles.dots)}>
                    {t('gap')}
                  </span>
                </li>
              );
            }

            const isCurrent = page === current;
            return (
              <li
                key={page}
                className={classNames(styles.item, {
                  [styles.active]: isCurrent,
                })}
              >
                {isCurrent ? (
                  <span aria-current="page" className={styles.link}>
                    {page}
                  </span>
                ) : (
                  <Link className={styles.link} to={pagePath(basePath, page)}>
                    {page}
                  </Link>
                )}
              </li>
            );
          })}
          {current < total && (
            <li className={styles.item}>
              <Link
                className={styles.link}
                to={pagePath(basePath, current + 1)}
              >
                {t('next')}
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}
