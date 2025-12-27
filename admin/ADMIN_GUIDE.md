# Руководство по работе с админкой Django

## 🔐 Доступ к админке

URL админки: `http://localhost:8000/admin/` (или ваш домен)

## 📋 Структура админки

### Все тексты редактируются через админку!

В админке доступны следующие разделы для управления контентом:

---

## 🏠 **Главная страница (HomePage)**

**Раздел:** `Homepage` → `HomePage`

### Что можно настроить:

#### 1. **Основные тексты**
- `Hero text primary` (RU/EN) - главный заголовок
- `Hero text secondary` (RU/EN) - подзаголовок
- `Cities section title` (RU/EN) - заголовок секции городов
- `Activities section title` (RU/EN) - заголовок секции активностей
- `Actions section title` (RU/EN) - заголовок секции действий

#### 2. **CTA блок (Call to Action)**
- `CTA title` (RU/EN)
- `CTA hero text` (RU/EN)
- `CTA card title` (RU/EN)
- `CTA card description` (RU/EN)
- `CTA button label` (RU/EN)
- `CTA button href` - ссылка кнопки

#### 3. **SEO метаданные**
- SEO title, description, keywords (RU/EN)
- Open Graph метаданные
- Twitter Card метаданные
- Robots настройки

#### 4. **Вложенные элементы** (Inlines):
- **Slider items** - слайдер на главной
- **Cities** - города с описаниями
- **Activities** - категории активностей
- **Action buttons** - кнопки действий
- **Popup items** - элементы всплывающих меню
- **Tabs** - вкладки навигации

---

## 🦶 **Футер (Footer)**

**Раздел:** `Footer` → `Footer`

### Настройки:

#### 1. **О сервисе**
- `Description` (RU/EN) - описание в блоке "О сервисе"

#### 2. **Контактная информация**
- `Contact info` (RU/EN) - текст с часами работы
- `Email` - корпоративный email

#### 3. **Копирайт**
- `Copyright text` (RU/EN) - текст внизу футера

#### 4. **Ссылки** (Footer Links Inline):
- **Быстрые ссылки** (quick_links):
  - Label (RU/EN) - текст ссылки
  - URL - адрес ссылки
  - Order - порядок отображения

- **Правовая информация** (legal):
  - Privacy Policy
  - Terms and Conditions

#### 5. **Соцсети** (Social Links Inline):
- Telegram, Instagram, Twitter, Facebook, YouTube, Rutube
- URL для каждой соцсети

---

## 🏛️ **Города (Cities)**

**Раздел:** `Cities` → `Cities Page`

- SEO метаданные (RU/EN)
- **Cities Inline**:
  - Name (RU/EN) - название города
  - Title (RU/EN) - заголовок страницы
  - Description (RU/EN) - описание
  - Administrative buildings (RU/EN) - список админзданий
  - Image - изображение города

---

## 🏦 **Банки (Banks)**

**Раздел:** `Banks` → `Banks Page`

- **Banks Inline**:
  - Name (RU/EN) - название банка
  - Logo - логотип
  - Working hours (RU/EN) - режим работы
  - Address (RU/EN) - адрес
  - Contacts (RU/EN) - контакты
  - Email, Website

---

## 🚕 **Такси (Taxi)**

**Раздел:** `Taxi` → `Taxi Page`

- Main title (RU/EN) - заголовок
- Intro text (RU/EN) - вводный текст
- Hero image
- SEO метаданные

**Taxi Services Inline**:
- Name (RU/EN) - название службы
- Logo, Image
- Working hours (RU/EN)
- Phones raw (RU/EN) - телефоны
- Site - веб-сайт

---

## 🏥 **Ваш доктор (Your Doctor)**

**Раздел:** `Your Doctor` → `Your Doctor Page`

- Logo image
- Hospitals hero image
- SEO метаданные

**Вложенные секции**:
1. **Hospitals** - больницы
2. **Private Clinics** - частные клиники
3. **Dentistry** - стоматология
4. **Vet Clinics** - вет. клиники
5. **Doctors Groups** - группы врачей

Каждая секция содержит:
- Name (RU/EN)
- Name link - ссылка на карту
- Image, Logo
- Working hours (RU/EN)
- Address (RU/EN)
- Address link - ссылка на карту
- Contacts (RU/EN)
- Email, Website

---

## ⚠️ **Важно знать (Important)**

**Раздел:** `Important` → `Important Page`

- Main title (RU/EN)
- Intro text (RU/EN)
- Hero image
- SEO метаданные

**Important Sections Inline**:
- Title (RU/EN) - заголовок секции
- Content (RU/EN) - содержимое
- Icon
- Rules inline - список правил с иконками
- Images inline - галерея изображений

---

## 🎭 **История и культура (History and Culture)**

**Раздел:** `History And Culture` → `History And Culture Page`

- Main title (RU/EN)
- Hero image
- SEO метаданные

**History Sections**:
- Title (RU/EN)
- Content (RU/EN)
- Image

