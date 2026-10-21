import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import styles from './SignupForm.module.scss';

export function SignupForm() {
  const { t } = useTranslation('common', { keyPrefix: 'sidebar' });
  const signupAction =
    'https://madmimi.com/signups/subscribe/de86f6eec3b842c5a05e86d89afe5e40';

  return (
    <div className="mb-4 mt-4 mt-md-0">
      <h5 className={styles.heading}>{t('helpMeMakeSosa')}</h5>
      <div className="text-center pt-2">
        <form action={signupAction} acceptCharset="UTF-8" method="post">
          <input name="utf8" type="hidden" value="✓" />
          <input
            type="text"
            name="65d434965ae48e8d0d694209023ae0d3"
            className="d-none"
            tabIndex={-1}
            autoComplete="off"
          />
          <input
            type="checkbox"
            name="beacon"
            className="d-none"
            tabIndex={-1}
          />
          <div className="mb-3">
            <input
              id="signup_name"
              name="signup[name]"
              type="text"
              className={classNames(styles.control, 'mb-2')}
              placeholder={t('yourName')}
            />
            <input
              id="signup_email"
              name="signup[email]"
              type="email"
              className={styles.control}
              placeholder={t('yourEmail')}
            />
            <input
              type="submit"
              className={classNames(styles.submit, 'w-100 mt-2')}
              value={t('joinBeta')}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
