'use client';

import { useLocale } from '@/i18n/LocaleContext';
import { useTranslations } from '@/i18n/TranslationsContext';
import styles from './LanguageSwitcher.module.scss';

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();
  const t = useTranslations();

  return (
    <div className={styles.languageSwitcher}>
      <button
        className={`${styles.langButton} ${locale === 'ru' ? styles.active : ''}`}
        onClick={() => setLocale('ru')}
        aria-label={t('common.languageRussian')}
      >
        RU
      </button>
      <span className={styles.separator}>|</span>
      <button
        className={`${styles.langButton} ${locale === 'en' ? styles.active : ''}`}
        onClick={() => setLocale('en')}
        aria-label={t('common.languageEnglish')}
      >
        EN
      </button>
    </div>
  );
}
