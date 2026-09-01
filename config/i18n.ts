import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from '@/i18n/en.json';
import bnTranslations from '@/i18n/bn.json';

const resources = {
  en: {
    translation: enTranslations,
  },
  bn: {
    translation: bnTranslations,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: typeof window !== 'undefined' ? localStorage.getItem('language') || 'en' : 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
