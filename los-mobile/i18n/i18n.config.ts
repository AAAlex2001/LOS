import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import I18nextBackend from './backend';
import config from '@/config';

import en from './locales/en.json';
import ru from './locales/ru.json';

const LANGUAGE_KEY = '@app_language';
const API_BASE = config.API_BASE;

const languageDetector = {
  type: 'languageDetector' as const,
  async: true,
  detect: async (callback: (lang: string) => void) => {
    try {
      const savedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
      if (savedLanguage) {
        callback(savedLanguage);
      } else {
        callback('ru');
      }
    } catch (error) {
      callback('ru');
    }
  },
  init: () => {},
  cacheUserLanguage: async (language: string) => {
    try {
      await AsyncStorage.setItem(LANGUAGE_KEY, language);
    } catch (error) {
      console.error('Error saving language', error);
    }
  },
};

i18n
  .use(I18nextBackend)
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    // Локальные переводы как fallback
    resources: {
      en: { translation: en },
      ru: { translation: ru },
    },
    fallbackLng: 'ru',
    backend: {
      loadPath: `${API_BASE}/api/translations/{{lng}}/`,
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
