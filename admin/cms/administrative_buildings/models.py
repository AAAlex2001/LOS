from django.db import models
from cms.models import TimestampedModel


class AdministrativeBuildingsPage(TimestampedModel):
    main_title = models.CharField("Основной заголовок", max_length=255, default="Административные здания")

    # SEO
    seo_title = models.CharField(max_length=60, blank=True)
    seo_description = models.CharField(max_length=160, blank=True)
    seo_keywords = models.CharField(max_length=255, blank=True)
    canonical_url = models.URLField(blank=True)

    # Open Graph
    og_title = models.CharField(max_length=60, blank=True)
    og_description = models.CharField(max_length=160, blank=True)
    og_image = models.ImageField(upload_to="administrative_buildings/og/", blank=True)

    # Twitter
    twitter_title = models.CharField(max_length=60, blank=True)
    twitter_description = models.CharField(max_length=160, blank=True)
    twitter_image = models.ImageField(upload_to="administrative_buildings/twitter/", blank=True)

    # Robots
    robots_index = models.BooleanField(default=True)
    robots_follow = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Страница административных зданий"
        verbose_name_plural = "Страницы административных зданий"

    def __str__(self) -> str:
        return "Страница административных зданий"


class City(TimestampedModel):
    page = models.ForeignKey(AdministrativeBuildingsPage, on_delete=models.CASCADE, related_name="cities")
    name = models.CharField("Город", max_length=255)
    title = models.CharField("Заголовок страницы города", max_length=255, blank=True, help_text="Если пусто, будет сформирован автоматически")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "Город"
        verbose_name_plural = "Города"

    def __str__(self) -> str:
        return self.name


class AdministrativeBuilding(TimestampedModel):
    page = models.ForeignKey(AdministrativeBuildingsPage, on_delete=models.CASCADE, related_name="buildings")
    city = models.ForeignKey(City, on_delete=models.CASCADE, related_name="buildings")
    name = models.CharField("Название", max_length=255)
    name_link = models.URLField("Ссылка на сайт", blank=True)
    working_hours = models.CharField("Режим работы", max_length=255, blank=True)
    address = models.CharField("Адрес", max_length=500)
    address_link = models.URLField("Ссылка на карту", blank=True)
    contacts = models.CharField("Контакты", max_length=255, blank=True)
    image = models.ImageField("Изображение", upload_to="administrative_buildings/images/", blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "Административное здание"
        verbose_name_plural = "Административные здания"

    def __str__(self) -> str:
        return self.name


