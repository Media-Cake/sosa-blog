import { useEffect } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import styles from './Comments.module.scss';

type CommentsProps = {
  identifier: string;
};

type ReplyboxWindow = Window & {
  replybox?: { site: string; identifier: string };
};

export function Comments({ identifier }: CommentsProps) {
  const { t } = useTranslation('common', { keyPrefix: 'post' });

  useEffect(() => {
    const replyboxSite = 'E9rYZDkB2L';
    const replyboxEmbed = 'https://cdn.getreplybox.com/js/embed.js';
    const host = window as ReplyboxWindow;
    host.replybox = { site: replyboxSite, identifier };

    const script = document.createElement('script');
    script.src = replyboxEmbed;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      script.remove();
      delete host.replybox;
    };
  }, [identifier]);

  return (
    <div className={classNames(styles.comments, 'mt-4')}>
      <h2>{t('comments')}</h2>
      <div className={classNames(styles.inner, 'rounded p-4')}>
        <div id="replybox" key={identifier} />
      </div>
    </div>
  );
}
