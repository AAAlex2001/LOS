# Локализация приложения LOS Mobile

## Быстрый старт

Приложение уже настроено для поддержки многоязычности. По умолчанию поддерживаются:
- 🇷🇺 Русский (ru)
- 🇬🇧 Английский (en)

## Использование в коде

```typescript
import { useTranslation } from '@/i18n';

function MyComponent() {
  const { t } = useTranslation();

  return <Text>{t('common.loading')}</Text>;
}
```

## Переключение языка

Пользователи могут переключать язык через:
1. Боковое меню (Sidebar) → "Выберите язык"
2. Программно:

```typescript
import { changeLanguage } from '@/i18n';

await changeLanguage('en'); // Переключить на английский
```

## Структура файлов

- `locales/ru.json` - Русские переводы
- `locales/en.json` - Английские переводы
- `i18n.config.ts` - Конфигурация i18next
- `index.ts` - Экспорт утилит

## Автоматическая локализация

Для автоматической замены хардкод строк используйте скрипт:

```bash
node scripts/auto-localize.js
```

⚠️ Скрипт создает бэкапы файлов (.backup) - проверьте результат перед удалением.

## Добавление нового языка

1. Создайте файл `locales/новый-код.json`
2. Скопируйте структуру из `ru.json`
3. Переведите все значения
4. Добавьте в `i18n.config.ts`:

```typescript
import newLang from './locales/новый-код.json';

resources: {
  'новый-код': { translation: newLang },
  // ...
}
```

## Интеграция с API

### Получение языка пользователя

```typescript
// В корневом компоненте или при входе
const loadUserLanguage = async () => {
  const response = await fetch(`${API_BASE}/api/user/profile/`);
  const { language } = await response.json();
  await changeLanguage(language || 'ru');
};
```

### Сохранение выбора языка

```typescript
import { changeLanguage } from '@/i18n';

const handleLanguageChange = async (code: string) => {
  // Изменить локально
  await changeLanguage(code);

  // Сохранить на сервер
  await fetch(`${API_BASE}/api/user/language/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ language: code })
  });
};
```

## Категории переводов

### common
Общие элементы интерфейса (кнопки, загрузка, формы)

### navigation
Элементы навигации (меню, вкладки)

### language
Названия языков и элементы выбора языка

### about
Раздел "Об Абхазии"

### entertainment
Раздел "Развлечения"

### plan_trip
Раздел "Запланируйте поездку"

### important
Раздел "Важно знать"

### cities
Названия городов

### categories
Категории мест (отели, рестораны и т.д.)

### footer
Футер и контакты

## Полезные команды

```bash
# Найти все хардкод строки
node scripts/localize-components.js

# Автоматически локализовать
node scripts/auto-localize.js

# Проверить синтаксис JSON
node -e "require('./locales/ru.json')"
node -e "require('./locales/en.json')"
```

## Решение проблем

### Перевод не отображается
1. Проверьте, есть ли ключ в обоих файлах (ru.json и en.json)
2. Убедитесь, что `@/i18n` импортирован в `app/_layout.tsx`
3. Перезапустите приложение

### Язык не сохраняется
Убедитесь, что установлен `@react-native-async-storage/async-storage`:
```bash
npm install @react-native-async-storage/async-storage
```

### Ошибки типов TypeScript
Добавьте типы для i18next в `tsconfig.json`:
```json
{
  "compilerOptions": {
    "types": ["i18next"]
  }
}
```

## Контрольный список для новых компонентов

- [ ] Импортирован `useTranslation` из `@/i18n`
- [ ] Добавлен `const { t } = useTranslation()` в компонент
- [ ] Все текстовые строки заменены на `t('key')`
- [ ] Добавлены ключи в `ru.json`
- [ ] Добавлены переводы в `en.json`
- [ ] Проверено на обоих языках

## Подробная документация

См. [LOCALIZATION.md](../LOCALIZATION.md) для детального руководства.
