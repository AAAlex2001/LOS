from __future__ import annotations

from django.db import models
from ..models import TimestampedModel


class HomePage(TimestampedModel):
    hero_text_primary = models.TextField(blank=True, default="", help_text="Геро-текст №1. Перенос строки через Enter")
    hero_text_secondary = models.TextField(blank=True, default="", help_text="Геро-текст №2. Перенос строки через Enter")
    hero_bg_image = models.ImageField(upload_to="homepage/bg/%Y/%m/%d", blank=True, null=True)

    # Табы теперь управляются через HomeTab

    # Заголовки секций
    cities_section_title = models.CharField(max_length=255, blank=True, default="")
    activities_section_title = models.CharField(max_length=255, blank=True, default="")
    actions_section_title = models.CharField(max_length=255, blank=True, default="")

    # CTA блок (Отдых в Абхазии — с комфортом)
    cta_title = models.CharField(max_length=255, blank=True, default="")
    cta_hero_text = models.TextField(blank=True, default="", help_text="Текст над карточкой. Перенос строки через Enter")
    cta_bg_image = models.ImageField(upload_to="homepage/cta_bg/%Y/%m/%d", blank=True, null=True)
    cta_overlay_image = models.ImageField(upload_to="homepage/cta_overlay/%Y/%m/%d", blank=True, null=True)
    cta_card_image = models.ImageField(upload_to="homepage/cta/%Y/%m/%d", blank=True, null=True)
    cta_card_title = models.CharField(max_length=255, blank=True, default="")
    cta_card_description = models.CharField(max_length=255, blank=True, default="")
    cta_button_label = models.CharField(max_length=100, blank=True, default="")
    cta_button_href = models.CharField(max_length=255, blank=True, default="")

    # Фон раздела "развлечения"
    activities_bg_image = models.ImageField(upload_to="homepage/bg/%Y/%m/%d", blank=True, null=True)

    # SEO / OpenGraph / Twitter
    seo_title = models.CharField(max_length=255, blank=True, default="")
    seo_description = models.TextField(blank=True, default="")
    seo_keywords = models.CharField(max_length=255, blank=True, default="")
    canonical_url = models.CharField(max_length=255, blank=True, default="")
    og_title = models.CharField(max_length=255, blank=True, default="")
    og_description = models.TextField(blank=True, default="")
    og_image = models.ImageField(upload_to="homepage/seo/og/%Y/%m/%d", blank=True, null=True)
    twitter_title = models.CharField(max_length=255, blank=True, default="")
    twitter_description = models.TextField(blank=True, default="")
    twitter_image = models.ImageField(upload_to="homepage/seo/twitter/%Y/%m/%d", blank=True, null=True)
    robots_index = models.BooleanField(default=True)
    robots_follow = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Главная страница (данные)"
        verbose_name_plural = "Главная страница (данные)"

    def __str__(self) -> str:  # pragma: no cover - trivial
        return "Главная страница"


class HomeSliderItem(TimestampedModel):
    class MediaType(models.TextChoices):
        IMAGE = "image", "Изображение"
        VIDEO = "video", "Видео"

    homepage = models.ForeignKey(HomePage, on_delete=models.CASCADE, related_name="slider_items")
    media_type = models.CharField(max_length=10, choices=MediaType.choices, default=MediaType.IMAGE)
    image = models.ImageField(upload_to="homepage/slider/images/%Y/%m/%d", blank=True, null=True)
    video = models.FileField(upload_to="homepage/slider/videos/%Y/%m/%d", blank=True, null=True)
    alt = models.CharField(max_length=255, blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "Слайд"
        verbose_name_plural = "Слайды"

    def __str__(self) -> str:  # pragma: no cover - trivial
        return self.alt or f"Slide {self.id}"


class HomeCity(TimestampedModel):
    homepage = models.ForeignKey(HomePage, on_delete=models.CASCADE, related_name="cities")
    image = models.ImageField(upload_to="homepage/cities/%Y/%m/%d")
    title = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "Город (карточка)"
        verbose_name_plural = "Города (карточки)"

    def __str__(self) -> str:  # pragma: no cover - trivial
        return self.title


class HomeActivity(TimestampedModel):
    homepage = models.ForeignKey(HomePage, on_delete=models.CASCADE, related_name="activities")
    image = models.ImageField(upload_to="homepage/activities/%Y/%m/%d")
    title = models.CharField(max_length=255)
    href = models.CharField(max_length=255, help_text="Ссылка внутри сайта, например /parties")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "Активность"
        verbose_name_plural = "Активности"

    def __str__(self) -> str:  # pragma: no cover - trivial
        return self.title


class HomeActionButton(TimestampedModel):
    homepage = models.ForeignKey(HomePage, on_delete=models.CASCADE, related_name="action_buttons")
    label = models.CharField(max_length=255)
    href = models.CharField(max_length=255)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "Кнопка (действие)"
        verbose_name_plural = "Кнопки (действия)"

    def __str__(self) -> str:  # pragma: no cover - trivial
        return self.label


class HomePopupItem(TimestampedModel):
    class Group(models.TextChoices):
        ABOUT = "about", "Об Абхазии"
        ACTIVITIES = "activities", "Чем заняться"
        BOOKING = "booking", "Запланируйте поездку"
        ESSENTIALS = "essentials", "Необходимо в поездке"

    homepage = models.ForeignKey(HomePage, on_delete=models.CASCADE, related_name="popup_items")
    group = models.CharField(max_length=20, choices=Group.choices)
    label = models.CharField(max_length=255)
    href = models.CharField(max_length=255)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["group", "order", "id"]
        verbose_name = "Пункт всплывающего меню"
        verbose_name_plural = "Пункты всплывающего меню"

    def __str__(self) -> str:  # pragma: no cover - trivial
        return f"{self.get_group_display()}: {self.label}"


class HomeTab(TimestampedModel):
    homepage = models.ForeignKey(HomePage, on_delete=models.CASCADE, related_name="tabs")
    group = models.CharField(max_length=20, choices=HomePopupItem.Group.choices)
    label = models.CharField(max_length=100)
    order = models.PositiveIntegerField(default=0)
    href = models.CharField(max_length=255, blank=True, default="")

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "Таб (верхнее меню)"
        verbose_name_plural = "Табы (верхнее меню)"

    def __str__(self) -> str:  # pragma: no cover - trivial
        return self.label

