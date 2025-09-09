from django.db import models
from cms.models import TimestampedModel


class CarWashesPage(TimestampedModel):
    # SEO
    seo_title = models.CharField(max_length=60, blank=True)
    seo_description = models.CharField(max_length=160, blank=True)
    seo_keywords = models.CharField(max_length=255, blank=True)
    canonical_url = models.URLField(blank=True)

    # Open Graph
    og_title = models.CharField(max_length=60, blank=True)
    og_description = models.CharField(max_length=160, blank=True)
    og_image = models.ImageField(upload_to="car_washes/og/", blank=True)

    # Twitter
    twitter_title = models.CharField(max_length=60, blank=True)
    twitter_description = models.CharField(max_length=160, blank=True)
    twitter_image = models.ImageField(upload_to="car_washes/twitter/", blank=True)

    # Robots
    robots_index = models.BooleanField(default=True)
    robots_follow = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Страница моек машин"
        verbose_name_plural = "Страницы моек машин"

    def __str__(self) -> str:
        return "Страница моек машин"


class CarWashCity(TimestampedModel):
    page = models.ForeignKey(CarWashesPage, on_delete=models.CASCADE, related_name="cities")
    name = models.CharField("Город", max_length=255)
    title = models.CharField("Заголовок страницы города", max_length=255, blank=True, help_text="Если пусто, будет сформирован автоматически")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "Город (мойки машин)"
        verbose_name_plural = "Города (мойки машин)"

    def __str__(self) -> str:
        return self.name


class CarWash(TimestampedModel):
    page = models.ForeignKey(CarWashesPage, on_delete=models.CASCADE, related_name="car_washes")
    city = models.ForeignKey(CarWashCity, on_delete=models.CASCADE, related_name="car_washes")
    name = models.CharField("Название", max_length=255)
    name_link = models.URLField("Ссылка на сайт", blank=True)
    address = models.CharField("Адрес", max_length=500)
    address_link = models.URLField("Ссылка на карту", blank=True)
    contacts = models.CharField("Контакты", max_length=255, blank=True)
    working_hours = models.CharField("Режим работы", max_length=255, blank=True)
    services = models.TextField("Услуги", blank=True, help_text="Список услуг, через запятую или с новой строки")
    image = models.ImageField("Изображение", upload_to="car_washes/images/", blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "Мойка машин"
        verbose_name_plural = "Мойки машин"

    def __str__(self) -> str:
        return self.name
