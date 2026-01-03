from __future__ import annotations



from django.db import models





class TimestampedModel(models.Model):

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)



    class Meta:

        abstract = True





class ImageAsset(TimestampedModel):

    """
    Переиспользуемая модель для управления изображениями на всех страницах
    """

    alt = models.CharField(max_length=255, blank=True, help_text="Альтернативный текст для изображения")

    image = models.ImageField(upload_to="uploads/%Y/%m/%d", help_text="Файл изображения")

    order = models.PositiveIntegerField(default=0, help_text="Порядок сортировки")



    class Meta:

        ordering = ["order", "id"]

        verbose_name = "Изображение"

        verbose_name_plural = "Изображения"



    def __str__(self) -> str:

        return self.alt or f"Image {self.id}"





                                                   

class AdSlider(TimestampedModel):

    title = models.CharField(max_length=255, default="Ad Slider")



    class Meta:

        verbose_name = "Рекламный слайдер"

        verbose_name_plural = "Рекламные слайдеры"



    def __str__(self) -> str:

        return self.title





class AdSlide(TimestampedModel):

    class MediaType(models.TextChoices):

        IMAGE = "image", "Изображение"

        VIDEO = "video", "Видео"



    slider = models.ForeignKey(AdSlider, on_delete=models.CASCADE, related_name="slides")

    media_type = models.CharField(max_length=10, choices=MediaType.choices, default=MediaType.IMAGE)

    image = models.ImageField(upload_to="adslider/images/%Y/%m/%d", blank=True, null=True)

    video = models.FileField(upload_to="adslider/videos/%Y/%m/%d", blank=True, null=True)

    alt = models.CharField(max_length=255, blank=True)

    order = models.PositiveIntegerField(default=0)



    class Meta:

        ordering = ["order", "id"]

        verbose_name = "Слайд рекламного слайдера"

        verbose_name_plural = "Слайды рекламного слайдера"



    def __str__(self) -> str:

        return self.alt or f"AdSlide {self.id}"





