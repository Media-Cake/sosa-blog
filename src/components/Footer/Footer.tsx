import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import styles from './Footer.module.scss';

type FooterProps = {
  year?: number;
};

export function Footer({ year = new Date().getFullYear() }: FooterProps) {
  const { t } = useTranslation('common', { keyPrefix: 'footer' });

  return (
    <div className={classNames(styles.footer, 'py-3')}>
      {t('copyright', { year })}
      <a href="http://mediacakeltd.com">{t('company')}</a>
    </div>
  );
}
