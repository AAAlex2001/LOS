// Функция для очистки номера телефона от всех символов кроме цифр и +
export const cleanPhoneNumber = (phone: string): string => {
  if (!phone) return '';
  return phone.replace(/[^\d+]/g, '');
};

// Функция для извлечения первого номера из строки контактов
export const extractPhoneNumber = (contacts: string): string | null => {
  if (!contacts) return null;
  // Ищем паттерны номеров: +7, 8, или начинающиеся с цифр
  // Расширяем регулярное выражение для поддержки разных типов тире и пробелов
  const phonePattern = /[\+]?[7-8]?[\s\-\(\)\u00A0\u2013\u2014]?[\d\s\-\(\)\u00A0\u2013\u2014]{10,}/g;
  const matches = contacts.match(phonePattern);
  if (matches && matches.length > 0) {
    return cleanPhoneNumber(matches[0]);
  }
  // Если паттерн не найден, просто очищаем всю строку
  const cleaned = cleanPhoneNumber(contacts);
  return cleaned.length >= 10 ? cleaned : null;
};

export type ContactSegment = {
  type: 'text' | 'phone' | 'email';
  value: string;
  url?: string;
};

export const parseContactString = (text: string): ContactSegment[] => {
  if (!text) return [];

  const segments: ContactSegment[] = [];
  
  // Регулярное выражение для телефонов:
  // 1. Полные номера с +7 или 8: +7 (999) 999-99-99, 89999999999 и т.д.
  // 2. Короткие номера (5-7 цифр) с разделителями: 2-20-85, 22-22-18, 222-22-22
  const phoneRegex = /(?:(?:\+?7|8)(?:[\s\-\(\)\u00A0\u2013\u2014]*\(?\d{3}\)?[\s\-\(\)\u00A0\u2013\u2014]*\d{3}[\s\-\(\)\u00A0\u2013\u2014]*\d{2}[\s\-\(\)\u00A0\u2013\u2014]*\d{2})|(?:\+?7|8)\d{10}|(?:\b\d{1,3}[\s\-\u00A0\u2013\u2014]\d{2}[\s\-\u00A0\u2013\u2014]\d{2}\b))/g;
  
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

  // Собираем все совпадения
  const matches: { index: number; length: number; type: 'phone' | 'email'; value: string }[] = [];

  let match;
  while ((match = phoneRegex.exec(text)) !== null) {
    matches.push({
      index: match.index,
      length: match[0].length,
      type: 'phone',
      value: match[0]
    });
  }

  while ((match = emailRegex.exec(text)) !== null) {
    matches.push({
      index: match.index,
      length: match[0].length,
      type: 'email',
      value: match[0]
    });
  }

  // Сортируем совпадения по позиции
  matches.sort((a, b) => a.index - b.index);

  // Фильтруем перекрывающиеся совпадения (берем самое длинное или первое)
  const uniqueMatches: typeof matches = [];
  let lastEnd = 0;
  for (const m of matches) {
    if (m.index >= lastEnd) {
      uniqueMatches.push(m);
      lastEnd = m.index + m.length;
    }
  }

  // Формируем сегменты
  let currentIndex = 0;
  for (const m of uniqueMatches) {
    // Добавляем текст перед совпадением
    if (m.index > currentIndex) {
      segments.push({
        type: 'text',
        value: text.substring(currentIndex, m.index)
      });
    }

    // Добавляем само совпадение
    if (m.type === 'phone') {
      segments.push({
        type: 'phone',
        value: m.value,
        url: `tel:${cleanPhoneNumber(m.value)}`
      });
    } else {
      segments.push({
        type: 'email',
        value: m.value,
        url: `mailto:${m.value}`
      });
    }

    currentIndex = m.index + m.length;
  }

  // Добавляем оставшийся текст
  if (currentIndex < text.length) {
    segments.push({
      type: 'text',
      value: text.substring(currentIndex)
    });
  }

  return segments;
};
