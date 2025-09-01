from django.db import models
from cms.models import TimestampedModel


class BanksPage(TimestampedModel):
    """
    Главная страница банков
    """
    seo_title = models.CharField(max_length=60, blank=True, help_text="SEO заголовок страницы")
    seo_description = models.CharField(max_length=160, blank=True, help_text="SEO описание страницы")
    seo_keywords = models.CharField(max_length=255, blank=True, help_text="SEO ключевые слова (через запятую)")
    canonical_url = models.URLField(blank=True, help_text="Канонический URL")
    
    # Open Graph
    og_title = models.CharField(max_length=60, blank=True, help_text="Open Graph заголовок")
    og_description = models.CharField(max_length=160, blank=True, help_text="Open Graph описание")
    og_image = models.ImageField(upload_to="banks/og/", blank=True, help_text="Open Graph изображение")
    
    # Twitter Cards
    twitter_title = models.CharField(max_length=60, blank=True, help_text="Twitter Card заголовок")
    twitter_description = models.CharField(max_length=160, blank=True, help_text="Twitter Card описание")
    twitter_image = models.ImageField(upload_to="banks/twitter/", blank=True, help_text="Twitter Card изображение")
    
    # Robots
    robots_index = models.BooleanField(default=True, help_text="Разрешить индексацию")
    robots_follow = models.BooleanField(default=True, help_text="Разрешить следование по ссылкам")

    class Meta:
        verbose_name = "Страница банков"
        verbose_name_plural = "Страницы банков"

    def __str__(self) -> str:
        return "Страница банков"


class Bank(TimestampedModel):
    """
    Модель банка
    """
    page = models.ForeignKey(BanksPage, on_delete=models.CASCADE, related_name="banks")
    name = models.CharField(max_length=255, help_text="Название банка")
    name_link = models.URLField(blank=True, help_text="Ссылка на сайт банка")
    working_hours = models.TextField(blank=True, help_text="Режим работы")
    address = models.TextField(help_text="Адрес банка")
    address_link = models.URLField(blank=True, help_text="Ссылка на карту")
    contacts = models.CharField(max_length=255, help_text="Контактные данные")
    email = models.EmailField(help_text="Email банка")
    image = models.ImageField(upload_to="banks/logos/", help_text="Логотип банка")
    order = models.PositiveIntegerField(default=0, help_text="Порядок сортировки")

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "Банк"
        verbose_name_plural = "Банки"

    def __str__(self) -> str:
        return self.name
