from django.db import models
from cms.models import TimestampedModel


class GovernmentStructurePage(TimestampedModel):
    seo_title = models.CharField(max_length=60, blank=True)
    seo_description = models.CharField(max_length=160, blank=True)
    seo_keywords = models.CharField(max_length=255, blank=True)
    canonical_url = models.URLField(blank=True)

    og_title = models.CharField(max_length=60, blank=True)
    og_description = models.CharField(max_length=160, blank=True)
    og_image = models.ImageField(upload_to="gov/og/", blank=True)

    twitter_title = models.CharField(max_length=60, blank=True)
    twitter_description = models.CharField(max_length=160, blank=True)
    twitter_image = models.ImageField(upload_to="gov/twitter/", blank=True)

    robots_index = models.BooleanField(default=True)
    robots_follow = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Страница: Государственное устройство"
        verbose_name_plural = "Страница: Государственное устройство"

    def __str__(self) -> str:
        return "Государственное устройство"


class GovernmentBlock(TimestampedModel):
    page = models.ForeignKey(GovernmentStructurePage, on_delete=models.CASCADE, related_name="blocks")
    title = models.CharField(max_length=255, blank=True)
    content = models.TextField(blank=True)
    image = models.ImageField(upload_to="gov/images/", blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "Блок описания"
        verbose_name_plural = "Блоки описания"

    def __str__(self) -> str:
        return self.title


