from __future__ import annotations



from django.db import models

from ..models import TimestampedModel





class Footer(TimestampedModel):

               

    description = models.TextField(blank=True, default="", help_text="Описание сервиса (О сервисе)")

    

                           

    contact_info = models.TextField(blank=True, default="", help_text="Контактная информация (часы работы, телефон и т.д.)")

    email = models.EmailField(blank=True, default="", help_text="Email для связи")

    

              

    copyright_text = models.CharField(max_length=255, blank=True, default="", help_text="Текст копирайта")

    

    class Meta:

        verbose_name = "Футер"

        verbose_name_plural = "Футер"

    

    def __str__(self) -> str:

        return "Настройки футера"





class FooterLink(TimestampedModel):

    class Category(models.TextChoices):

        QUICK_LINKS = "quick_links", "Быстрые ссылки"

        LEGAL = "legal", "Правовая информация"

    

    footer = models.ForeignKey(Footer, on_delete=models.CASCADE, related_name="links")

    category = models.CharField(max_length=20, choices=Category.choices, help_text="Категория ссылки")

    label = models.CharField(max_length=255, help_text="Текст ссылки")

    url = models.CharField(max_length=500, help_text="URL ссылки")

    order = models.PositiveIntegerField(default=0, help_text="Порядок отображения")

    

    class Meta:

        ordering = ["category", "order", "id"]

        verbose_name = "Ссылка в футере"

        verbose_name_plural = "Ссылки в футере"

    

    def __str__(self) -> str:

        return f"{self.get_category_display()}: {self.label}"





class SocialLink(TimestampedModel):

    class SocialNetwork(models.TextChoices):

        TELEGRAM = "telegram", "Telegram"

        INSTAGRAM = "instagram", "Instagram"

        TWITTER = "twitter", "Twitter (X)"

        FACEBOOK = "facebook", "Facebook"

        YOUTUBE = "youtube", "YouTube"

        RUTUBE = "rutube", "Rutube"

    

    footer = models.ForeignKey(Footer, on_delete=models.CASCADE, related_name="social_links")

    network = models.CharField(max_length=20, choices=SocialNetwork.choices, help_text="Социальная сеть")

    url = models.CharField(max_length=500, help_text="Ссылка на профиль")

    order = models.PositiveIntegerField(default=0, help_text="Порядок отображения")

    

    class Meta:

        ordering = ["order", "id"]

        verbose_name = "Ссылка на соцсеть"

        verbose_name_plural = "Ссылки на соцсети"

    

    def __str__(self) -> str:

        return f"{self.get_network_display()}: {self.url}"



