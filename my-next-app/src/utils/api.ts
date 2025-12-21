import config from '@/config';

/**
 * Добавляет параметр языка к URL API запроса
 * @param url - URL для запроса
 * @param locale - Язык ('ru' | 'en')
 * @returns URL с параметром lang
 */
export function addLanguageToUrl(url: string, locale: 'ru' | 'en'): string {
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}lang=${locale}`;
}

/**
 * Создает URL для API запроса с учетом языка
 * @param endpoint - Endpoint API (например, '/api/home/page/content/')
 * @param locale - Язык ('ru' | 'en')
 * @returns Полный URL с базовым адресом и параметром языка
 */
export function getApiUrl(endpoint: string, locale: 'ru' | 'en'): string {
  const baseUrl = config.API_BASE;
  const fullUrl = endpoint.startsWith('http') ? endpoint : `${baseUrl}${endpoint}`;
  return addLanguageToUrl(fullUrl, locale);
}

