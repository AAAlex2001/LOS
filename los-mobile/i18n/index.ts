import i18n from './i18n.config';
import { useTranslation as useI18nTranslation } from 'react-i18next';

export { i18n };
export { useI18nTranslation as useTranslation };

export const changeLanguage = async (language: string) => {
  await i18n.changeLanguage(language);
};

export const getCurrentLanguage = () => i18n.language || 'ru';

/**
 * Добавить параметр lang к URL для API запросов к Django backend.
 * Django middleware распознает параметр ?lang=ru или ?lang=en и возвращает нужные переводы.
 *
 * @param url - базовый URL
 * @returns URL с параметром ?lang=ru или ?lang=en
 *
 * @example
 * addLangParam('/api/cities/page/content/') // => '/api/cities/page/content/?lang=ru'
 * addLangParam('/api/banks/page/content/?foo=bar') // => '/api/banks/page/content/?foo=bar&lang=ru'
 */
export const addLangParam = (url: string): string => {
  const lang = getCurrentLanguage();
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}lang=${lang}`;
};

export default i18n;
