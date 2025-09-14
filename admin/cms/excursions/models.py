from django.db import models
from cms.models import TimestampedModel


class ExcursionsPage(TimestampedModel):
    seo_title = models.CharField(max_length=60, blank=True)
    seo_description = models.CharField(max_length=160, blank=True)
    seo_keywords = models.CharField(max_length=255, blank=True)
    canonical_url = models.URLField(blank=True)

    og_title = models.CharField(max_length=60, blank=True)
    og_description = models.CharField(max_length=160, blank=True)
    og_image = models.ImageField(upload_to="excursions/og/", blank=True)

    twitter_title = models.CharField(max_length=60, blank=True)
    twitter_description = models.CharField(max_length=160, blank=True)
    twitter_image = models.ImageField(upload_to="excursions/twitter/", blank=True)

    robots_index = models.BooleanField(default=True)
    robots_follow = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Страница экскурсий"
        verbose_name_plural = "Страница экскурсий"

    def __str__(self) -> str:
        return "Страница экскурсий"


class ExcursionService(TimestampedModel):
    page = models.ForeignKey(ExcursionsPage, on_delete=models.CASCADE, related_name="services")
    image = models.ImageField(upload_to="excursions/logos/", blank=True)
    contacts = models.CharField(max_length=255)
    site = models.URLField(blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "Сервис экскурсий"
        verbose_name_plural = "Сервисы экскурсий"

    def __str__(self) -> str:
        return f"{self.contacts}"


