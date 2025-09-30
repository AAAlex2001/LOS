from django.contrib import admin
from .models import GovernmentStructurePage, GovernmentBlock


class GovernmentBlockInline(admin.TabularInline):
    model = GovernmentBlock
    extra = 1
    fields = ("title", "content", "image", "order")


@admin.register(GovernmentStructurePage)
class GovernmentStructurePageAdmin(admin.ModelAdmin):
    list_display = ("id", "seo_title", "updated_at")
    inlines = [GovernmentBlockInline]

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






