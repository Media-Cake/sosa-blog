import type { ReactNode } from 'react';
import classNames from 'classnames';
import styles from './FeaturedImage.module.scss';

type FeaturedImageProps = {
  title: string;
  image?: string;
  variant?: 'default' | 'notFound';
  children?: ReactNode;
};

export function FeaturedImage({
  title,
  image,
  variant = 'default',
  children,
}: FeaturedImageProps) {
  const style = image ? { backgroundImage: `url('${image}')` } : undefined;

  return (
    <div
      className={classNames(styles.featured, {
        [styles.notFound]: variant === 'notFound',
      })}
      style={style}
    >
      <div className={styles.overlay} />
      <h1
        className={classNames(
          styles.title,
          'text-center d-block d-md-none p-3',
        )}
      >
        {title}
      </h1>
      <div className={styles.bottom}>
        <h2 className={classNames(styles.title, 'd-none d-md-block')}>
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
}
