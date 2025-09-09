from django.db import models
from cms.models import TimestampedModel


class ShopsAndMarketsPage(TimestampedModel):
    # SEO
    seo_title = models.CharField(max_length=60, blank=True)
    seo_description = models.CharField(max_length=160, blank=True)
    seo_keywords = models.CharField(max_length=255, blank=True)
    canonical_url = models.URLField(blank=True)

    # Open Graph
    og_title = models.CharField(max_length=60, blank=True)
    og_description = models.CharField(max_length=160, blank=True)
    og_image = models.ImageField(upload_to="shops_and_markets/og/", blank=True)

    # Twitter
    twitter_title = models.CharField(max_length=60, blank=True)
    twitter_description = models.CharField(max_length=160, blank=True)
    twitter_image = models.ImageField(upload_to="shops_and_markets/twitter/", blank=True)

    # Robots
    robots_index = models.BooleanField(default=True)
    robots_follow = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Страница магазинов и рынков"
        verbose_name_plural = "Страница магазинов и рынков"

    def __str__(self) -> str:
        return "Страница магазинов и рынков"


class ShopCity(TimestampedModel):
    page = models.ForeignKey(ShopsAndMarketsPage, on_delete=models.CASCADE, related_name="cities")
    name = models.CharField("Город", max_length=255)
    title = models.CharField("Заголовок страницы города", max_length=255, blank=True, help_text="Если пусто, будет сформирован автоматически")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "Город (магазины и рынки)"
        verbose_name_plural = "Город (магазины и рынки)"

    def __str__(self) -> str:
        return self.name


class ShopOrMarket(TimestampedModel):
    page = models.ForeignKey(ShopsAndMarketsPage, on_delete=models.CASCADE, related_name="shops")
    city = models.ForeignKey(ShopCity, on_delete=models.CASCADE, related_name="shops")
    name = models.CharField("Название", max_length=255)
    working_hours = models.CharField("Часы работы", max_length=255, blank=True)
    address = models.CharField("Адрес", max_length=500)
    address_link = models.URLField("Ссылка на карту", blank=True)
    contacts = models.CharField("Контакты", max_length=255, blank=True)
    image = models.ImageField("Изображение", upload_to="shops_and_markets/images/", blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "Магазин или рынок"
        verbose_name_plural = "Магазин или рынок"

    def __str__(self) -> str:
        return self.name

