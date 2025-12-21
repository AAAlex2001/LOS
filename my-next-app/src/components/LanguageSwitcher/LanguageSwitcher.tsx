'use client';

import { useLocale } from '@/i18n/LocaleContext';
import styles from './LanguageSwitcher.module.scss';

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();

  return (
    <div className={styles.languageSwitcher}>
      <button
        className={`${styles.langButton} ${locale === 'ru' ? styles.active : ''}`}
        onClick={() => setLocale('ru')}
        aria-label="Русский"
      >
        RU
      </button>
      <span className={styles.separator}>|</span>
      <button
        className={`${styles.langButton} ${locale === 'en' ? styles.active : ''}`}
        onClick={() => setLocale('en')}
        aria-label="English"
      >
        EN
      </button>
    </div>
  );
}
