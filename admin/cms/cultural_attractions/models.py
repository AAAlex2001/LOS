from django.db import models
from cms.models import TimestampedModel


class CulturalAttractionsPage(TimestampedModel):
    # SEO
    seo_title = models.CharField(max_length=60, blank=True)
    seo_description = models.CharField(max_length=160, blank=True)
    seo_keywords = models.CharField(max_length=255, blank=True)
    canonical_url = models.URLField(blank=True)

    # Open Graph
    og_title = models.CharField(max_length=60, blank=True)
    og_description = models.CharField(max_length=160, blank=True)
    og_image = models.ImageField(upload_to="cultural_attractions/og/", blank=True)

    # Twitter
    twitter_title = models.CharField(max_length=60, blank=True)
    twitter_description = models.CharField(max_length=160, blank=True)
    twitter_image = models.ImageField(upload_to="cultural_attractions/twitter/", blank=True)

    # Robots
    robots_index = models.BooleanField(default=True)
    robots_follow = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Страница культурных достопримечательностей"
        verbose_name_plural = "Страница культурных достопримечательностей"

    def __str__(self) -> str:
        return "Страница культурных достопримечательностей"


class CulturalAttractionCity(TimestampedModel):
    page = models.ForeignKey(CulturalAttractionsPage, on_delete=models.CASCADE, related_name="cities")
    name = models.CharField("Город", max_length=255)
    title = models.CharField("Заголовок страницы города", max_length=255, blank=True, help_text="Если пусто, будет сформирован автоматически")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "Город (культурные достопримечательности)"
        verbose_name_plural = "Город (культурные достопримечательности)"

    def __str__(self) -> str:
        return self.name


class CulturalAttraction(TimestampedModel):
    page = models.ForeignKey(CulturalAttractionsPage, on_delete=models.CASCADE, related_name="attractions")
    city = models.ForeignKey(CulturalAttractionCity, on_delete=models.CASCADE, related_name="attractions")
    name = models.CharField("Название", max_length=255)
    name_link = models.URLField("Ссылка на сайт", blank=True)
    description = models.TextField("Описание", help_text="Подробное описание достопримечательности")
    address = models.CharField("Адрес", max_length=500)
    address_link = models.URLField("Ссылка на карту", blank=True)
    image = models.ImageField("Изображение", upload_to="cultural_attractions/images/", blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "Культурная достопримечательность"
        verbose_name_plural = "Культурная достопримечательность"

    def __str__(self) -> str:
        return self.name

