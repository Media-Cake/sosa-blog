import { useTranslation } from 'react-i18next';
import patreon from '@assets/img/patreon.svg';
import styles from './PatreonButton.module.scss';

export function PatreonButton() {
  const { t } = useTranslation('common', { keyPrefix: 'sidebar' });

  return (
    <div className="mb-4 mt-4 mt-md-0">
      <div className="text-center pt-2">
        <a
          href="https://www.patreon.com/bePatron?u=28827124"
          className={styles.button}
        >
          <img src={patreon} alt="" />
          {t('becomeAPatron')}
        </a>
      </div>
    </div>
  );
}
