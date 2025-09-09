from django.db import models
from cms.models import TimestampedModel


class HistoryAndCulturePage(TimestampedModel):
    """
    Главная страница истории и культуры
    """
    seo_title = models.CharField(max_length=60, blank=True, help_text="SEO заголовок страницы")
    seo_description = models.CharField(max_length=160, blank=True, help_text="SEO описание страницы")
    seo_keywords = models.CharField(max_length=255, blank=True, help_text="SEO ключевые слова (через запятую)")
    canonical_url = models.URLField(blank=True, help_text="Канонический URL")
    
    # Open Graph
    og_title = models.CharField(max_length=60, blank=True, help_text="Open Graph заголовок")
    og_description = models.CharField(max_length=160, blank=True, help_text="Open Graph описание")
    og_image = models.ImageField(upload_to="history_and_culture/og/", blank=True, help_text="Open Graph изображение")
    
    # Twitter Cards
    twitter_title = models.CharField(max_length=60, blank=True, help_text="Twitter Card заголовок")
    twitter_description = models.CharField(max_length=160, blank=True, help_text="Twitter Card описание")
    twitter_image = models.ImageField(upload_to="history_and_culture/twitter/", blank=True, help_text="Twitter Card изображение")
    
    # Robots
    robots_index = models.BooleanField(default=True, help_text="Разрешить индексацию")
    robots_follow = models.BooleanField(default=True, help_text="Разрешить следование по ссылкам")

    class Meta:
        verbose_name = "Страница истории и культуры"
        verbose_name_plural = "Страница истории и культуры"

    def __str__(self) -> str:
        return "Страница истории и культуры"


class HistorySection(TimestampedModel):
    """
    Секция истории
    """
    page = models.ForeignKey(HistoryAndCulturePage, on_delete=models.CASCADE, related_name="history_sections")
    title = models.CharField(max_length=255, help_text="Заголовок секции")
    content = models.TextField(help_text="Содержимое секции")
    image = models.ImageField(upload_to="history_and_culture/history/", blank=True, help_text="Изображение секции")
    order = models.PositiveIntegerField(default=0, help_text="Порядок сортировки")

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "Секция истории"
        verbose_name_plural = "Секция истории"

    def __str__(self) -> str:
        return self.title


class CultureSection(TimestampedModel):
    """
    Секция культуры
    """
    page = models.ForeignKey(HistoryAndCulturePage, on_delete=models.CASCADE, related_name="culture_sections")
    title = models.CharField(max_length=255, help_text="Заголовок секции")
    content = models.TextField(help_text="Содержимое секции")
    image = models.ImageField(upload_to="history_and_culture/culture/", blank=True, help_text="Изображение секции")
    order = models.PositiveIntegerField(default=0, help_text="Порядок сортировки")

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "Секция культуры"
        verbose_name_plural = "Секция культуры"

    def __str__(self) -> str:
        return self.title
