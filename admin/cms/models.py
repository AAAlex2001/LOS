from __future__ import annotations

from django.db import models


class TimestampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Page(TimestampedModel):
    slug = models.SlugField(max_length=120, unique=True, help_text="URL-идентификатор страницы")
    title = models.CharField(max_length=255)
    subtitle = models.CharField(max_length=255, blank=True)
    body = models.TextField(blank=True)

    class Meta:
        ordering = ["slug"]
        verbose_name = "Страница"
        verbose_name_plural = "Страницы"

    def __str__(self) -> str:  # pragma: no cover - trivial
        return f"{self.title} ({self.slug})"


class ImageAsset(TimestampedModel):
    page = models.ForeignKey(Page, on_delete=models.CASCADE, related_name="images")
    alt = models.CharField(max_length=255, blank=True)
    image = models.ImageField(upload_to="uploads/%Y/%m/%d")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "Изображение"
        verbose_name_plural = "Изображения"

    def __str__(self) -> str:  # pragma: no cover - trivial
        return self.alt or f"Image {self.id}"


class HomePage(TimestampedModel):
    hero_text = models.TextField(blank=True, help_text="Текст в геро-секции. Можно использовать HTML для переносов строк")

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


