from django.db import models
from cms.models import TimestampedModel


class MobileCommunicationPage(TimestampedModel):
    """
    Главная страница "Интернет и мобильная связь"
    """
    main_title = models.CharField("Основной заголовок", max_length=255, default="Интернет и мобильная связь", help_text="Основной заголовок страницы")
    intro_text = models.TextField("Вводный текст", blank=True, help_text="Текст в блоке с фоновым изображением")
    background_image = models.ImageField("Фоновое изображение", upload_to="mobile_communication/background/", blank=True, help_text="Фоновое изображение для вводного блока")
    mobile_section_title = models.CharField("Заголовок раздела 'Мобильная связь'", max_length=255, default="Мобильная связь", blank=True)
    internet_section_title = models.CharField("Заголовок раздела 'Интернет'", max_length=255, default="Интернет", blank=True)

    # SEO
    seo_title = models.CharField(max_length=60, blank=True, help_text="SEO заголовок страницы")
    seo_description = models.CharField(max_length=160, blank=True, help_text="SEO описание страницы")
    seo_keywords = models.CharField(max_length=255, blank=True, help_text="SEO ключевые слова (через запятую)")
    canonical_url = models.URLField(blank=True, help_text="Канонический URL")

    # Open Graph
    og_title = models.CharField(max_length=60, blank=True, help_text="Open Graph заголовок")
    og_description = models.CharField(max_length=160, blank=True, help_text="Open Graph описание")
    og_image = models.ImageField(upload_to="mobile_communication/og/", blank=True, help_text="Open Graph изображение")

    # Twitter Cards
    twitter_title = models.CharField(max_length=60, blank=True, help_text="Twitter Card заголовок")
    twitter_description = models.CharField(max_length=160, blank=True, help_text="Twitter Card описание")
    twitter_image = models.ImageField(upload_to="mobile_communication/twitter/", blank=True, help_text="Twitter Card изображение")

    # Robots
    robots_index = models.BooleanField(default=True, help_text="Разрешить индексацию")
    robots_follow = models.BooleanField(default=True, help_text="Разрешить следование по ссылкам")

    class Meta:
        verbose_name = "Страница 'Мобильная связь'"
        verbose_name_plural = "Страница 'Мобильная связь'"

    def __str__(self) -> str:
        return "Страница 'Мобильная связь'"


class MobileProvider(TimestampedModel):
    """
    Мобильный оператор
    """
    page = models.ForeignKey(MobileCommunicationPage, on_delete=models.CASCADE, related_name="mobile_providers")
    name = models.CharField("Название оператора", max_length=255)
    description = models.TextField("Описание", blank=True)
    website_url = models.URLField("Ссылка на сайт", blank=True)
    logo_image = models.ImageField("Логотип", upload_to="mobile_communication/mobile_providers/", blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "Мобильный оператор"
        verbose_name_plural = "Мобильные операторы"

    def __str__(self) -> str:
        return self.name


class InternetProvider(TimestampedModel):
    """
    Интернет провайдер
    """
    page = models.ForeignKey(MobileCommunicationPage, on_delete=models.CASCADE, related_name="internet_providers")
    name = models.CharField("Название провайдера", max_length=255)
    description = models.TextField("Описание", blank=True)
    website_url = models.URLField("Ссылка на сайт", blank=True)
    logo_image = models.ImageField("Логотип", upload_to="mobile_communication/internet_providers/", blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "Интернет провайдер"
        verbose_name_plural = "Интернет провайдеры"

    def __str__(self) -> str:
        return self.name





