# Скрипты для локализации

## localize.py - Автоматическая локализация компонентов

Этот скрипт автоматически заменяет все хардкод русские строки в компонентах на вызовы функции `t()` из i18next.

### Требования

- Python 3.6+
- Файлы переводов должны быть в `i18n/locales/ru.json` и `en.json`

### Использование

#### 1. Предпросмотр изменений (рекомендуется сначала)

```bash
python scripts/localize.py --dry-run
```

Этот режим покажет что будет изменено, но не внесет реальных изменений в файлы.

#### 2. Применить изменения

```bash
python scripts/localize.py
```

Скрипт:
- ✅ Найдет все русские строки из `ru.json` в ваших компонентах
- ✅ Заменит их на `t('ключ')`
- ✅ Добавит `import { useTranslation } from '@/i18n'`
- ✅ Добавит `const { t } = useTranslation()` в компоненты
- ✅ Создаст бэкапы всех измененных файлов (с расширением `.backup`)

#### 3. Восстановление из бэкапов (если что-то пошло не так)

```bash
python scripts/localize.py --restore
```

Восстанавливает все файлы из бэкапов и удаляет файлы `.backup`.

### Что делает скрипт

#### До локализации:

```tsx
export default function MyScreen() {
  return (
    <View>
      <Text style={styles.title}>Загрузка...</Text>
      <TouchableOpacity>
        <Text>Подробнее</Text>
      </TouchableOpacity>
    </View>
  );
}
```

#### После локализации:

```tsx
import { useTranslation } from '@/i18n';

export default function MyScreen() {
  const { t } = useTranslation();

  return (
    <View>
      <Text style={styles.title}>{t('common.loading')}</Text>
      <TouchableOpacity>
        <Text>{t('common.more')}</Text>
      </TouchableOpacity>
    </View>
  );
}
```

### Что обрабатывается

Скрипт заменяет следующие паттерны:

1. **JSX текст между тегами:**
   - `<Text>Текст</Text>` → `<Text>{t('key')}</Text>`

2. **Строки как значения пропсов:**
   - `title="Текст"` → `title={t('key')}`

3. **Строки в кавычках (вне импортов и комментариев):**
   - `'Текст'` → `t('key')`
   - `"Текст"` → `t('key')`

### Безопасность

- ✅ Скрипт пропускает строки внутри `import` выражений
- ✅ Скрипт пропускает строки в комментариях
- ✅ Создаются бэкапы всех измененных файлов
- ✅ Режим `--dry-run` для предпросмотра
- ✅ Возможность полного восстановления через `--restore`

### Примеры вывода

```
Загрузка переводов из ru.json...
Загружено 150 переводов

Обработка C:\path\to\los-mobile\components\Screens...
✓ C:\path\to\los-mobile\components\Screens\LanguageScreen.tsx
  'Русский' -> t('language.russian')
  'Английский' -> t('language.english')
  'Абхазский' -> t('language.abkhazian')
✓ C:\path\to\los-mobile\components\Screens\SidebarScreen.tsx
  'Главное меню' -> t('navigation.main_menu')
  'Свяжитесь с нами' -> t('footer.contact_us')

Обработано файлов: 45, замен: 327

✓ Готово!
Бэкапы сохранены с расширением .backup
Для восстановления используйте: python localize.py --restore
```

### После запуска скрипта

1. **Проверьте изменения:**
   ```bash
   git diff
   ```

2. **Протестируйте приложение:**
   ```bash
   npm start
   ```

3. **Если все работает, удалите бэкапы:**
   ```bash
   # Windows
   del /S *.backup

   # Linux/Mac
   find . -name "*.backup" -delete
   ```

4. **Если что-то не так, восстановите:**
   ```bash
   python scripts/localize.py --restore
   ```

### Дополнительные скрипты

#### localize-components.js

Простой скрипт для поиска всех хардкод русских строк:

```bash
node scripts/localize-components.js
```

Выведет список всех файлов с русскими строками и сами строки.

### Устранение проблем

**Проблема:** Скрипт не находит некоторые строки

**Решение:** Убедитесь что эти строки есть в `i18n/locales/ru.json`. Скрипт заменяет только те строки, которые есть в файле переводов.

---

**Проблема:** После замены приложение не запускается

**Решение:**
1. Проверьте консоль на ошибки
2. Убедитесь что `@/i18n` импортирован в `app/_layout.tsx`
3. Восстановите из бэкапов и проверьте файлы переводов

---

**Проблема:** Некоторые строки заменились неправильно

**Решение:**
1. Восстановите из бэкапов: `python scripts/localize.py --restore`
2. Отредактируйте проблемные файлы вручную
3. Запустите скрипт снова с `--dry-run` для проверки

### Рекомендуемый порядок действий

1. ✅ Создайте коммит текущего состояния
   ```bash
   git add .
   git commit -m "Before localization"
   ```

2. ✅ Запустите в режиме предпросмотра
   ```bash
   python scripts/localize.py --dry-run
   ```

3. ✅ Если все выглядит хорошо, примените изменения
   ```bash
   python scripts/localize.py
   ```

4. ✅ Протестируйте приложение
   ```bash
   npm start
   ```

5. ✅ Проверьте git diff и создайте коммит
   ```bash
   git diff
   git add .
   git commit -m "Add i18n localization"
   ```

6. ✅ Удалите бэкапы
   ```bash
   find . -name "*.backup" -delete  # Linux/Mac
   del /S *.backup                   # Windows
   ```

## Дополнительная информация

См. также:
- [../LOCALIZATION.md](../LOCALIZATION.md) - Полное руководство по локализации
- [../i18n/README.md](../i18n/README.md) - Документация i18n
