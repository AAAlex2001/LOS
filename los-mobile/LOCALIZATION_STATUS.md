# Статус локализации приложения LOS Mobile

## ✅ Выполнено

### 1. Установлена инфраструктура локализации

- ✅ Установлены библиотеки:
  - `i18next`
  - `react-i18next`
  - `@react-native-async-storage/async-storage`

- ✅ Создана структура i18n:
  ```
  i18n/
  ├── locales/
  │   ├── ru.json  (150+ переводов)
  │   └── en.json  (150+ переводов)
  ├── i18n.config.ts
  └── index.ts
  ```

- ✅ Настроено автоматическое сохранение выбора языка
- ✅ i18n инициализирован в `app/_layout.tsx`

### 2. Созданы файлы переводов

**Категории переводов:**
- `common` - Общие элементы (загрузка, кнопки, формы)
- `navigation` - Навигация
- `language` - Выбор языка
- `about` - Об Абхазии
- `entertainment` - Развлечения
- `plan_trip` - Планирование поездки
- `important` - Важная информация
- `cities` - Города
- `categories` - Категории мест
- `footer` - Футер и контакты
- `dictionary` - Формы множественного числа

**Всего ключей: ~150**

### 3. Обновлены ключевые компоненты

- ✅ `app/_layout.tsx` - инициализация i18n
- ✅ `app/(tabs)/_layout.tsx` - локализованы вкладки
- ✅ `components/Screens/LanguageScreen.tsx` - экран выбора языка
- ✅ `components/Screens/SidebarScreen.tsx` - боковое меню
- ✅ `pages/Home/Home.tsx` - главная страница (частично)
- ✅ `pages/Welcome/Welcome.tsx` - приветственный экран

### 4. Автоматическая локализация

- ✅ Создан скрипт `scripts/localize.py` для автоматической замены
- ✅ Обработано **149 файлов**
- ✅ Создано **149 бэкапов** (.backup)

## ⚠️ Требуется исправление

### Проблема с размещением хука

Скрипт локализации неправильно разместил хук `useTranslation()` в некоторых файлах.

**Неправильно:**
```typescript
export default function Component({
  const { t } = useTranslation(); visible, onClose...
```

**Правильно:**
```typescript
export default function Component({ visible, onClose...
  const { t } = useTranslation();
```

**Решение:**

1. Запустите скрипт исправления:
   ```bash
   python scripts/fix-localization.py
   ```

2. Или исправьте вручную файлы из списка ниже.

**Затронутые файлы (~100):**
- `components/Screens/about-abkhazia/*` (7 файлов)
- `components/Screens/entertainment/*` (5 файлов)
- `components/Screens/important-trip/*` (2 файла)
- `components/Screens/plan-to-trip/**/*` (~80 файлов)

## 📋 Следующие шаги

### 1. Исправить размещение хуков ✋ ВАЖНО

```bash
python scripts/fix-localization.py
```

### 2. Протестировать приложение

```bash
npm start
```

Проверьте:
- ✅ Приложение запускается без ошибок
- ✅ Все тексты отображаются корректно на русском
- ✅ Переключение языка работает (EN ↔ RU)
- ✅ Выбор языка сохраняется после перезапуска

### 3. Проверить компиляцию TypeScript

```bash
npx tsc --noEmit
```

### 4. Добавить недостающие переводы

Некоторые строки могут быть пропущены. Найдите их:

```bash
node scripts/localize-components.js
```

### 5. Удалить бэкапы (после тестирования)

```bash
# Windows (PowerShell)
Get-ChildItem -Recurse -Filter *.backup | Remove-Item

# Linux/Mac
find . -name "*.backup" -delete
find . -name "*.fix_backup" -delete
```

### 6. Интеграция с API (опционально)

Если сервер поддерживает переводы через API:

```typescript
// Загрузка переводов с сервера
const loadTranslationsFromAPI = async (lang: string) => {
  const response = await fetch(`${API_BASE}/api/translations/${lang}/`);
  const translations = await response.json();

  i18n.addResourceBundle(lang, 'translation', translations, true, true);
};

// Сохранение выбора языка на сервер
const saveLanguageToServer = async (lang: string) => {
  await fetch(`${API_BASE}/api/user/language/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ language: lang })
  });
};
```

## 📚 Документация

- **[LOCALIZATION.md](./LOCALIZATION.md)** - Полное руководство по локализации
- **[i18n/README.md](./i18n/README.md)** - Быстрый старт
- **[scripts/README.md](./scripts/README.md)** - Документация по скриптам

## 🔧 Утилиты

### Скрипты локализации

1. **localize.py** - Автоматическая локализация компонентов
   ```bash
   python scripts/localize.py --dry-run  # Предпросмотр
   python scripts/localize.py            # Применить
   python scripts/localize.py --restore  # Восстановить
   ```

2. **fix-localization.py** - Исправление размещения хуков
   ```bash
   python scripts/fix-localization.py
   ```

3. **localize-components.js** - Поиск хардкод строк
   ```bash
   node scripts/localize-components.js
   ```

## 📊 Статистика

- **Файлов обработано:** 149
- **Ключей переводов:** ~150
- **Языков:** 2 (RU, EN)
- **Категорий:** 11
- **Строк кода изменено:** ~3000+

## ✅ Чеклист готовности

- [x] i18next установлен и настроен
- [x] Файлы переводов созданы (ru.json, en.json)
- [x] Инициализация i18n в app/_layout.tsx
- [x] LanguageScreen обновлен
- [x] Скрипты локализации созданы
- [ ] **Исправлены хуки useTranslation** ⚠️
- [ ] Приложение протестировано
- [ ] TypeScript компилируется без ошибок
- [ ] Переключение языка работает
- [ ] Бэкапы удалены
- [ ] Создан git commit

## 🎯 Быстрый старт для проверки

```bash
# 1. Исправить хуки
python scripts/fix-localization.py

# 2. Запустить приложение
npm start

# 3. Проверить TypeScript
npx tsc --noEmit

# 4. Если все ОК, удалить бэкапы
find . -name "*.backup" -delete
find . -name "*.fix_backup" -delete

# 5. Создать коммит
git add .
git commit -m "Add i18n localization support"
```

## ❓ Часто задаваемые вопросы

**Q: Приложение не запускается после локализации**

A: Скорее всего проблема с размещением хуков. Запустите `python scripts/fix-localization.py`

---

**Q: Некоторые строки не переводятся**

A: Проверьте что строки есть в `i18n/locales/ru.json` и `en.json`. Если строки динамические (приходят с API), их нужно обрабатывать отдельно.

---

**Q: Как добавить новый язык?**

A:
1. Создайте `i18n/locales/новый-код.json`
2. Добавьте импорт в `i18n/i18n.config.ts`
3. Добавьте язык в `LanguageScreen.tsx`

---

**Q: Переключение языка не сохраняется**

A: Убедитесь что `@react-native-async-storage/async-storage` установлен правильно.

## 🆘 Поддержка

Если возникли проблемы:
1. Проверьте консоль на ошибки
2. Убедитесь что все зависимости установлены
3. Восстановите из бэкапов если нужно: `python scripts/localize.py --restore`
4. Проверьте документацию в LOCALIZATION.md
