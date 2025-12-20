'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Locale = 'ru' | 'en';

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  messages: any;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

// Import messages statically
import ruMessages from '../../messages/ru.json';
import enMessages from '../../messages/en.json';

const messagesMap: Record<Locale, any> = {
  ru: ruMessages,
  en: enMessages,
};

interface LocaleProviderProps {
  children: ReactNode;
  defaultLocale?: Locale;
}

export function LocaleProvider({ children, defaultLocale = 'ru' }: LocaleProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Load saved locale from localStorage
    const savedLocale = localStorage.getItem('locale') as Locale | null;
    if (savedLocale && (savedLocale === 'ru' || savedLocale === 'en')) {
      setLocaleState(savedLocale);
    }
    setMounted(true);
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('locale', newLocale);
    // Update html lang attribute
    document.documentElement.lang = newLocale;
  };

  const messages = messagesMap[locale];

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <LocaleContext.Provider value={{ locale: defaultLocale, setLocale, messages: messagesMap[defaultLocale] }}>
        {children}
      </LocaleContext.Provider>
    );
  }

  return (
    <LocaleContext.Provider value={{ locale, setLocale, messages }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
}

// Hook to get translated messages
export function useTranslations(namespace?: string) {
  const { messages, locale } = useLocale();

  const t = (key: string, params?: Record<string, string | number>) => {
    const keys = namespace ? `${namespace}.${key}`.split('.') : key.split('.');
    let value: any = messages;

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${namespace ? `${namespace}.${key}` : key}`);
        return key;
      }
    }

    if (typeof value !== 'string') {
      console.warn(`Translation value is not a string: ${namespace ? `${namespace}.${key}` : key}`);
      return key;
    }

    // Replace parameters
    if (params) {
      return value.replace(/\{(\w+)\}/g, (_, paramKey) => {
        return params[paramKey]?.toString() || `{${paramKey}}`;
      });
    }

    return value;
  };

  return t;
}
