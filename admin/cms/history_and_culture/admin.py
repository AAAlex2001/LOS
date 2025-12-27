from django.contrib import admin
from django.utils.html import format_html
from modeltranslation.admin import TranslationAdmin, TranslationTabularInline
from .models import HistoryAndCulturePage, HistorySection, CultureSection


class HistorySectionInline(TranslationTabularInline):
    model = HistorySection
    extra = 0
    fields = ['title', 'content', 'image', 'image_preview', 'order']
    readonly_fields = ['image_preview']
    ordering = ['order']

    def image_preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" style="max-height: 100px; max-width: 100px;" />',
                obj.image.url
            )
        return "Нет изображения"
    image_preview.short_description = "Превью"


class CultureSectionInline(TranslationTabularInline):
    model = CultureSection
    extra = 0
    fields = ['title', 'content', 'image', 'image_preview', 'order']
    readonly_fields = ['image_preview']
    ordering = ['order']

    def image_preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" style="max-height: 100px; max-width: 100px;" />',
                obj.image.url
            )
        return "Нет изображения"
    image_preview.short_description = "Превью"


@admin.register(HistoryAndCulturePage)
class HistoryAndCulturePageAdmin(TranslationAdmin):
    list_display = ['__str__', 'seo_title', 'created_at', 'updated_at']
    readonly_fields = ['created_at', 'updated_at']
    inlines = [HistorySectionInline, CultureSectionInline]

    def has_add_permission(self, request):
        if HistoryAndCulturePage.objects.exists():
            return False
        return super().has_add_permission(request)
    
    fieldsets = (
        ('SEO настройки', {
            'fields': ('seo_title', 'seo_description', 'seo_keywords', 'canonical_url')
        }),
        ('Open Graph', {
            'fields': ('og_title', 'og_description', 'og_image')
        }),
        ('Twitter Cards', {
            'fields': ('twitter_title', 'twitter_description', 'twitter_image')
        }),
        ('Robots', {
            'fields': ('robots_index', 'robots_follow')
        }),
        ('Системная информация', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )


# Отдельные админки для секций НЕ регистрируем - только inline редактирование
