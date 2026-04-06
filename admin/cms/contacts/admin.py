from django.contrib import admin
from django.utils.html import format_html
from modeltranslation.admin import TranslationAdmin, TranslationTabularInline

from .models import ContactItem, ContactsPage


class ContactItemInline(TranslationTabularInline):
    model = ContactItem
    extra = 1
    fields = ("kind", "role", "value", "href", "icon", "order", "preview")
    readonly_fields = ("preview",)

    def preview(self, obj):
        if obj and obj.icon:
            return format_html('<img src="{}" style="height:60px;" />', obj.icon.url)
        return "—"

    preview.short_description = "Предпросмотр"


@admin.register(ContactsPage)
class ContactsPageAdmin(TranslationAdmin):
    list_display = ("id", "updated_at")
    inlines = [ContactItemInline]
    readonly_fields = ("seo_preview",)

    def has_add_permission(self, request):
        if ContactsPage.objects.exists():
            return False
        return super().has_add_permission(request)

    fieldsets = (
        (
            "Контент страницы",
            {
                "fields": (
                    "eyebrow",
                    "title",
                    "description",
                    "panel_title",
                    "panel_text",
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
