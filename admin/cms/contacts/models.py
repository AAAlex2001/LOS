from django.db import models

from cms.models import TimestampedModel


class ContactsPage(TimestampedModel):
    eyebrow = models.CharField("Плашка над заголовком", max_length=255, blank=True)
    title = models.CharField("Заголовок (герой)", max_length=255, blank=True)
    description = models.TextField("Текст под заголовком", blank=True)
    panel_title = models.CharField("Заголовок панели контактов", max_length=255, blank=True)
    panel_text = models.TextField("Текст панели контактов", blank=True)

    email_role = models.CharField("Подпись для email", max_length=255, blank=True)
    telegram_role = models.CharField("Подпись для Telegram", max_length=255, blank=True)

    email = models.EmailField("Email", blank=True)
    telegram = models.URLField("Ссылка Telegram", blank=True)
    telegram_display = models.CharField(
        "Текст ссылки Telegram (например @username)",
        max_length=255,
        blank=True,
    )

    email_image = models.ImageField(upload_to="contacts/email/", blank=True)
    telegram_image = models.ImageField(upload_to="contacts/telegram/", blank=True)

    seo_title = models.CharField(max_length=60, blank=True)
    seo_description = models.CharField(max_length=160, blank=True)
    seo_keywords = models.CharField(max_length=255, blank=True)
    canonical_url = models.URLField(blank=True)

    og_title = models.CharField(max_length=60, blank=True)
    og_description = models.CharField(max_length=160, blank=True)
    og_image = models.ImageField(upload_to="contacts/og/", blank=True)

    twitter_title = models.CharField(max_length=60, blank=True)
    twitter_description = models.CharField(max_length=160, blank=True)
    twitter_image = models.ImageField(upload_to="contacts/twitter/", blank=True)

    robots_index = models.BooleanField(default=True)
    robots_follow = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Страница контактов"
        verbose_name_plural = "Страница контактов"

    def __str__(self) -> str:
        return self.title or "Страница контактов"


class ContactItem(TimestampedModel):
    KIND_EMAIL = "email"
    KIND_TELEGRAM = "telegram"
    KIND_CHOICES = (
        (KIND_EMAIL, "Email"),
        (KIND_TELEGRAM, "Telegram"),
    )

    page = models.ForeignKey(ContactsPage, on_delete=models.CASCADE, related_name="items")
    kind = models.CharField("Тип контакта", max_length=20, choices=KIND_CHOICES, default=KIND_EMAIL)
    role = models.CharField("Подпись", max_length=255, blank=True)
    value = models.CharField("Отображаемое значение", max_length=255, blank=True)
    href = models.URLField("Ссылка (для email можно оставить пустой)", blank=True)
    icon = models.ImageField("Иконка", upload_to="contacts/items/", blank=True)
    order = models.PositiveIntegerField("Порядок", default=0)

    class Meta:
        ordering = ("order", "id")
        verbose_name = "Контакт"
        verbose_name_plural = "Контакты"

    def __str__(self) -> str:
        return self.role or self.value or f"Контакт #{self.pk}"
