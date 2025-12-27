'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Locale, locales } from './config';

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
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    // Update html lang attribute
    if (typeof window !== 'undefined') {
      document.documentElement.lang = defaultLocale;
    }
  }, [defaultLocale]);

  const setLocale = (newLocale: Locale) => {
    if (!locales.includes(newLocale)) return;
    
    setLocaleState(newLocale);
    
    if (typeof window !== 'undefined') {
      // Update html lang attribute
      document.documentElement.lang = newLocale;
      
      // Get current path without locale
      const segments = pathname.split('/');
      const currentLocale = segments[1];
      
      // Replace locale in URL
      if (locales.includes(currentLocale as Locale)) {
        segments[1] = newLocale;
      } else {
        segments.splice(1, 0, newLocale);
      }
      
      const newPath = segments.join('/');
      router.push(newPath);
    }
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
    // Во время статической генерации возвращаем значения по умолчанию
    if (typeof window === 'undefined') {
      return {
        locale: 'ru' as Locale,
        setLocale: () => {},
        messages: messagesMap['ru'],
      };
    }
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
