from django.contrib import admin
from django.utils.html import format_html
from modeltranslation.admin import TranslationAdmin, TranslationTabularInline

from .models import AbkhazianCustomsPage, CustomSection


class CustomSectionInline(TranslationTabularInline):
    model = CustomSection
    extra = 1
    fields = ("title", "text", "order")


@admin.register(AbkhazianCustomsPage)
class AbkhazianCustomsPageAdmin(TranslationAdmin):
    list_display = ("id", "updated_at")
    inlines = [CustomSectionInline]
    readonly_fields = ("seo_preview", "hero_image_preview")

    def has_add_permission(self, request):
        if AbkhazianCustomsPage.objects.exists():
            return False
        return super().has_add_permission(request)
    
    fieldsets = (
        ("Основное содержимое", {
            "fields": ("main_title", "intro_text", "hero_image", "hero_image_preview")
        }),
        ("SEO", {
            "fields": (
                "seo_title", "seo_description", "seo_keywords", "canonical_url",
                "robots_index", "robots_follow", "seo_preview"
            )
        }),
        ("Open Graph", {
            "fields": ("og_title", "og_description", "og_image")
        }),
        ("Twitter Cards", {
            "fields": ("twitter_title", "twitter_description", "twitter_image")
        }),
    )

    def seo_preview(self, obj):
        if not obj.seo_title and not obj.seo_description:
            return "SEO не настроено"
        
        preview = f"<strong>{obj.seo_title or 'Без заголовка'}</strong><br>"
        preview += f"{obj.seo_description or 'Без описания'}"
        
        return format_html(preview)
    
    seo_preview.short_description = "SEO предпросмотр"

    def hero_image_preview(self, obj):
        if obj and obj.hero_image:
            return format_html('<img src="{}" style="max-height:120px;" />', obj.hero_image.url)
        return "—"
    
    hero_image_preview.short_description = "Предпросмотр главного изображения"


## ВАЖНО: Не регистрируем модель `CustomSection` отдельно,
## чтобы она не отображалась в главном меню админки. Управление — только через inlines.

