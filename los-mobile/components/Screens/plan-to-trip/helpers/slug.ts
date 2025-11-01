export const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/[^a-z0-9\-а-яё]/gu, '');

