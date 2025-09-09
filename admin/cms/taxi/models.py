from django.db import models
from cms.models import TimestampedModel


class TaxiPage(TimestampedModel):
    """
    Главная страница такси
    """
    # Заголовок страницы
    main_title = models.CharField(max_length=255, default="Такси", help_text="Основной заголовок страницы")

    # Текст/изображение
    intro_text = models.TextField("Вводный текст", blank=True, help_text="Текст поверх фонового изображения (двойной Enter = новая строка)")
    hero_image = models.ImageField("Фоновое изображение интро", upload_to="taxi/hero/", blank=True, help_text="Фон для блока с вводным текстом")

    # SEO
    seo_title = models.CharField(max_length=60, blank=True, help_text="SEO заголовок страницы")
    seo_description = models.CharField(max_length=160, blank=True, help_text="SEO описание страницы")
    seo_keywords = models.CharField(max_length=255, blank=True, help_text="SEO ключевые слова (через запятую)")
    canonical_url = models.URLField(blank=True, help_text="Канонический URL")

    # Open Graph
    og_title = models.CharField(max_length=60, blank=True, help_text="Open Graph заголовок")
    og_description = models.CharField(max_length=160, blank=True, help_text="Open Graph описание")
    og_image = models.ImageField(upload_to="taxi/og/", blank=True, help_text="Open Graph изображение")

    # Twitter Cards
    twitter_title = models.CharField(max_length=60, blank=True, help_text="Twitter Card заголовок")
    twitter_description = models.CharField(max_length=160, blank=True, help_text="Twitter Card описание")
    twitter_image = models.ImageField(upload_to="taxi/twitter/", blank=True, help_text="Twitter Card изображение")

    # Robots
    robots_index = models.BooleanField(default=True, help_text="Разрешить индексацию")
    robots_follow = models.BooleanField(default=True, help_text="Разрешить следование по ссылкам")

    class Meta:
        verbose_name = "Страница такси"
        verbose_name_plural = "Страница такси"

    def __str__(self) -> str:
        return "Страница такси"


class TaxiService(TimestampedModel):
    """
    Служба такси
    """
    page = models.ForeignKey(TaxiPage, on_delete=models.CASCADE, related_name="services")
    name = models.CharField("Название", max_length=255, help_text="Название службы такси")
    working_hours = models.CharField("Режим работы", max_length=255, blank=True, help_text="Например: круглосуточно")
    phones_raw = models.TextField("Телефоны", blank=True, help_text="Один номер на строку")
    site = models.URLField("Сайт", blank=True, help_text="Ссылка на сайт")
    image = models.ImageField("Логотип", upload_to="taxi/logos/", blank=True, help_text="Логотип службы такси")
    order = models.PositiveIntegerField(default=0, help_text="Порядок сортировки")

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "Служба такси"
        verbose_name_plural = "Служба такси"

    def __str__(self) -> str:
        return self.name