**Culture Sections**:
- Title (RU/EN)
- Content (RU/EN)
- Image

---

## 🎉 **Развлечения (Parties)**

**Раздел:** `Parties` → `Parties Page`

- Main title (RU/EN)
- Intro text (RU/EN)
- Hero image

**Party Cities** → **Party Events**:
- City name (RU/EN)
- Event title (RU/EN)
- Date info (RU/EN)
- Location (RU/EN)
- Description (RU/EN)
- Image

---

## 🏖️ **Пляжи (Beaches)**

**Раздел:** `Beaches` → `Beaches Page`

- SEO метаданные

**Beach Cities** → **Beaches**:
- City name (RU/EN)
- Beach name (RU/EN)
- Address (RU/EN)
- Description (RU/EN)
- Phone, Image

---

## 🏨 **Гостиницы (Hotels)**

**Раздел:** `Hotels` → `Hotels Page`

Аналогично пляжам:
- Hotel Cities
- Hotels с названием, адресом, описанием, контактами (RU/EN)

---

## 🍽️ **Рестораны (Restaurants)**

**Раздел:** `Restaurants` → `Restaurants Page`

- Restaurant Cities
- Restaurants:
  - Name (RU/EN)
  - Cuisine type (RU/EN)
  - Address (RU/EN)
  - Description (RU/EN)
  - Phone, Website, Image

---

## 🍷 **Абхазская кухня (Abkhazian Cuisine)**

**Раздел:** `Abkhazian Cuisine` → `Abkhazian Cuisine Page`

- Title (RU/EN)
- Intro text (RU/EN)
- Hero image

**Cuisine Sections**:
- Title (RU/EN)
- Content (RU/EN)
- Image

**Main Dishes**:
- Name (RU/EN)
- Description (RU/EN)
- Ingredients (RU/EN)
- Image

---

## 📱 **Связь (Mobile Communication)**

**Раздел:** `Mobile Communication` → `Mobile Communication Page`

- Main title (RU/EN)
- Intro text (RU/EN)

**Mobile Providers**:
- Name (RU/EN)
- Logo, Description (RU/EN)
- Website, Address

**Internet Providers**:
- Аналогично

---

## 🎫 **Экскурсии (Excursions)**

**Раздел:** `Excursions` → `Excursions Page`

**Excursion Services**:
- Name (RU/EN)
- Description (RU/EN)
- Phone, Website, Logo

---

## 🏔️ **Горные маршруты (Mountain Routes)**

**Раздел:** `Mountain Routes` → `Mountain Routes Page`

**Mountain Routes**:
- Title (RU/EN)
- Description (RU/EN)
- Difficulty (RU/EN)
- Duration (RU/EN)
- Starting point (RU/EN)
- Image, Contact phone

---

## ⛲ **Горячие источники (Hot Springs)**

**Раздел:** `Hot Springs` → `Hot Springs Page`

**Hot Springs**:
- Name (RU/EN)
- Location (RU/EN)
- Description (RU/EN)
- Temperature (RU/EN)
- Image

---

## 🍇 **Винодельни (Wineries)**

**Раздел:** `Wineries` → `Wineries Page`

**Winery Cities** → **Wineries**:
- Name (RU/EN)
- Address (RU/EN)
- Description (RU/EN)
- Working hours (RU/EN)
- Phone, Website, Image

---

## ⛪ **Церкви (Churches)**

**Раздел:** `Churches` → `Churches Page`

**Church Cities** → **Churches**:
- Name (RU/EN)
- Address (RU/EN)
- Description (RU/EN)
- History (RU/EN)
- Image

---

## 🎨 **Культурные достопримечательности**

**Раздел:** `Cultural Attractions` → `Cultural Attractions Page`

**Cities** → **Cultural Attractions**:
- Name (RU/EN)
- Address (RU/EN)
- Description (RU/EN)
- Working hours (RU/EN)
- Entry fee (RU/EN)
- Image

---

## 💄 **Салоны красоты (Beauty Salons)**

**Раздел:** `Beauty Salons` → `Beauty Salons Page`

**Cities** → **Beauty Salons**:
- Name (RU/EN)
- Services (RU/EN)
- Address (RU/EN)
- Phone, Working hours (RU/EN)
- Image

---

## 🚗 **Автомойки (Car Washes)**

**Раздел:** `Car Washes` → `Car Washes Page`

**Cities** → **Car Washes**:
- Name (RU/EN)
- Address (RU/EN)
- Services (RU/EN)
- Phone, Working hours (RU/EN)

---

## ⛽ **АЗС (Gas Stations)**

**Раздел:** `Gas Stations` → `Gas Stations Page`

**Cities** → **Gas Stations**:
- Name (RU/EN)
- Address (RU/EN)
- Services (RU/EN)
- Working hours (RU/EN)

---

## 🏢 **Административные здания**

**Раздел:** `Administrative Buildings` → `Administrative Buildings Page`

**Cities** → **Administrative Buildings**:
- Name (RU/EN)
- Type (RU/EN)
- Address (RU/EN)
- Phone, Working hours (RU/EN)

