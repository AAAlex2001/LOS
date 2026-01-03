import i18n from './i18n.config';
import { useTranslation as useI18nTranslation } from 'react-i18next';

export { i18n };
export { useI18nTranslation as useTranslation };

export const changeLanguage = async (language: string) => {
  await i18n.changeLanguage(language);
};

export const getCurrentLanguage = () => i18n.language;

export default i18n;
