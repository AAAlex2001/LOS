from django.db import models
from cms.models import TimestampedModel


class PharmacyPage(TimestampedModel):
    # SEO
    seo_title = models.CharField(max_length=60, blank=True)
    seo_description = models.CharField(max_length=160, blank=True)
    seo_keywords = models.CharField(max_length=255, blank=True)
    canonical_url = models.URLField(blank=True)

    # Open Graph
    og_title = models.CharField(max_length=60, blank=True)
    og_description = models.CharField(max_length=160, blank=True)
    og_image = models.ImageField(upload_to="pharmacy/og/", blank=True)

    # Twitter
    twitter_title = models.CharField(max_length=60, blank=True)
    twitter_description = models.CharField(max_length=160, blank=True)
    twitter_image = models.ImageField(upload_to="pharmacy/twitter/", blank=True)

    # Robots
    robots_index = models.BooleanField(default=True)
    robots_follow = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Страница аптек"
        verbose_name_plural = "Страница аптек"

    def __str__(self) -> str:
        return "Страница аптек"


class PharmacyCity(TimestampedModel):
    page = models.ForeignKey(PharmacyPage, on_delete=models.CASCADE, related_name="cities")
    name = models.CharField("Город", max_length=255)
    title = models.CharField("Заголовок страницы города", max_length=255, blank=True, help_text="Если пусто, будет сформирован автоматически")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "Город (аптеки)"
        verbose_name_plural = "Город (аптеки)"

    def __str__(self) -> str:
        return self.name


class PharmacyItem(TimestampedModel):
    page = models.ForeignKey(PharmacyPage, on_delete=models.CASCADE, related_name="pharmacies")
    city = models.ForeignKey(PharmacyCity, on_delete=models.CASCADE, related_name="pharmacies")
    name = models.CharField("Название", max_length=255)
    name_link = models.URLField("Ссылка на сайт", blank=True)
    working_hours = models.CharField("Часы работы", max_length=255, blank=True)
    address = models.CharField("Адрес", max_length=500)
    address_link = models.URLField("Ссылка на карту", blank=True)
    contacts = models.CharField("Контакты", max_length=255, blank=True)
    image = models.ImageField("Изображение", upload_to="pharmacy/images/", blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "Аптека"
        verbose_name_plural = "Аптека"

    def __str__(self) -> str:
        return self.name

