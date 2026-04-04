from django.contrib import admin
from django.utils.html import format_html
from modeltranslation.admin import TranslationAdmin

from .models import ContactsPage


@admin.register(ContactsPage)
class ContactsPageAdmin(TranslationAdmin):
    list_display = ("id", "title", "updated_at")
    readonly_fields = ("seo_preview", "email_image_preview", "telegram_image_preview")

    def has_add_permission(self, request):
        if ContactsPage.objects.exists():
            return False
        return super().has_add_permission(request)

    fieldsets = (
        (
            "Контент страницы",
            {
                "fields": (
                    "title",
                    "description",
                    "panel_title",
                    "panel_text",
                )
            },
        ),
        (
            "Контакты",
            {
                "fields": (
                    "email_role",
                    "email",
                    "email_image",
                    "email_image_preview",
                    "telegram_role",
                    "telegram",
                    "telegram_display",
                    "telegram_image",
                    "telegram_image_preview",
                )
            },
        ),
        (
            "SEO",
            {
                "fields": (
                    "seo_title",
                    "seo_description",
                    "seo_keywords",
                    "canonical_url",
                    "robots_index",
                    "robots_follow",
                    "seo_preview",
                )
            },
        ),
        (
            "Open Graph",
            {"fields": ("og_title", "og_description", "og_image")},
        ),
        (
            "Twitter Cards",
            {"fields": ("twitter_title", "twitter_description", "twitter_image")},
        ),
    )

    def seo_preview(self, obj):
        if not obj.seo_title and not obj.seo_description:
            return "SEO не настроено"
        preview = f"<strong>{obj.seo_title or 'Без заголовка'}</strong><br>"
        preview += f"{obj.seo_description or 'Без описания'}"
        return format_html(preview)

    seo_preview.short_description = "SEO предпросмотр"

    def email_image_preview(self, obj):
        if obj and obj.email_image:
            return format_html(
                '<img src="{}" style="max-height: 60px; max-width: 120px;"/>',
                obj.email_image.url,
            )
        return "—"

    email_image_preview.short_description = "Превью иконки email"

    def telegram_image_preview(self, obj):
        if obj and obj.telegram_image:
            return format_html(
                '<img src="{}" style="max-height: 60px; max-width: 120px;"/>',
                obj.telegram_image.url,
            )
        return "—"

    telegram_image_preview.short_description = "Превью иконки Telegram"
