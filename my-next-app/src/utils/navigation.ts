import { Locale } from '@/i18n/config';

/**
 * Get localized path
 * @param path - path without locale prefix (e.g., '/cities', '/about')
 * @param locale - target locale
 * @returns localized path (e.g., '/ru/cities', '/en/about')
 */
export function getLocalizedPath(path: string, locale: Locale): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `/${locale}/${cleanPath}`;
}

/**
 * Remove locale from pathname
 * @param pathname - pathname with locale (e.g., '/ru/cities')
 * @returns pathname without locale (e.g., '/cities')
 */
export function removeLocaleFromPath(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length > 0 && (segments[0] === 'ru' || segments[0] === 'en')) {
    return '/' + segments.slice(1).join('/');
  }
  return pathname;
}

/**
 * Extract locale from pathname
 * @param pathname - pathname with locale (e.g., '/ru/cities')
 * @returns locale or null
 */
export function getLocaleFromPath(pathname: string): Locale | null {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length > 0 && (segments[0] === 'ru' || segments[0] === 'en')) {
    return segments[0] as Locale;
  }
  return null;
}
