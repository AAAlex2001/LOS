# 🌐 Работа с переводами в админке Django

## Как это выглядит сейчас

### ❌ Без TranslationAdmin (текущее состояние):
```
┌─────────────────────────────────────┐
│ Добавить/изменить банк              │
├─────────────────────────────────────┤
│ Name:           [_______________]   │ ← Русский
│ Name en:        [_______________]   │ ← Английский  
│ Working hours:  [_______________]   │ ← Русский
│ Working hours en: [_____________]   │ ← Английский
│ Address:        [_______________]   │ ← Русский
│ Address en:     [_______________]   │ ← Английский
└─────────────────────────────────────┘
```
**Неудобно**: все поля вперемешку, легко запутаться!

---

### ✅ С TranslationAdmin (после обновления):
```
┌─────────────────────────────────────┐
│ Добавить/изменить банк              │
├─────────────────────────────────────┤
│ [🇷🇺 Русский] [🇬🇧 English]         │ ← Вкладки!
├─────────────────────────────────────┤
│ Если выбран "Русский":              │
│ Name:           [_______________]   │
│ Working hours:  [_______________]   │
│ Address:        [_______________]   │
│                                     │
│ Если выбран "English":              │
│ Name:           [_______________]   │
│ Working hours:  [_______________]   │
│ Address:        [_______________]   │
└─────────────────────────────────────┘
```
**Удобно**: просто переключаешь вкладку и заполняешь!

---

## 📝 Как заполнять контент в админке

### Пошаговая инструкция:

#### 1. **Откройте запись для редактирования**
   Например: `Banks` → `Banks Page` → выберите банк

#### 2. **Заполните русскую версию**
   - Нажмите на вкладку **"Русский"** (если вкладок нет, просто заполняйте поля без суффикса)
   - Введите все тексты на русском языке:
     ```
     Name:           Банк Абхазии
     Working hours:  Пн-Пт: 9:00 - 18:00
     Address:        г. Сухум, ул. Ленина, 1
     Contacts:       +7 840 226-XX-XX
     ```

#### 3. **Заполните английскую версию**
   - Нажмите на вкладку **"English"**
   - Введите переводы:
     ```
     Name:           Bank of Abkhazia
     Working hours:  Mon-Fri: 9:00 AM - 6:00 PM
     Address:        Sukhum, Lenin str., 1
     Contacts:       +7 840 226-XX-XX
     ```

#### 4. **Сохраните**
   - Нажмите кнопку **"Сохранить"** или **"Сохранить и продолжить редактирование"**

---

## 🔧 Обновление админки (для разработчика)

### Автоматическое обновление:

Если у вас есть Python локально:
```bash
cd admin
python update_admin_translations.py
```

### Ручное обновление одного файла:

**Было:**
```python
from django.contrib import admin
from .models import TaxiPage, TaxiService

class TaxiServiceInline(admin.TabularInline):
    model = TaxiService
    # ...

@admin.register(TaxiPage)
class TaxiPageAdmin(admin.ModelAdmin):
    # ...
```

**Стало:**
```python
from django.contrib import admin
from modeltranslation.admin import TranslationAdmin, TranslationTabularInline

from .models import TaxiPage, TaxiService

class TaxiServiceInline(TranslationTabularInline):  # ← Изменено
    model = TaxiService
    # ...

@admin.register(TaxiPage)
class TaxiPageAdmin(TranslationAdmin):  # ← Изменено
    # ...
```

### Что нужно изменить:

1. **Добавить импорт:**
   ```python
   from modeltranslation.admin import TranslationAdmin, TranslationTabularInline, TranslationStackedInline
   ```

2. **Заменить базовые классы:**
   - `admin.ModelAdmin` → `TranslationAdmin`
   - `admin.TabularInline` → `TranslationTabularInline`
   - `admin.StackedInline` → `TranslationStackedInline`

---

## 📋 Какие файлы нужно обновить:

Все файлы `admin.py` в следующих модулях:

- ✅ `cms/banks/admin.py` (уже обновлен как пример)
- `cms/taxi/admin.py`
- `cms/footer/admin.py`
- `cms/homepage/admin.py`
- `cms/your_doctor/admin.py`
- `cms/parties/admin.py`
- `cms/cities/admin.py`
- `cms/beaches/admin.py`
- `cms/hotels/admin.py`
- `cms/restaurants/admin.py`
- `cms/excursions/admin.py`
- `cms/history_and_culture/admin.py`
- `cms/important/admin.py`
- `cms/mobile_communication/admin.py`
- `cms/mountain_routes/admin.py`
- `cms/hot_springs/admin.py`
- `cms/wineries/admin.py`
- `cms/churches/admin.py`
- `cms/cultural_attractions/admin.py`
- `cms/beauty_salons/admin.py`
- `cms/car_washes/admin.py`
- `cms/gas_stations/admin.py`
- `cms/parking_lots/admin.py`
- `cms/pharmacy/admin.py`
- `cms/shops_and_markets/admin.py`
- `cms/clothing_repair/admin.py`
- `cms/administrative_buildings/admin.py`
- `cms/sports_gyms/admin.py`
- `cms/government_structure/admin.py`
- `cms/transport_communications/admin.py`
- `cms/abkhazian_cuisine/admin.py`
- `cms/abkhazian_customs/admin.py`
- `cms/elementary_dictionary/admin.py`
- `cms/music/admin.py`
- `cms/privacy_policy/admin.py`
- `cms/welcome/admin.py`
- `cms/ad_banner/admin.py`

---

## 🎯 Примеры обновленных админок

### Footer Admin:
```python
from django.contrib import admin
from modeltranslation.admin import TranslationAdmin, TranslationTabularInline
from .models import Footer, FooterLink, SocialLink

class FooterLinkInline(TranslationTabularInline):
    model = FooterLink
    extra = 1
    fields = ('category', 'label', 'url', 'order')

class SocialLinkInline(admin.TabularInline):  # Не нужен перевод
    model = SocialLink
    extra = 1
    fields = ('network', 'url', 'order')

@admin.register(Footer)
class FooterAdmin(TranslationAdmin):
    inlines = [FooterLinkInline, SocialLinkInline]
    # ...
```

### Taxi Admin:
```python
from django.contrib import admin
from modeltranslation.admin import TranslationAdmin, TranslationTabularInline
from .models import TaxiPage, TaxiService

class TaxiServiceInline(TranslationTabularInline):
    model = TaxiService
    extra = 0
    fields = ("name", "working_hours", "phones_raw", "site", "image", "order")

@admin.register(TaxiPage)
class TaxiPageAdmin(TranslationAdmin):
    inlines = [TaxiServiceInline]
    # ...
```

---

## ✅ Проверка

После обновления перезапустите Django сервер:
```bash
docker-compose restart backend
```

Затем откройте админку и проверьте:
1. Есть ли вкладки [Русский] [English] при редактировании
2. Все ли поля правильно группируются по языкам

---

## 💡 Полезные советы

### Если вкладки не появились:

1. **Очистите кеш браузера** (Ctrl+Shift+Delete)
2. **Проверьте settings.py:**
   ```python
   MODELTRANSLATION_ADMIN_CSS = {
       'all': ('modeltranslation/css/tabbed_translation_fields.css',),
   }
   ```
3. **Проверьте, что используется `TranslationAdmin`:**
   ```python
   class MyAdmin(TranslationAdmin):  # ← Должно быть именно так
   ```

### Альтернативные режимы отображения:

Если вкладки не нравятся, можно использовать другой режим:

```python
# В конкретном админе
class MyAdmin(TranslationAdmin):
    class Media:
        js = (
            'modeltranslation/js/force_jquery.js',
            'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.24/jquery-ui.min.js',
            'modeltranslation/js/tabbed_translation_fields.js',
        )
        css = {
            'screen': ('modeltranslation/css/tabbed_translation_fields.css',),
        }
```

---

## 🎉 Результат

После обновления вы получите:

✅ **Удобные вкладки** для переключения между языками  
✅ **Чистый интерфейс** - поля сгруппированы по языкам  
✅ **Меньше ошибок** - невозможно случайно написать русский текст в английское поле  
✅ **Быстрая работа** - не нужно скроллить огромные формы  

Все тексты по-прежнему управляются из админки, просто удобнее! 🚀
