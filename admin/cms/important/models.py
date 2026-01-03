from django.db import models

from cms.models import TimestampedModel





class ImportantPage(TimestampedModel):

    """Страница 'Важно знать'"""

    title = models.CharField("Заголовок страницы", max_length=200, default="Важно знать")

    

              

    seo_title = models.CharField("SEO заголовок", max_length=200, blank=True)

    seo_description = models.TextField("SEO описание", blank=True)

    seo_keywords = models.CharField("SEO ключевые слова", max_length=500, blank=True)

    canonical_url = models.URLField("Канонический URL", blank=True)

    robots_index = models.BooleanField("Индексировать поисковиками", default=True)

    robots_follow = models.BooleanField("Переходить по ссылкам", default=True)

    

                

    og_title = models.CharField("OG заголовок", max_length=200, blank=True)

    og_description = models.TextField("OG описание", blank=True)

    og_image = models.ImageField("OG изображение", upload_to="important/og/", blank=True)

    

                   

    twitter_title = models.CharField("Twitter заголовок", max_length=200, blank=True)

    twitter_description = models.TextField("Twitter описание", blank=True)

    twitter_image = models.ImageField("Twitter изображение", upload_to="important/twitter/", blank=True)

    

    class Meta:

        verbose_name = "Страница 'Важно знать'"

        verbose_name_plural = "Страница 'Важно знать'"



    def __str__(self) -> str:

        return self.title





class ImportantSection(TimestampedModel):

    """Секция на странице 'Важно знать'"""

    SECTION_CHOICES = [

        ('tourist-pharmacy', 'Туристическая аптечка'),

        ('emergency-phones', 'Телефоны экстренной помощи'),

        ('public-behavior', 'Правила поведения в общественных местах'),

        ('taxi-etiquette', 'Такси-этикет'),

    ]

    

    page = models.ForeignKey(ImportantPage, on_delete=models.CASCADE, related_name='sections')

    section_type = models.CharField("Тип секции", max_length=50, choices=SECTION_CHOICES)

    title = models.CharField("Заголовок секции", max_length=200)

    subtitle = models.CharField("Подзаголовок", max_length=255, blank=True, help_text="Для телефонов экстренной помощи")

    content = models.TextField("Основной текст секции", blank=True)

    image = models.ImageField("Изображение секции", upload_to="important/sections/", blank=True, help_text="Картинка для секции")

    

                            

    passenger_intro_text = models.TextField("Текст для блока пассажиров", blank=True, help_text="Текст с фоном для пассажиров")

    passenger_background_image = models.ImageField("Фоновое изображение для блока пассажиров", upload_to="important/taxi/", blank=True, help_text="Фоновая картинка для блока пассажиров")

    passenger_conclusion_text = models.TextField("Заключительный текст для пассажиров", blank=True, help_text="Текст после правил пассажиров")

    driver_intro_text = models.TextField("Текст для блока водителей", blank=True, help_text="Текст с фоном для водителей")

    driver_background_image = models.ImageField("Фоновое изображение для блока водителей", upload_to="important/taxi/", blank=True, help_text="Фоновая картинка для блока водителей")

    driver_description_text = models.TextField("Описание для водителей", blank=True, help_text="Текст перед правилами водителей")

    driver_conclusion_text = models.TextField("Заключительный текст для водителей", blank=True, help_text="Финальный текст для водителей")

    

    order = models.PositiveIntegerField("Порядок отображения", default=0)

    

    class Meta:

        verbose_name = "Секция"

        verbose_name_plural = "Секции"

        ordering = ['order']



    def __str__(self) -> str:

        return f"{self.get_section_type_display()}: {self.title}"





class ImportantRule(TimestampedModel):

    """Правило в секции"""

    RULE_TYPE_CHOICES = [

        ('passenger', 'Для пассажиров'),

        ('driver', 'Для водителей'),

    ]

    

    page = models.ForeignKey(ImportantPage, on_delete=models.CASCADE, related_name='rules', null=True, blank=True)

    section = models.ForeignKey(ImportantSection, on_delete=models.CASCADE, related_name='rules')

    rule_type = models.CharField("Тип правила", max_length=20, choices=RULE_TYPE_CHOICES, default='passenger', blank=True)

    title = models.CharField("Заголовок правила", max_length=200)

    description = models.TextField("Описание правила")

    order = models.PositiveIntegerField("Порядок отображения", default=0)

    

    class Meta:

        verbose_name = "Правило"

        verbose_name_plural = "Правила"

        ordering = ['order']



    def __str__(self) -> str:

        return self.title





class ImportantImage(TimestampedModel):

    """Изображения для секций"""

    page = models.ForeignKey(ImportantPage, on_delete=models.CASCADE, related_name='images', null=True, blank=True)

    section = models.ForeignKey(ImportantSection, on_delete=models.CASCADE, related_name='images')

    image = models.ImageField("Изображение", upload_to="important/")

    title = models.CharField("Заголовок изображения", max_length=200, blank=True)

    description = models.TextField("Описание изображения", blank=True)

    alt_text = models.CharField("Альтернативный текст", max_length=200, blank=True)

    order = models.PositiveIntegerField("Порядок отображения", default=0)

    

    class Meta:

        verbose_name = "Изображение"

        verbose_name_plural = "Изображения"

        ordering = ['order']



    def __str__(self) -> str:

        return self.title or self.alt_text or f"Изображение {self.id}"
