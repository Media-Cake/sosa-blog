import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import facebook from '@assets/img/fb_icon.svg';
import twitter from '@assets/img/twitter_icon.svg';
import youtube from '@assets/img/yt_icon.svg';
import linkedin from '@assets/img/linkedin_icon.svg';
import styles from './SocialIcons.module.scss';

type SocialIconsProps = {
  variant?: 'sidebar' | 'contact';
  heading?: string;
};

export function SocialIcons({
  variant = 'sidebar',
  heading,
}: SocialIconsProps) {
  const { t } = useTranslation('common', { keyPrefix: 'social' });
  const networks = [
    {
      key: 'facebook',
      href: 'https://facebook.com/SoSaCommunity/',
      icon: facebook,
    },
    {
      key: 'twitter',
      href: 'https://twitter.com/chatplayshare',
      icon: twitter,
    },
    {
      key: 'youtube',
      href: 'https://youtube.com/c/sosacommunity',
      icon: youtube,
    },
    {
      key: 'linkedin',
      href: 'https://www.linkedin.com/company/sosa-community/',
      icon: linkedin,
    },
  ];

  return (
    <ul
      className={classNames(styles.list, {
        [styles.sidebar]: variant === 'sidebar',
        [styles.contact]: variant === 'contact',
        'text-center': variant === 'sidebar',
        'p-0': variant === 'contact',
      })}
    >
      {heading && (
        <li
          className={classNames(styles.heading, 'd-inline d-xl-inline-block')}
        >
          <h5>{heading}</h5>
        </li>
      )}
      {networks.map((network) => (
        <li key={network.key} className={styles.item}>
          <a href={network.href}>
            <img src={network.icon} alt={t(network.key)} />
          </a>
        </li>
      ))}
    </ul>
  );
}
