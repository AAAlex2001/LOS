# Следующие шаги после локализации

## ⚠️ ВАЖНО: Сначала исправьте ошибки скрипта

Скрипт локализации неправильно разместил хук `useTranslation()` в некоторых файлах.

### Запустите скрипт исправления:

```bash
python scripts/fix-localization.py
```

Этот скрипт автоматически исправит ~100 файлов где хук был вставлен в неправильное место.

## 1. Протестируйте приложение

```bash
npm start
```

Проверьте:
- ✅ Приложение запускается
- ✅ Тексты отображаются
- ✅ Переключение языка работает (через боковое меню)
- ✅ Язык сохраняется после перезапуска

## 2. Проверьте TypeScript

```bash
npx tsc --noEmit
```

Исправьте все ошибки компиляции если они есть.

## 3. Если все работает - удалите бэкапы

```bash
# Windows (PowerShell)
Get-ChildItem -Recurse -Filter *.backup | Remove-Item
Get-ChildItem -Recurse -Filter *.fix_backup | Remove-Item

# Linux/Mac/Git Bash
find . -name "*.backup" -delete
find . -name "*.fix_backup" -delete
```

## 4. Создайте коммит

```bash
git add .
git commit -m "Add i18n localization support

- Added i18next with React Native support
- Created translation files for RU and EN
- Localized 149 components
- Added language switcher in sidebar
- Language preference persists in AsyncStorage"
```

## 5. Опционально: Интеграция с API

Если ваш бэкенд поддерживает переводы, добавьте загрузку с сервера:

См. [LOCALIZATION_STATUS.md](./LOCALIZATION_STATUS.md#6-интеграция-с-api-опционально)

---

## 📁 Полезные файлы

- **[LOCALIZATION_STATUS.md](./LOCALIZATION_STATUS.md)** - Полный статус локализации
- **[LOCALIZATION.md](./LOCALIZATION.md)** - Детальное руководство
- **[i18n/README.md](./i18n/README.md)** - Быстрый старт по i18n
- **[scripts/README.md](./scripts/README.md)** - Документация скриптов

## 🔧 Скрипты

```bash
# Исправить размещение хуков (ЗАПУСТИТЕ СНАЧАЛА!)
python scripts/fix-localization.py

# Найти оставшиеся хардкод строки
node scripts/localize-components.js

# Восстановить из бэкапов (если что-то пошло не так)
python scripts/localize.py --restore
```

## ❓ Проблемы?

**Приложение не запускается:**
```bash
# 1. Исправьте хуки
python scripts/fix-localization.py

# 2. Проверьте ошибки
npm start
```

**Нужна помощь:**
- См. [LOCALIZATION_STATUS.md](./LOCALIZATION_STATUS.md#-часто-задаваемые-вопросы)
- Проверьте консоль на ошибки
- Проверьте что i18n импортирован в app/_layout.tsx
