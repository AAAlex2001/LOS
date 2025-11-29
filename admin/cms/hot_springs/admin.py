from django.contrib import admin
from django.utils.html import format_html
from .models import HotSpringsPage, HotSpring


class HotSpringInline(admin.TabularInline):
    model = HotSpring
    extra = 1
    fields = ("title", "location_link", "description", "image", "image_preview", "order")
    readonly_fields = ("image_preview",)

    def image_preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" style="max-height: 100px; max-width: 100px;" />',
                obj.image.url
            )
        return "Нет изображения"
    image_preview.short_description = "Превью"


@admin.register(HotSpringsPage)
class HotSpringsPageAdmin(admin.ModelAdmin):
    list_display = ("id", "seo_title", "updated_at")
    inlines = [HotSpringInline]

    fieldsets = (
        ("SEO настройки", {
            "fields": ("seo_title", "seo_description", "seo_keywords", "canonical_url")
        }),
        ("Hero блок", {
            "fields": ("hero_text", "hero_background"),
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


