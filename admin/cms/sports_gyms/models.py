from django.db import models
from cms.models import TimestampedModel


class SportsGymsPage(TimestampedModel):
    # SEO
    seo_title = models.CharField(max_length=60, blank=True)
    seo_description = models.CharField(max_length=160, blank=True)
    seo_keywords = models.CharField(max_length=255, blank=True)
    canonical_url = models.URLField(blank=True)

    # Open Graph
    og_title = models.CharField(max_length=60, blank=True)
    og_description = models.CharField(max_length=160, blank=True)
    og_image = models.ImageField(upload_to="sports_gyms/og/", blank=True)

    # Twitter
    twitter_title = models.CharField(max_length=60, blank=True)
    twitter_description = models.CharField(max_length=160, blank=True)
    twitter_image = models.ImageField(upload_to="sports_gyms/twitter/", blank=True)

    # Robots
    robots_index = models.BooleanField(default=True)
    robots_follow = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Страница спортивных залов"
        verbose_name_plural = "Страница спортивных залов"

    def __str__(self) -> str:
        return "Страница спортивных залов"


class SportsGym(TimestampedModel):
    page = models.ForeignKey(SportsGymsPage, on_delete=models.CASCADE, related_name="gyms")
    name = models.CharField("Название", max_length=255)
    name_link = models.URLField("Ссылка на сайт", blank=True)
    working_hours = models.CharField("Режим работы", max_length=255, blank=True)
    address = models.CharField("Адрес", max_length=500)
    address_link = models.URLField("Ссылка на карту", blank=True)
    contacts = models.CharField("Контакты", max_length=255, blank=True)
    image = models.ImageField("Изображение", upload_to="sports_gyms/images/", blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "Спортивный зал"
        verbose_name_plural = "Спортивный зал"

    def __str__(self) -> str:
        return self.name


