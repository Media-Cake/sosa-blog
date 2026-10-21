import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { PageMeta } from '@components/PageMeta';
import { PostGrid } from '@components/PostGrid';
import { posts } from '@data/posts';
import { NotFound } from '@features/NotFound';
import { formatMonthYear, pagePath, postsInPeriod } from '@helpers';
import { isMonth, isYear } from '@routes';
import styles from './DateArchive.module.scss';

function formatArchiveLabel(
  year: string,
  month: string | undefined,
  locale: string,
) {
  if (!month) return year;

  return formatMonthYear(`${year}-${month}-01T00:00:00.000Z`, locale);
}

export function DateArchive() {
  const { t, i18n } = useTranslation('common', { keyPrefix: 'listing' });
  const { year, month, page: pageParam } = useParams();
  const page = Number(pageParam ?? 1);

  if (!year || !isYear(year) || (month !== undefined && !isMonth(month))) {
    return <NotFound />;
  }

  const paddedMonth = month?.padStart(2, '0');
  const basePath = paddedMonth ? `/${year}/${paddedMonth}/` : `/${year}/`;
  const headingKey = paddedMonth ? 'monthlyArchives' : 'yearlyArchives';
  const label = formatArchiveLabel(year, paddedMonth, i18n.language);

  return (
    <div className="container-fluid mt-4">
      <PageMeta title={label} path={pagePath(basePath, page)} />
      <div className="row">
        <h2 className={styles.heading}>
          {t(headingKey)}
          <span>{label}</span>
        </h2>
        <PostGrid
          posts={postsInPeriod(posts, year, paddedMonth)}
          basePath={basePath}
          page={page}
        />
      </div>
    </div>
  );
}