---

## 🅿️ **Парковки (Parking Lots)**

**Раздел:** `Parking Lots` → `Parking Lots Page`

**Cities** → **Parking Lots**:
- Name (RU/EN)
- Address (RU/EN)
- Capacity (RU/EN)
- Pricing (RU/EN)
- Working hours (RU/EN)

---

## 💊 **Аптеки (Pharmacy)**

**Раздел:** `Pharmacy` → `Pharmacy Page`

**Cities** → **Pharmacy Items**:
- Name (RU/EN)
- Address (RU/EN)
- Phone, Working hours (RU/EN)

---

## 🛍️ **Магазины и рынки**

**Раздел:** `Shops And Markets` → `Shops And Markets Page`

**Cities** → **Shops/Markets**:
- Name (RU/EN)
- Type (RU/EN)
- Address (RU/EN)
- Description (RU/EN)
- Working hours (RU/EN)

---

## 👔 **Ремонт одежды**

**Раздел:** `Clothing Repair` → `Clothing Repair Page`

**Cities** → **Clothing Repair**:
- Name (RU/EN)
- Services (RU/EN)
- Address (RU/EN)
- Phone, Working hours (RU/EN)

---

## 🏋️ **Спортзалы (Sports Gyms)**

**Раздел:** `Sports Gyms` → `Sports Gyms Page`

**Sports Gyms**:
- Name (RU/EN)
- Address (RU/EN)
- Description (RU/EN)
- Services (RU/EN)
- Phone, Working hours (RU/EN)
- Image

---

## 🏛️ **Государственное устройство**

**Раздел:** `Government Structure` → `Government Structure Page`

**Government Blocks**:
- Title (RU/EN)
- Content (RU/EN)
- Icon image

---

## 🚌 **Транспортные сообщения**

**Раздел:** `Transport Communications` → `Transport Communications Page`

**Transport Blocks**:
- Type (RU/EN) - тип транспорта
- Title (RU/EN)
- Description (RU/EN)
- Location (RU/EN)
- Location link - ссылка на карту
- Contacts (RU/EN)
- Schedule (RU/EN)
- Icon

---

## 📚 **Элементарный словарь**

**Раздел:** `Elementary Dictionary` → `Elementary Dictionary Page`

**Categories** → **Words**:
- Russian word
- Abkhazian word
- Transcription (RU/EN)

---

## 🎵 **Музыка**

**Раздел:** `Music` → `Music Page`

**Music Tracks**:
- Title (RU/EN)
- Artist (RU/EN)
- Audio file

---

## 📱 **Баннеры (Ad Banners)**

**Раздел:** `Ad Banner` → `Ad Banners`

- Title (RU/EN)
- Description (RU/EN)
- Link URL
- Image
- Is active - активность баннера

---

## 🔧 **Как работать с переводами**

### Поля с суффиксами `_ru` и `_en`:

При создании/редактировании записи в админке вы увидите:
- `Name` - поле на русском
- `Name en` - поле на английском

**Важно:** Всегда заполняйте оба поля!

### Пример:
```
Name: Такси Гагры
Name en: Gagra Taxi

Description: Круглосуточная служба такси в Гагре
Description en: 24/7 taxi service in Gagra
```

---

## ✅ **Чеклист перед публикацией**

1. ✅ Заполнены все поля RU
2. ✅ Заполнены все поля EN
3. ✅ Загружены изображения (если нужны)
4. ✅ Проверены ссылки (URL должны начинаться с `/`)
5. ✅ SEO метаданные заполнены
6. ✅ Установлен правильный Order (порядок)

---

## 🌐 **API Endpoints**

Все данные автоматически доступны через API:

- Homepage: `/api/home/page/content/?lang=ru`
- Cities: `/api/cities/page/content/?lang=en`
- Banks: `/api/banks/page/content/?lang=ru`
- И т.д.

Параметр `?lang=ru` или `?lang=en` автоматически возвращает данные на нужном языке!

---

## 💡 **Полезные советы**

1. **Используйте Preview** - в админке есть кнопка предпросмотра изображений
2. **Order имеет значение** - чем меньше число, тем выше в списке
3. **Singleton записи** - HomePage, Footer и другие страницы могут быть только в единственном экземпляре
4. **Не удаляйте** - некоторые записи нельзя удалить (Footer, основные страницы)
5. **Проверяйте на сайте** - после изменений обновите страницу фронтенда

---

## 🆘 **Частые проблемы**

**Проблема:** Не отображаются изменения на сайте
**Решение:** Очистите кеш браузера (Ctrl+F5) или добавьте `?v=1` к URL

**Проблема:** Текст на английском не меняется
**Решение:** Убедитесь, что заполнили поле с суффиксом `_en`

**Проблема:** Нет кнопки "Add" в разделе
**Решение:** Это singleton модель - редактируйте существующую запись

---

**Все готово!** Теперь весь контент управляется через Django админку с полной поддержкой двух языков! 🎉
