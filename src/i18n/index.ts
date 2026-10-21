import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import common from './en/common.json';

export const i18n = i18next.use(initReactI18next);

if (!i18n.isInitialized) {
  i18n.init({
    lng: 'en',
    fallbackLng: 'en',
    defaultNS: 'common',
    resources: { en: { common } },
    interpolation: { escapeValue: false },
    initAsync: false,
  });
}
