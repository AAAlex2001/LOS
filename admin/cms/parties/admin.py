from django.contrib import admin
from django.utils.html import format_html

from .models import PartiesPage, PartyCity, PartyEvent, PartySliderItem




class PartyCityInline(admin.TabularInline):
    model = PartyCity
    extra = 1
    fields = ("name", "slug", "city_image", "city_image_preview", "order")
    readonly_fields = ("city_image_preview",)
    ordering = ("order", "id")

    def city_image_preview(self, obj):
        if obj.city_image:
            return format_html('<img src="{}" style="max-height: 60px; max-width: 100px;"/>', obj.city_image.url)
        return "—"
    city_image_preview.short_description = "Превью"


class PartyEventInline(admin.StackedInline):
    model = PartyEvent
    extra = 2
    fields = ("city", "title", "date_info", "location", "location_link", "description", "event_url", "order")
    ordering = ("city__order", "order", "id")
    classes = ("collapse",)


class PartySliderItemInline(admin.StackedInline):
    model = PartySliderItem
    extra = 2
    fields = ("city", "media_type", "media_file", "media_preview", "order")
    readonly_fields = ("media_preview",)
    ordering = ("city__order", "order", "id")
    classes = ("collapse",)

    def media_preview(self, obj):
        if obj.media_file:
            if obj.media_type == 'video':
                return format_html('<video controls style="max-height: 100px; max-width: 150px;"><source src="{}" type="video/mp4"></video>', obj.media_file.url)
            else:
                return format_html('<img src="{}" style="max-height: 100px; max-width: 150px;"/>', obj.media_file.url)
        return "—"
    media_preview.short_description = "Превью"


@admin.register(PartiesPage)
class PartiesPageAdmin(admin.ModelAdmin):
    list_display = ("id", "main_title", "created_at", "updated_at")
    inlines = [PartyCityInline, PartyEventInline, PartySliderItemInline]
    readonly_fields = (
        "background_image_preview", "center_icon_preview", 
        "decor_image_1_preview", "decor_image_2_preview", "decor_image_3_preview", 
        "decor_image_4_preview", "decor_image_5_preview",
        "og_image_preview", "twitter_image_preview"
    )
    fieldsets = (
        ("Основная информация", {
            "fields": ("main_title",),
        }),
        ("Баннер", {
            "fields": (
                "background_image", "background_image_preview",
                "center_icon", "center_icon_preview",
                "intro_text"
            ),
        }),
        ("Декоративные изображения", {
            "fields": (
                ("decor_image_1", "decor_image_1_preview"),
                ("decor_image_2", "decor_image_2_preview"),
                ("decor_image_3", "decor_image_3_preview"),
                ("decor_image_4", "decor_image_4_preview"),
                ("decor_image_5", "decor_image_5_preview"),
            ),
            "classes": ("collapse",)
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

    def background_image_preview(self, obj):
        if obj.background_image:
            return format_html('<img src="{}" style="max-height: 100px; max-width: 200px;"/>', obj.background_image.url)
        return "—"
    background_image_preview.short_description = "Превью фона"

    def center_icon_preview(self, obj):
        if obj.center_icon:
            return format_html('<img src="{}" style="max-height: 80px; max-width: 80px;"/>', obj.center_icon.url)
        return "—"
    center_icon_preview.short_description = "Превью иконки"

    def decor_image_1_preview(self, obj):
        if obj.decor_image_1:
            return format_html('<img src="{}" style="max-height: 80px; max-width: 80px;"/>', obj.decor_image_1.url)
        return "—"
    decor_image_1_preview.short_description = "Превью декора 1"

    def decor_image_2_preview(self, obj):
        if obj.decor_image_2:
            return format_html('<img src="{}" style="max-height: 80px; max-width: 80px;"/>', obj.decor_image_2.url)
        return "—"
    decor_image_2_preview.short_description = "Превью декора 2"

    def decor_image_3_preview(self, obj):
        if obj.decor_image_3:
            return format_html('<img src="{}" style="max-height: 80px; max-width: 80px;"/>', obj.decor_image_3.url)
        return "—"
    decor_image_3_preview.short_description = "Превью декора 3"

    def decor_image_4_preview(self, obj):
        if obj.decor_image_4:
            return format_html('<img src="{}" style="max-height: 80px; max-width: 80px;"/>', obj.decor_image_4.url)
        return "—"
    decor_image_4_preview.short_description = "Превью декора 4"

    def decor_image_5_preview(self, obj):
        if obj.decor_image_5:
            return format_html('<img src="{}" style="max-height: 80px; max-width: 80px;"/>', obj.decor_image_5.url)
        return "—"
    decor_image_5_preview.short_description = "Превью декора 5"

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
        if PartiesPage.objects.exists():
            return False
        return super().has_add_permission(request)


# Убираем отдельные админки - все редактируется inline на странице PartiesPage
