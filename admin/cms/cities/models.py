from django.db import models
from cms.models import TimestampedModel


class CitiesPage(TimestampedModel):
    # SEO
    seo_title = models.CharField(max_length=60, blank=True)
    seo_description = models.CharField(max_length=160, blank=True)
    seo_keywords = models.CharField(max_length=255, blank=True)
    canonical_url = models.URLField(blank=True)

    # Open Graph
    og_title = models.CharField(max_length=60, blank=True)
    og_description = models.CharField(max_length=160, blank=True)
    og_image = models.ImageField(upload_to="cities/og/", blank=True)

    # Twitter
    twitter_title = models.CharField(max_length=60, blank=True)
    twitter_description = models.CharField(max_length=160, blank=True)
    twitter_image = models.ImageField(upload_to="cities/twitter/", blank=True)

    # Robots
    robots_index = models.BooleanField(default=True)
    robots_follow = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Страница городов"
        verbose_name_plural = "Страница городов"

    def __str__(self) -> str:
        return "Страница городов"


class City(TimestampedModel):
    page = models.ForeignKey(CitiesPage, on_delete=models.CASCADE, related_name="cities")
    name = models.CharField("Название города", max_length=255)
    title = models.CharField("Заголовок страницы города", max_length=255, blank=True, help_text="Если пусто, будет сформирован автоматически")
    description = models.TextField("Описание города", blank=True)
    image = models.ImageField("Изображение города", upload_to="cities/images/", blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "Город"
        verbose_name_plural = "Города"

    def __str__(self) -> str:
        return self.name
