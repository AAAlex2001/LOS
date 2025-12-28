from django.db import models
from cms.models import TimestampedModel


class HotelsPage(TimestampedModel):
    # SEO
    seo_title = models.CharField(max_length=60, blank=True)
    seo_description = models.CharField(max_length=160, blank=True)
    seo_keywords = models.CharField(max_length=255, blank=True)
    canonical_url = models.URLField(blank=True)

    # Open Graph
    og_title = models.CharField(max_length=60, blank=True)
    og_description = models.CharField(max_length=160, blank=True)
    og_image = models.ImageField(upload_to="hotels/og/", blank=True)

    # Twitter
    twitter_title = models.CharField(max_length=60, blank=True)
    twitter_description = models.CharField(max_length=160, blank=True)
    twitter_image = models.ImageField(upload_to="hotels/twitter/", blank=True)

    # Robots
    robots_index = models.BooleanField(default=True)
    robots_follow = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Страница отелей"
        verbose_name_plural = "Страница отелей"

    def __str__(self) -> str:
        return "Страница отелей"


class HotelCity(TimestampedModel):
    page = models.ForeignKey(HotelsPage, on_delete=models.CASCADE, related_name="cities")
    name = models.CharField("Город", max_length=255, blank=True)
    title = models.CharField("Заголовок страницы города", max_length=255, blank=True, help_text="Если пусто, будет сформирован автоматически")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "Город (отели)"
        verbose_name_plural = "Город (отели)"

    def __str__(self) -> str:
        return self.name


class Hotel(TimestampedModel):
    page = models.ForeignKey(HotelsPage, on_delete=models.CASCADE, related_name="hotels")
    city = models.ForeignKey(HotelCity, on_delete=models.CASCADE, related_name="hotels")
    name = models.CharField("Название", max_length=255, blank=True)
    address = models.CharField("Адрес", max_length=500, blank=True)
    address_link = models.URLField("Ссылка на карту", blank=True)
    contacts = models.CharField("Контакты", max_length=255, blank=True)
    price = models.CharField("Цена", max_length=255, blank=True)
    image = models.ImageField("Изображение", upload_to="hotels/images/", blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "Отель"
        verbose_name_plural = "Отель"

    def __str__(self) -> str:
        return self.name

