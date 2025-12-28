from django.db import models
from cms.models import TimestampedModel


class RestaurantsPage(TimestampedModel):
    # SEO
    seo_title = models.CharField(max_length=60, blank=True)
    seo_description = models.CharField(max_length=160, blank=True)
    seo_keywords = models.CharField(max_length=255, blank=True)
    canonical_url = models.URLField(blank=True)

    # Open Graph
    og_title = models.CharField(max_length=60, blank=True)
    og_description = models.CharField(max_length=160, blank=True)
    og_image = models.ImageField(upload_to="restaurants/og/", blank=True)

    # Twitter
    twitter_title = models.CharField(max_length=60, blank=True)
    twitter_description = models.CharField(max_length=160, blank=True)
    twitter_image = models.ImageField(upload_to="restaurants/twitter/", blank=True)

    # Robots
    robots_index = models.BooleanField(default=True)
    robots_follow = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Страница ресторанов"
        verbose_name_plural = "Страница ресторанов"

    def __str__(self) -> str:
        return "Страница ресторанов"


class RestaurantCity(TimestampedModel):
    page = models.ForeignKey(RestaurantsPage, on_delete=models.CASCADE, related_name="cities")
    name = models.CharField("Город", max_length=255, blank=True)
    title = models.CharField("Заголовок страницы города", max_length=255, blank=True, help_text="Если пусто, будет сформирован автоматически")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "Город (рестораны)"
        verbose_name_plural = "Город (рестораны)"

    def __str__(self) -> str:
        return self.name


class Restaurant(TimestampedModel):
    page = models.ForeignKey(RestaurantsPage, on_delete=models.CASCADE, related_name="restaurants")
    city = models.ForeignKey(RestaurantCity, on_delete=models.CASCADE, related_name="restaurants")
    name = models.CharField("Название", max_length=255, blank=True)
    name_link = models.URLField("Ссылка (соцсети/инстаграм)", blank=True)
    website = models.URLField("Сайт", blank=True)
    address = models.CharField("Адрес", max_length=500, blank=True)
    address_link = models.URLField("Ссылка на карту", blank=True)
    phone = models.CharField("Телефон", max_length=255, blank=True)
    working_hours = models.CharField("Часы работы", max_length=255, blank=True)
    image = models.ImageField("Изображение", upload_to="restaurants/images/", blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "Ресторан"
        verbose_name_plural = "Ресторан"

    def __str__(self) -> str:
        return self.name

