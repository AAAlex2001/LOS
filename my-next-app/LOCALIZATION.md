# Локализация (i18n)

## Структура

Проект поддерживает два языка: **русский (ru)** и **английский (en)**

### URL структура

Все страницы доступны с префиксом локали:
- `/ru/` - русская версия (по умолчанию)
- `/en/` - английская версия

Примеры:
- `/ru/cities` - города на русском
- `/en/cities` - города на английском

### Файлы переводов

Переводы находятся в `messages/`:
- `messages/ru.json` - русские переводы
- `messages/en.json` - английские переводы

### Использование в компонентах

#### Получение переводов

```tsx
import { useTranslations, useLocale } from '@/i18n/LocaleContext';

function MyComponent() {
  const t = useTranslations('namespace');
  const { locale } = useLocale();
  
  return <div>{t('key')}</div>;
}
```

#### Смена языка

Компонент `LanguageSwitcher` автоматически переключает язык и обновляет URL:

```tsx
import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher';

<LanguageSwitcher />
```

#### Локализованные ссылки

Используйте компонент `LocaleLink` для автоматического добавления префикса локали:

```tsx
import LocaleLink from '@/components/LocaleLink/LocaleLink';

<LocaleLink href="/cities">Cities</LocaleLink>
// Рендерится как /ru/cities или /en/cities
```

Или вручную с `useLocale`:

```tsx
const { locale } = useLocale();
<Link href={`/${locale}/cities`}>Cities</Link>
```

### Middleware

`src/middleware.ts` автоматически перенаправляет запросы без локали на `/ru` (по умолчанию)

Например: `/cities` → `/ru/cities`

### Конфигурация

Настройки локализации в `src/i18n/config.ts`:

```typescript
export const locales = ['ru', 'en'] as const;
export const defaultLocale: Locale = 'ru';
```

### Метаданные

Метаданные (SEO) генерируются динамически в `app/[locale]/layout.tsx` на основе локали:

```tsx
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;
  const messages = await import(`../../../messages/${locale}.json`);
  // ...
}
```

### API запросы

Используйте утилиту `getApiUrl` для добавления параметра `lang`:

```tsx
import { getApiUrl } from '@/utils/api';

const url = getApiUrl('/api/cities/', locale);
// Результат: http://backend/api/cities/?lang=ru
```

## Добавление новых переводов

1. Добавьте ключи в оба файла `messages/ru.json` и `messages/en.json`
2. Используйте их через `useTranslations('namespace')`

Пример:

```json
// messages/ru.json
{
  "mySection": {
    "title": "Мой раздел"
  }
}

// messages/en.json
{
  "mySection": {
    "title": "My Section"
  }
}
```

```tsx
const t = useTranslations('mySection');
<h1>{t('title')}</h1>
```
