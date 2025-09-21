from django.contrib import admin
from django.utils.html import format_html

from .models import TransportCommunicationsPage, TransportBlock


class TransportBlockInline(admin.TabularInline):
    model = TransportBlock
    extra = 0
    fields = ("title", "image_1", "image_1_preview", "image_2", "image_2_preview", "order")
    readonly_fields = ("image_1_preview", "image_2_preview")
    ordering = ("order", "id")

    def image_1_preview(self, obj):
        if obj.image_1:
            return format_html('<img src="{}" style="max-height: 60px; max-width: 120px;"/>', obj.image_1.url)
        return "—"
    image_1_preview.short_description = "Превью 1"

    def image_2_preview(self, obj):
        if obj.image_2:
            return format_html('<img src="{}" style="max-height: 60px; max-width: 120px;"/>', obj.image_2.url)
        return "—"
    image_2_preview.short_description = "Превью 2"


@admin.register(TransportCommunicationsPage)
class TransportCommunicationsPageAdmin(admin.ModelAdmin):
    list_display = ("id", "main_title", "created_at", "updated_at")
    inlines = [TransportBlockInline]
    readonly_fields = ("og_image_preview", "twitter_image_preview")
    fieldsets = (
        ("Основная информация", {
            "fields": ("main_title",),
        }),
        ("SEO", {
            "fields": ("seo_title", "seo_description", "seo_keywords", "canonical_url"),
            "classes": ("collapse",)
        }),
        ("Open Graph", {
            "fields": ("og_title", "og_description", "og_image", "og_image_preview"),
            "classes": ("collapse",)
        }),
        ("Twitter Cards", {
            "fields": ("twitter_title", "twitter_description", "twitter_image", "twitter_image_preview"),
            "classes": ("collapse",)
        }),
        ("Robots", {
            "fields": ("robots_index", "robots_follow"),
            "classes": ("collapse",)
        }),
    )

    def og_image_preview(self, obj):
        if obj.og_image:
            return format_html('<img src="{}" style="max-height: 100px; max-width: 200px;"/>', obj.og_image.url)
        return "—"
    og_image_preview.short_description = "Превью OG"

    def twitter_image_preview(self, obj):
        if obj.twitter_image:
            return format_html('<img src="{}" style="max-height: 100px; max-width: 200px;"/>', obj.twitter_image.url)
        return "—"
    twitter_image_preview.short_description = "Превью Twitter"

    def has_add_permission(self, request):
        if TransportCommunicationsPage.objects.exists():
            return False
        return super().has_add_permission(request)
