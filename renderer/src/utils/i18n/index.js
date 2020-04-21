import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import fr from './locales/fr.json';

const options = {
  debug: process.env.NODE_ENV === 'development',
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
    wait: false
  },
  lng: 'en',
  resources: {
    en: {
      translation: en.en,
    },
    fr: {
      translation: fr.fr,
    },
  },
  fallbackLng: 'en',

};

i18n
  .use(initReactI18next)
  .init(options);

export default i18n;
