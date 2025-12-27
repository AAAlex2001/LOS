from django.contrib import admin
from django.utils.html import format_html
from modeltranslation.admin import TranslationAdmin, TranslationTabularInline
from .models import ExcursionsPage, ExcursionService


class ExcursionInline(TranslationTabularInline):
    model = ExcursionService
    extra = 1
    fields = ("contacts", "site", "image", "order", "preview")
    readonly_fields = ("preview",)

    def preview(self, obj):
        if obj and obj.image:
            return format_html('<img src="{}" style="height:60px;" />', obj.image.url)
        return "—"

    preview.short_description = "Предпросмотр"


@admin.register(ExcursionsPage)
class ExcursionsPageAdmin(TranslationAdmin):
    list_display = ["id", "seo_title", "created_at", "updated_at"]
    list_filter = ["created_at", "updated_at"]
    search_fields = ["seo_title", "seo_description"]

    inlines = [ExcursionInline]

    fieldsets = (
        ("SEO настройки", {
            "fields": ("seo_title", "seo_description", "seo_keywords", "canonical_url")
        }),
        ("Open Graph", {
            "fields": ("og_title", "og_description", "og_image")
        }),
        ("Twitter Cards", {
            "fields": ("twitter_title", "twitter_description", "twitter_image")
        }),
        ("Robots", {
            "fields": ("robots_index", "robots_follow")
        }),
    )

# Не регистрируем ExcursionService отдельно — управление только через инлайны


