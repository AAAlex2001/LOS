from django.db import models
from cms.models import TimestampedModel


class BeautySalonsPage(TimestampedModel):
    # SEO
    seo_title = models.CharField(max_length=60, blank=True)
    seo_description = models.CharField(max_length=160, blank=True)
    seo_keywords = models.CharField(max_length=255, blank=True)
    canonical_url = models.URLField(blank=True)

    # Open Graph
    og_title = models.CharField(max_length=60, blank=True)
    og_description = models.CharField(max_length=160, blank=True)
    og_image = models.ImageField(upload_to="beauty_salons/og/", blank=True)

    # Twitter
    twitter_title = models.CharField(max_length=60, blank=True)
    twitter_description = models.CharField(max_length=160, blank=True)
    twitter_image = models.ImageField(upload_to="beauty_salons/twitter/", blank=True)

    # Robots
    robots_index = models.BooleanField(default=True)
    robots_follow = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Страница салонов красоты"
        verbose_name_plural = "Страницы салонов красоты"

    def __str__(self) -> str:
        return "Страница салонов красоты"


class BeautySalonCity(TimestampedModel):
    page = models.ForeignKey(BeautySalonsPage, on_delete=models.CASCADE, related_name="cities")
    name = models.CharField("Город", max_length=255)
    title = models.CharField("Заголовок страницы города", max_length=255, blank=True, help_text="Если пусто, будет сформирован автоматически")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "Город (салоны красоты)"
        verbose_name_plural = "Города (салоны красоты)"

    def __str__(self) -> str:
        return self.name


class BeautySalon(TimestampedModel):
    page = models.ForeignKey(BeautySalonsPage, on_delete=models.CASCADE, related_name="beauty_salons")
    city = models.ForeignKey(BeautySalonCity, on_delete=models.CASCADE, related_name="beauty_salons")
    name = models.CharField("Название", max_length=255)
    name_link = models.URLField("Ссылка на сайт", blank=True)
    address = models.CharField("Адрес", max_length=500)
    address_link = models.URLField("Ссылка на карту", blank=True)
    phone = models.CharField("Телефон", max_length=255, blank=True)
    working_hours = models.CharField("Режим работы", max_length=255, blank=True)
    services = models.TextField("Услуги", blank=True, help_text="Список услуг, через запятую или с новой строки")
    image = models.ImageField("Изображение", upload_to="beauty_salons/images/", blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "Салон красоты"
        verbose_name_plural = "Салоны красоты"

    def __str__(self) -> str:
        return self.name
