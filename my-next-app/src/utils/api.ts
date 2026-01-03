import config from '@/config';

const CITY_NAME_RU_TO_EN: Record<string, string> = {
  'Сухум': 'Sukhum',
  'Гагра': 'Gagra',
  'Пицунда': 'Pitsunda',
  'Гудаута': 'Gudauta',
  'Новый Афон': 'New Afon',
  'Гулрыпш': 'Gulripsh',
  'Очамчыра': 'Ochamchira',
  'Ткуарчал': 'Tkuarchal',
  'Гал': 'Gal',
};

function localizeKnownCityNames(endpoint: string, locale: 'ru' | 'en'): string {
  const replacements =
    locale === 'en'
      ? CITY_NAME_RU_TO_EN
      : Object.fromEntries(Object.entries(CITY_NAME_RU_TO_EN).map(([ru, en]) => [en, ru]));

  let result = endpoint;
  for (const [from, to] of Object.entries(replacements)) {
    result = result.replaceAll(from, to);
    result = result.replaceAll(encodeURIComponent(from), encodeURIComponent(to));
  }
  return result;
}

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
  const localizedEndpoint = localizeKnownCityNames(endpoint, locale);
  const fullUrl = localizedEndpoint.startsWith('http') ? localizedEndpoint : `${baseUrl}${localizedEndpoint}`;
  return addLanguageToUrl(fullUrl, locale);
}

