from django.db import models
from cms.models import TimestampedModel


class HotSpringsPage(TimestampedModel):
    seo_title = models.CharField(max_length=60, blank=True)
    seo_description = models.CharField(max_length=160, blank=True)
    seo_keywords = models.CharField(max_length=255, blank=True)
    canonical_url = models.URLField(blank=True)

    og_title = models.CharField(max_length=60, blank=True)
    og_description = models.CharField(max_length=160, blank=True)
    og_image = models.ImageField(upload_to="hot_springs/og/", blank=True)

    twitter_title = models.CharField(max_length=60, blank=True)
    twitter_description = models.CharField(max_length=160, blank=True)
    twitter_image = models.ImageField(upload_to="hot_springs/twitter/", blank=True)

    robots_index = models.BooleanField(default=True)
    robots_follow = models.BooleanField(default=True)

    # Hero section
    hero_text = models.TextField(blank=True, help_text="Текст на плашке вверху страницы (поддержка переносов и **жирного**)" )
    hero_background = models.ImageField(upload_to="hot_springs/hero/", blank=True, help_text="Фоновое изображение для плашки")

    class Meta:
        verbose_name = "Страница: Горячие источники"
        verbose_name_plural = "Страница: Горячие источники"

    def __str__(self) -> str:
        return "Горячие источники"


class HotSpring(TimestampedModel):
    page = models.ForeignKey(HotSpringsPage, on_delete=models.CASCADE, related_name="springs")
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to="hot_springs/images/", blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "Горячий источник"
        verbose_name_plural = "Горячие источники"

    def __str__(self) -> str:
        return self.title


