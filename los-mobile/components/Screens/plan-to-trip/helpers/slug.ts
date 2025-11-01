export const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .normalize('NFD').replace(/\p{Diacritic}/gu, '')
    .replace(/[\s_]+/g, '-')
    .replace(/[^a-z0-9\-а-яё]/gu, '');

