// Конфигурация API
const apiBaseRaw = process.env.NEXT_PUBLIC_API_BASE || '';
const config = {
  // Базовый URL API (берём из ENV, без завершающих слешей)
  API_BASE: apiBaseRaw.replace(/\/+$/, ''),

  // Другие настройки
  NODE_ENV: process.env.NODE_ENV || 'development',
};

export default config;

