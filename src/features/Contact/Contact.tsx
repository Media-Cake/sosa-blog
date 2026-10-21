import { useState, type FormEvent } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { PageMeta } from '@components/PageMeta';
import { SocialIcons } from '@components/SocialIcons';
import { routes } from '@routes';
import styles from './Contact.module.scss';

export function Contact() {
  const { t } = useTranslation('common', { keyPrefix: 'contact' });
  const contactEmail = 'hello@chatplayshare.com';
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const subject = encodeURIComponent(t('emailSubject', { name }));
    const body = encodeURIComponent(`${message}\n\n${name} <${email}>`);
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <div className={classNames(styles.container, 'container-fluid mt-4')}>
      <PageMeta title={t('title')} path={routes.contact} />
      <div className="row">
        <div className="col-6 mx-auto text-center">
          <div className="row">
            <div className="col-6">
              <h2>{t('getInTouch')}</h2>
              <div
                className={classNames(styles.form, 'p-4 text-start rounded')}
              >
                <form onSubmit={handleSubmit}>
                  <div className={styles.group}>
                    <label htmlFor="contact-name">{t('yourName')}</label>
                    <input
                      id="contact-name"
                      type="text"
                      className={styles.control}
                      required
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                    />
                  </div>
                  <div className={styles.group}>
                    <label htmlFor="contact-email">{t('yourEmail')}</label>
                    <input
                      id="contact-email"
                      type="email"
                      className={styles.control}
                      required
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                  </div>
                  <div className={styles.group}>
                    <label htmlFor="contact-message">{t('yourMessage')}</label>
                    <textarea
                      id="contact-message"
                      rows={10}
                      className={styles.control}
                      value={message}
                      onChange={(event) => setMessage(event.target.value)}
                    />
                  </div>
                  <p>
                    <input
                      type="submit"
                      className={styles.submit}
                      value={t('send')}
                    />
                  </p>
                </form>
              </div>
            </div>
            <div className="col-6">
              <h2>{t('socialMedia')}</h2>
              <SocialIcons variant="contact" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
