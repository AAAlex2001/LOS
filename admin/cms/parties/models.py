from django.db import models
from cms.models import TimestampedModel


class PartiesPage(TimestampedModel):
    """
    Главная страница "Вечеринки и яркие впечатления"
    """
    main_title = models.CharField("Основной заголовок", max_length=255, default="Вечеринки и яркие впечатления")
    
    # Баннер
    background_image = models.ImageField("Фоновое изображение баннера", upload_to="parties/background/", blank=True)
    center_icon = models.ImageField("Центральная иконка", upload_to="parties/icons/", blank=True)
    
    # Декоративные изображения
    decor_image_1 = models.ImageField("Декоративное изображение 1 (слева сверху)", upload_to="parties/decor/", blank=True)
    decor_image_2 = models.ImageField("Декоративное изображение 2 (слева снизу)", upload_to="parties/decor/", blank=True)
    decor_image_3 = models.ImageField("Декоративное изображение 3 (центр снизу)", upload_to="parties/decor/", blank=True)
    decor_image_4 = models.ImageField("Декоративное изображение 4 (справа сверху)", upload_to="parties/decor/", blank=True)
    decor_image_5 = models.ImageField("Декоративное изображение 5 (справа снизу)", upload_to="parties/decor/", blank=True)
    
    # Текст баннера
    intro_text = models.TextField("Текст баннера", blank=True, help_text="Поддерживаются переносы строк")

    # SEO
    seo_title = models.CharField(max_length=60, blank=True)
    seo_description = models.CharField(max_length=160, blank=True)
    seo_keywords = models.CharField(max_length=255, blank=True)
    canonical_url = models.URLField(blank=True)

    # Open Graph
    og_title = models.CharField(max_length=60, blank=True)
    og_description = models.CharField(max_length=160, blank=True)
    og_image = models.ImageField(upload_to="parties/og/", blank=True)

    # Twitter Cards
    twitter_title = models.CharField(max_length=60, blank=True)
    twitter_description = models.CharField(max_length=160, blank=True)
    twitter_image = models.ImageField(upload_to="parties/twitter/", blank=True)

    # Robots
    robots_index = models.BooleanField(default=True)
    robots_follow = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Страница 'Вечеринки'"
        verbose_name_plural = "Страница 'Вечеринки'"

    def __str__(self) -> str:
        return "Страница 'Вечеринки'"


class PartyCity(TimestampedModel):
    """
    Город для вечеринок
    """
    page = models.ForeignKey(PartiesPage, on_delete=models.CASCADE, related_name="cities")
    name = models.CharField("Название города", max_length=255)
    slug = models.SlugField("URL slug", unique=True, help_text="Для идентификации в URL")
    city_image = models.ImageField("Изображение города", upload_to="parties/cities/", blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "Город для вечеринок"
        verbose_name_plural = "Города для вечеринок"

    def __str__(self) -> str:
        return self.name


class PartyEvent(TimestampedModel):
    """
    Событие вечеринки
    """
    city = models.ForeignKey(PartyCity, on_delete=models.CASCADE, related_name="events")
    title = models.CharField("Название события", max_length=255)
    date_info = models.CharField("Информация о дате", max_length=500, blank=True)
    location = models.CharField("Местоположение", max_length=500, blank=True)
    description = models.TextField("Описание события", blank=True, help_text="Поддерживаются переносы строк")
    event_url = models.URLField("Ссылка на событие", blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "Событие"
        verbose_name_plural = "События"

    def __str__(self) -> str:
        return f"{self.city.name} - {self.title}"
