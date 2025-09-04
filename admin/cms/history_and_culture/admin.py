from django.contrib import admin
from .models import HistoryAndCulturePage, HistorySection, CultureSection


class HistorySectionInline(admin.TabularInline):
    model = HistorySection
    extra = 0
    fields = ['title', 'content', 'image', 'order']
    ordering = ['order']


class CultureSectionInline(admin.TabularInline):
    model = CultureSection
    extra = 0
    fields = ['title', 'content', 'image', 'order']
    ordering = ['order']


@admin.register(HistoryAndCulturePage)
class HistoryAndCulturePageAdmin(admin.ModelAdmin):
    list_display = ['__str__', 'seo_title', 'created_at', 'updated_at']
    readonly_fields = ['created_at', 'updated_at']
    inlines = [HistorySectionInline, CultureSectionInline]
    
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
