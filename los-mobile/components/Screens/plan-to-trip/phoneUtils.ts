// Функция для очистки номера телефона от всех символов кроме цифр и +
export const cleanPhoneNumber = (phone: string): string => {
  if (!phone) return '';
  return phone.replace(/[^\d+]/g, '');
};

// Функция для извлечения первого номера из строки контактов
export const extractPhoneNumber = (contacts: string): string | null => {
  if (!contacts) return null;
  // Ищем паттерны номеров: +7, 8, или начинающиеся с цифр
  const phonePattern = /[\+]?[7-8]?[\s\-\(\)]?[\d\s\-\(\)]{10,}/g;
  const matches = contacts.match(phonePattern);
  if (matches && matches.length > 0) {
    return cleanPhoneNumber(matches[0]);
  }
  // Если паттерн не найден, просто очищаем всю строку
  const cleaned = cleanPhoneNumber(contacts);
  return cleaned.length >= 10 ? cleaned : null;
};

