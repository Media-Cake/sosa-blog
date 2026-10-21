import { Link } from 'react-router';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { Icon, type IconName } from '@components/Icon';
import styles from './Header.module.scss';

export function Header() {
  const { t } = useTranslation('common', { keyPrefix: 'header' });
  const socialLinks: Array<{ icon: IconName; href: string; labelKey: string }> =
    [
      { icon: 'home', href: 'https://sosa.net', labelKey: 'sosaHome' },
      {
        icon: 'facebook',
        href: 'https://facebook.com/SoSaCommunity',
        labelKey: 'facebook',
      },
      {
        icon: 'twitter',
        href: 'https://twitter.com/ChatPlayShare',
        labelKey: 'twitter',
      },
      {
        icon: 'youtube',
        href: 'https://youtube.com/c/sosacommunity',
        labelKey: 'youtube',
      },
      {
        icon: 'steam',
        href: 'https://steamcommunity.com/groups/chatplayshare',
        labelKey: 'steam',
      },
      {
        icon: 'linkedin',
        href: 'https://www.linkedin.com/company/sosa-community/',
        labelKey: 'linkedin',
      },
    ];
  return (
    <header className={classNames(styles.masthead, 'mb-3 pt-2')} role="banner">
      <nav className={classNames(styles.navbar, 'p-0')}>
        <Link className={classNames(styles.brand, 'p-0')} to="/">
          <h1 className="d-inline">{t('brandFirst')}</h1>{' '}
          <h2 className="d-inline">{t('brandSecond')}</h2>
        </Link>
        <ul className={classNames(styles.social, 'ms-auto d-flex')}>
          {socialLinks.map((link) => (
            <li key={link.icon} className={styles.navItem}>
              <a
                href={link.href}
                className={styles.socialLink}
                aria-label={t(link.labelKey)}
              >
                <Icon name={link.icon} />
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
