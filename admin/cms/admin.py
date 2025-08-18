from django.contrib import admin

from django.utils.html import format_html

from .models import (
    Page,
    ImageAsset,
    HomePage,
    HomeSliderItem,
    HomeCity,
    HomeActivity,
    HomeActionButton,
    HomePopupItem,
)


class ImageInline(admin.TabularInline):
    model = ImageAsset
    extra = 1


@admin.register(Page)
class PageAdmin(admin.ModelAdmin):
    list_display = ("id", "slug", "title", "updated_at")
    list_display_links = ("id", "slug", "title")
    search_fields = ("slug", "title", "subtitle", "body")
    list_filter = ("updated_at",)
    inlines = [ImageInline]


@admin.register(ImageAsset)
class ImageAssetAdmin(admin.ModelAdmin):
    list_display = ("id", "page", "alt", "order", "updated_at")
    list_editable = ("order",)
    search_fields = ("alt", "page__title", "page__slug")
    list_filter = ("updated_at",)


class SliderInline(admin.TabularInline):
    model = HomeSliderItem
    extra = 1
    fields = ("media_type", "image", "video", "alt", "order", "preview")
    readonly_fields = ("preview",)

    def preview(self, obj):
        if obj and obj.image:
            return format_html('<img src="{}" style="height:60px;" />', obj.image.url)
        return "—"


class CityInline(admin.TabularInline):
    model = HomeCity
    extra = 1
    fields = ("image", "title", "description", "order", "preview")
    readonly_fields = ("preview",)

    def preview(self, obj):
        if obj and obj.image:
            return format_html('<img src="{}" style="height:60px;" />', obj.image.url)
        return "—"


class ActivityInline(admin.TabularInline):
    model = HomeActivity
    extra = 1
    fields = ("image", "title", "href", "order", "preview")
    readonly_fields = ("preview",)

    def preview(self, obj):
        if obj and obj.image:
            return format_html('<img src="{}" style="height:60px;" />', obj.image.url)
        return "—"


class ActionButtonInline(admin.TabularInline):
    model = HomeActionButton
    extra = 1
    fields = ("label", "href", "order")


class PopupItemInline(admin.TabularInline):
    model = HomePopupItem
    extra = 1
    fields = ("group", "label", "href", "order")


@admin.register(HomePage)
class HomePageAdmin(admin.ModelAdmin):
    list_display = ("id", "updated_at")
    inlines = [SliderInline, CityInline, ActivityInline, ActionButtonInline, PopupItemInline]
    fieldsets = (
        ("Геро-секции", {"fields": ("hero_text_primary", "hero_text_secondary", "hero_bg_image")}),
        ("Табы", {"fields": ("tab_about_label", "tab_activities_label", "tab_booking_label", "tab_essentials_label")}),
        ("Заголовки секций", {"fields": ("cities_section_title", "activities_section_title", "actions_section_title")}),
        ("CTA блок", {"fields": ("cta_title", "cta_hero_text", "cta_bg_image", "cta_overlay_image", "cta_card_image", "cta_card_title", "cta_card_description", "cta_button_label", "cta_button_href")}),
    )


## Убран отдельный раздел рекламных слайдеров; управление слайдами в HomePage


