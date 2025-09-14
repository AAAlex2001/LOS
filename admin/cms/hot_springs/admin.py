from django.contrib import admin
from .models import HotSpringsPage, HotSpring


class HotSpringInline(admin.TabularInline):
    model = HotSpring
    extra = 1
    fields = ("title", "description", "image", "order")


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


