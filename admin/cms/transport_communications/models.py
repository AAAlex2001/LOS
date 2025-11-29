from django.db import models
from cms.models import TimestampedModel


class TransportCommunicationsPage(TimestampedModel):
    """
    Главная страница "Транспортное сообщение республики Абхазия"
    """
    main_title = models.CharField("Основной заголовок", max_length=255, default="Транспортное сообщение республики Абхазия")

    # SEO
    seo_title = models.CharField(max_length=60, blank=True)
    seo_description = models.CharField(max_length=160, blank=True)
    seo_keywords = models.CharField(max_length=255, blank=True)
    canonical_url = models.URLField(blank=True)

    # Open Graph
    og_title = models.CharField(max_length=60, blank=True)
    og_description = models.CharField(max_length=160, blank=True)
    og_image = models.ImageField(upload_to="transport_communications/og/", blank=True)

    # Twitter Cards
    twitter_title = models.CharField(max_length=60, blank=True)
    twitter_description = models.CharField(max_length=160, blank=True)
    twitter_image = models.ImageField(upload_to="transport_communications/twitter/", blank=True)

    # Robots
    robots_index = models.BooleanField(default=True)
    robots_follow = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Страница 'Транспортное сообщение'"
        verbose_name_plural = "Страница 'Транспортное сообщение'"

    def __str__(self) -> str:
        return "Страница 'Транспортное сообщение'"


class TransportBlock(TimestampedModel):
    page = models.ForeignKey(TransportCommunicationsPage, on_delete=models.CASCADE, related_name="transport_blocks")
    title = models.CharField("Заголовок блока", max_length=255)
    location_link = models.URLField("Ссылка на геолокацию", blank=True, help_text="Ссылка на карту для заголовка")
    image_1 = models.ImageField("Первое изображение", upload_to="transport_communications/blocks/", blank=True)
    image_2 = models.ImageField("Второе изображение", upload_to="transport_communications/blocks/", blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "Транспортный блок"
        verbose_name_plural = "Транспортные блоки"

    def __str__(self) -> str:
        return self.title
