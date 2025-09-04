from django.db import models
from cms.models import TimestampedModel


class AbkhazianCuisinePage(TimestampedModel):
    """
    Главная страница абхазской кухни
    """
    # Основной заголовок страницы
    main_title = models.CharField(max_length=255, default="Абхазская кухня: традиции, вкус и атмосфера", help_text="Основной заголовок страницы")
    
    seo_title = models.CharField(max_length=60, blank=True, help_text="SEO заголовок страницы")
    seo_description = models.CharField(max_length=160, blank=True, help_text="SEO описание страницы")
    seo_keywords = models.CharField(max_length=255, blank=True, help_text="SEO ключевые слова (через запятую)")
    canonical_url = models.URLField(blank=True, help_text="Канонический URL")
    
    # Open Graph
    og_title = models.CharField(max_length=60, blank=True, help_text="Open Graph заголовок")
    og_description = models.CharField(max_length=160, blank=True, help_text="Open Graph описание")
    og_image = models.ImageField(upload_to="abkhazian_cuisine/og/", blank=True, help_text="Open Graph изображение")
    
    # Twitter Cards
    twitter_title = models.CharField(max_length=60, blank=True, help_text="Twitter Card заголовок")
    twitter_description = models.CharField(max_length=160, blank=True, help_text="Twitter Card описание")
    twitter_image = models.ImageField(upload_to="abkhazian_cuisine/twitter/", blank=True, help_text="Twitter Card изображение")
    
    # Robots
    robots_index = models.BooleanField(default=True, help_text="Разрешить индексацию")
    robots_follow = models.BooleanField(default=True, help_text="Разрешить следование по ссылкам")

    # Основное изображение страницы
    hero_image = models.ImageField(upload_to="abkhazian_cuisine/hero/", blank=True, help_text="Главное изображение страницы")

    class Meta:
        verbose_name = "Страница абхазской кухни"
        verbose_name_plural = "Страницы абхазской кухни"

    def __str__(self) -> str:
        return "Страница абхазской кухни"


class CuisineSection(TimestampedModel):
    """
    Секция контента на странице абхазской кухни
    """
    page = models.ForeignKey(AbkhazianCuisinePage, on_delete=models.CASCADE, related_name="sections")
    title = models.CharField(max_length=255, help_text="Заголовок секции")
    text = models.TextField(help_text="Текст секции")
    order = models.PositiveIntegerField(default=0, help_text="Порядок сортировки")

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "Секция кухни"
        verbose_name_plural = "Секции кухни"

    def __str__(self) -> str:
        return self.title


class MainDish(TimestampedModel):
    """
    Основные блюда абхазской кухни
    """
    page = models.ForeignKey(AbkhazianCuisinePage, on_delete=models.CASCADE, related_name="main_dishes")
    name = models.CharField(max_length=255, help_text="Название блюда")
    description = models.TextField(help_text="Описание блюда")
    order = models.PositiveIntegerField(default=0, help_text="Порядок сортировки")

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "Основное блюдо"
        verbose_name_plural = "Основные блюда"

    def __str__(self) -> str:
        return self.name
