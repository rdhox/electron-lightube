import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// languages
const fallbackLng = ['en'];
const availableLanguages = ['en', 'fr'];

const options = {
  fallbackLng,
  whitelist: availableLanguages,
  debug: process.env.NODE_ENV === 'development',
  interpolation: {
    escapeValue: false,
  },
};

i18n
  .use(initReactI18next)
  .init(options);

export default i18n;
