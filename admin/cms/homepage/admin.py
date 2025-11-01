from django.contrib import admin
from django.utils.html import format_html

from .models import (
    HomePage,
    HomeSliderItem,
    HomeCity,
    HomeActivity,
    HomeActionButton,
    HomePopupItem,
    HomeTab,
    MobileHomeTab,
    AboutAbkhaziaCategory,
    EntertainmentCategory,
    PlanTripCategory,
    ImportantTripCategory,
)


class SliderInline(admin.TabularInline):
    model = HomeSliderItem
    extra = 1
    fields = ("media_type", "image", "video", "mobile_video", "alt", "order", "preview")
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


class TabInline(admin.TabularInline):
    model = HomeTab
    extra = 1
    fields = ("group", "label", "href", "order")


class MobileTabInline(admin.TabularInline):
    model = MobileHomeTab
    extra = 1
    fields = ("group", "label", "order")


class AboutAbkhaziaCategoryInline(admin.TabularInline):
    model = AboutAbkhaziaCategory
    extra = 1
    fields = ("title", "slug", "is_active", "order")


class EntertainmentCategoryInline(admin.TabularInline):
    model = EntertainmentCategory
    extra = 1
    fields = ("title", "slug", "is_active", "order")


class PlanTripCategoryInline(admin.TabularInline):
    model = PlanTripCategory
    extra = 1
    fields = ("title", "slug", "is_active", "order")


class ImportantTripCategoryInline(admin.TabularInline):
    model = ImportantTripCategory
    extra = 1
    fields = ("title", "slug", "is_active", "order")


@admin.register(HomePage)
class HomePageAdmin(admin.ModelAdmin):
    list_display = ("id", "updated_at")
    inlines = [TabInline, MobileTabInline, AboutAbkhaziaCategoryInline, EntertainmentCategoryInline, PlanTripCategoryInline, ImportantTripCategoryInline, SliderInline, CityInline, ActivityInline, ActionButtonInline, PopupItemInline]
    readonly_fields = ("seo_preview",)

    def has_add_permission(self, request):
        if HomePage.objects.exists():
            return False
        return super().has_add_permission(request)

    fieldsets = (
        ("Герой-секция", {
            "fields": (
                "hero_text_primary",
                "hero_text_secondary",
                "hero_bg_image",
            )
        }),
        ("Заголовки секций", {
            "fields": (
                "cities_section_title",
                "activities_section_title",
                "actions_section_title",
            )
        }),
        ("CTA блок", {
            "fields": (
                "cta_title",
                "cta_hero_text",
                "cta_bg_image",
                "cta_overlay_image",
                "cta_card_image",
                "cta_card_title",
                "cta_card_description",
                "cta_button_label",
                "cta_button_href",
            )
        }),
        ("Фоны", {
            "fields": (
                "activities_bg_image",
            )
        }),
        ("SEO", {
            "fields": (
                "seo_title",
                "seo_description",
                "seo_keywords",
                "canonical_url",
            )
        }),
        ("Open Graph", {
            "fields": (
                "og_title",
                "og_description",
                "og_image",
            )
        }),
        ("Twitter Cards", {
            "fields": (
                "twitter_title",
                "twitter_description",
                "twitter_image",
            )
        }),
        ("Robots", {
            "fields": (
                "robots_index",
                "robots_follow",
            )
        }),
    )

    def seo_preview(self, obj):
        if not obj.seo_title and not obj.seo_description:
            return "SEO не настроено"
        
        preview = f"<strong>{obj.seo_title or 'Без заголовка'}</strong><br>"
        preview += f"{obj.seo_description or 'Без описания'}"
        
        return format_html(preview)
    
    seo_preview.short_description = "SEO предпросмотр"

