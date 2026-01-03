# Руководство по локализации приложения

## Обзор

Приложение использует библиотеку `i18next` с `react-i18next` для поддержки нескольких языков.

## Структура

```
los-mobile/
├── i18n/
│   ├── locales/
│   │   ├── ru.json          # Русские переводы
│   │   ├── en.json          # Английские переводы
│   │   └── ab.json          # Абхазские переводы (будущее)
│   ├── i18n.config.ts       # Конфигурация i18n
│   └── index.ts             # Экспорт хуков и утилит
```

## Использование

### В компонентах

```typescript
import { useTranslation } from '@/i18n';

function MyComponent() {
  const { t } = useTranslation();

  return (
    <View>
      <Text>{t('common.loading')}</Text>
      <Text>{t('navigation.home')}</Text>
    </View>
  );
}
```

### Переключение языка

```typescript
import { changeLanguage } from '@/i18n';

// Переключение на английский
await changeLanguage('en');

// Переключение на русский
await changeLanguage('ru');
```

### Получение текущего языка

```typescript
import { getCurrentLanguage } from '@/i18n';

const currentLang = getCurrentLanguage(); // 'ru', 'en', или 'ab'
```

## Структура файлов переводов

Переводы организованы по категориям:

### common - Общие строки
```json
{
  "common": {
    "loading": "Загрузка...",
    "more": "Подробнее",
    "phone": "Телефон:",
    "address": "Адрес:"
  }
}
```

### navigation - Навигация
```json
{
  "navigation": {
    "home": "Главная",
    "guide": "Путеводитель",
    "main_menu": "Главное меню"
  }
}
```

### language - Языки
```json
{
  "language": {
    "russian": "Русский",
    "english": "Английский",
    "abkhazian": "Абхазский"
  }
}
```

### cities - Города
```json
{
  "cities": {
    "gagra": "Гагра",
    "sukhum": "Сухум"
  }
}
```

### categories - Категории мест
```json
{
  "categories": {
    "hotels": "ОТЕЛИ",
    "restaurants": "РЕСТОРАНЫ",
    "beaches": "ПЛЯЖИ"
  }
}
```

## Добавление новых переводов

### Шаг 1: Добавить ключ в ru.json

```json
{
  "new_section": {
    "my_key": "Моё значение"
  }
}
```

### Шаг 2: Добавить перевод в en.json

```json
{
  "new_section": {
    "my_key": "My value"
  }
}
```

### Шаг 3: Использовать в компоненте

```typescript
<Text>{t('new_section.my_key')}</Text>
```

## Работа с API

### Получение переводов из API

Если ваш API возвращает переводы, вы можете динамически добавлять их:

```typescript
import i18n from '@/i18n';

// Добавление переводов динамически
i18n.addResourceBundle('ru', 'translation', {
  api_section: apiData
}, true, true);
```

### Использование языка из API

```typescript
useEffect(() => {
  const loadLanguageFromAPI = async () => {
    const response = await fetch(`${API_BASE}/api/language/`);
    const data = await response.json();
    await changeLanguage(data.language);
  };

  loadLanguageFromAPI();
}, []);
```

## Пошаговое руководство по локализации компонента

### Пример: До локализации

```typescript
export default function MyScreen() {
  return (
    <View>
      <Text style={styles.title}>Заголовок</Text>
      <Text>Описание компонента</Text>
    </View>
  );
}
```

### Пример: После локализации

```typescript
import { useTranslation } from '@/i18n';

export default function MyScreen() {
  const { t } = useTranslation();

  return (
    <View>
      <Text style={styles.title}>{t('my_screen.title')}</Text>
      <Text>{t('my_screen.description')}</Text>
    </View>
  );
}
```

### Добавить в ru.json:

```json
{
  "my_screen": {
    "title": "Заголовок",
    "description": "Описание компонента"
  }
}
```

### Добавить в en.json:

```json
{
  "my_screen": {
    "title": "Title",
    "description": "Component description"
  }
}
```

## Проверка локализации

### Запуск скрипта проверки

```bash
node scripts/localize-components.js
```

Этот скрипт найдет все хардкод русские строки в компонентах.

## Лучшие практики

1. **Используйте осмысленные ключи**: `user.profile.name` вместо `text1`

2. **Группируйте по функциональности**: Создавайте логические группы (common, navigation, cities и т.д.)

3. **Избегайте дублирования**: Если строка используется в нескольких местах, создайте общий ключ в `common`

4. **Не храните HTML в переводах**: Используйте React компоненты для структуры

5. **Тестируйте на всех языках**: Проверяйте, что интерфейс выглядит корректно на всех языках

## Поддержка множественных форм (Pluralization)

Для русского языка используйте разные формы:

```json
{
  "dictionary": {
    "word_one": "слово",
    "word_few": "слова",
    "word_many": "слов"
  }
}
```

Использование:

```typescript
const count = 5;
t('dictionary.word_many') // "слов"
```

## Интеграция с API

### Синхронизация языка с сервером

```typescript
import { changeLanguage, getCurrentLanguage } from '@/i18n';

// Сохранение выбора языка на сервер
const saveLanguagePreference = async (lang: string) => {
  await changeLanguage(lang);
  await fetch(`${API_BASE}/api/user/language/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ language: lang })
  });
};

// Загрузка языка из профиля пользователя
const loadUserLanguage = async () => {
  const response = await fetch(`${API_BASE}/api/user/profile/`);
  const data = await response.json();
  await changeLanguage(data.language || 'ru');
};
```

## Обработка отсутствующих переводов

i18next автоматически вернет ключ, если перевод отсутствует. В production логируйте это:

```typescript
i18n.on('missingKey', (lngs, namespace, key) => {
  console.warn(`Missing translation: ${key} for ${lngs}`);
});
```

## Часто задаваемые вопросы

**Q: Как добавить новый язык?**

A:
1. Создайте файл `i18n/locales/новый-язык.json`
2. Добавьте импорт в `i18n/i18n.config.ts`
3. Добавьте ресурс в конфигурацию i18n

**Q: Можно ли использовать переменные в переводах?**

A: Да, используйте интерполяцию:
```json
{ "greeting": "Привет, {{name}}!" }
```
```typescript
t('greeting', { name: 'Иван' }) // "Привет, Иван!"
```

**Q: Как обновить переводы без перезапуска приложения?**

A: Используйте динамическую загрузку:
```typescript
i18n.reloadResources(['ru', 'en']);
```
