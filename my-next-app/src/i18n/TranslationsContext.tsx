'use client';

import { useLocale } from './LocaleContext';

/**
 * Hook for accessing translations
 * Uses dot notation to access nested keys: t('common.error')
 */
export function useTranslations() {
  const { messages } = useLocale();

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = messages;

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }

    return typeof value === 'string' ? value : key;
  };

  return t;
}
