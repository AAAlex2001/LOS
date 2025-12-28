from django.contrib import admin
from django.utils.html import format_html
from modeltranslation.admin import TranslationAdmin, TranslationTabularInline
from .models import ImportantPage, ImportantSection, ImportantRule, ImportantImage


class ImportantTaxiRuleInline(TranslationTabularInline):
    model = ImportantRule
    extra = 0
    fields = ('section', 'rule_type', 'title', 'description', 'order')
    ordering = ['order']
    
    def get_queryset(self, request):
        return super().get_queryset(request).filter(section__section_type='taxi-etiquette')


class ImportantPublicBehaviorRuleInline(TranslationTabularInline):
    model = ImportantRule
    extra = 0
    fields = ('section', 'title', 'description', 'order')
    ordering = ['order']
    
    def get_queryset(self, request):
        return super().get_queryset(request).filter(section__section_type='public-behavior')


class ImportantImageInline(TranslationTabularInline):
    model = ImportantImage
    extra = 0
    fields = ('section', 'image', 'image_preview', 'title', 'description', 'alt_text', 'order')
    readonly_fields = ('image_preview',)
    ordering = ['order']

    def image_preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" style="max-height: 100px; max-width: 100px;" />',
                obj.image.url
            )
        return "Нет изображения"
    image_preview.short_description = "Превью"


class ImportantTouristPharmacySectionInline(TranslationTabularInline):
    model = ImportantSection
    extra = 0
    fields = ('section_type', 'title', 'content', 'order')
    ordering = ['order']
    
    def get_queryset(self, request):
        return super().get_queryset(request).filter(section_type='tourist-pharmacy')


class ImportantEmergencyPhonesSectionInline(TranslationTabularInline):
    model = ImportantSection
    extra = 0
    fields = ('section_type', 'title', 'subtitle', 'content', 'order')
    ordering = ['order']
    
    def get_queryset(self, request):
        return super().get_queryset(request).filter(section_type='emergency-phones')


class ImportantPublicBehaviorSectionInline(TranslationTabularInline):
    model = ImportantSection
    extra = 0
    fields = ('section_type', 'title', 'image', 'image_preview', 'order')
    readonly_fields = ('image_preview',)
    ordering = ['order']
    
    def get_queryset(self, request):
        return super().get_queryset(request).filter(section_type='public-behavior')
    
    def image_preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" style="max-height: 100px; max-width: 100px;" />',
                obj.image.url
            )
        return "Нет изображения"
    image_preview.short_description = "Превью"


class ImportantTaxiEtiquetteSectionInline(TranslationTabularInline):
    model = ImportantSection
    extra = 0
    fields = (
        'section_type', 'title',
        'passenger_intro_text', 'passenger_background_image', 'passenger_background_preview', 'passenger_conclusion_text',
        'driver_intro_text', 'driver_background_image', 'driver_background_preview', 'driver_description_text', 'driver_conclusion_text',
        'order'
    )
    readonly_fields = ('passenger_background_preview', 'driver_background_preview')
    ordering = ['order']
    
    def get_queryset(self, request):
        return super().get_queryset(request).filter(section_type='taxi-etiquette')
    
    def passenger_background_preview(self, obj):
        if obj.passenger_background_image:
            return format_html(
                '<img src="{}" style="max-height: 100px; max-width: 100px;" />',
                obj.passenger_background_image.url
            )
        return "Нет изображения"
    passenger_background_preview.short_description = "Превью фона пассажиров"
    
    def driver_background_preview(self, obj):
        if obj.driver_background_image:
            return format_html(
                '<img src="{}" style="max-height: 100px; max-width: 100px;" />',
                obj.driver_background_image.url
            )
        return "Нет изображения"
    driver_background_preview.short_description = "Превью фона водителей"


@admin.register(ImportantPage)
class ImportantPageAdmin(TranslationAdmin):
    fieldsets = (
        ('Основная информация', {
            'fields': ('title',)
        }),
        ('SEO', {
            'fields': (
                'seo_title', 'seo_description', 'seo_keywords', 'canonical_url',
                'robots_index', 'robots_follow', 'seo_preview'
            ),
            'classes': ('collapse',)
        }),
        ('Open Graph', {
            'fields': ('og_title', 'og_description', 'og_image'),
            'classes': ('collapse',)
        }),
        ('Twitter Cards', {
            'fields': ('twitter_title', 'twitter_description', 'twitter_image'),
            'classes': ('collapse',)
        }),
    )
    inlines = [
        ImportantTouristPharmacySectionInline,
        ImportantEmergencyPhonesSectionInline, 
        ImportantPublicBehaviorSectionInline,
        ImportantTaxiEtiquetteSectionInline,
        ImportantTaxiRuleInline,
        ImportantPublicBehaviorRuleInline
    ]
    list_display = ('title', 'created_at', 'updated_at')
    readonly_fields = ('created_at', 'updated_at', 'seo_preview')
    
    def has_add_permission(self, request):
        # Разрешаем только одну страницу
        return not ImportantPage.objects.exists()
    
    def seo_preview(self, obj):
        if not obj.seo_title and not obj.seo_description:
            return "SEO не настроено"
        
        preview = f"<strong>{obj.seo_title or 'Без заголовка'}</strong><br>"
        preview += f"{obj.seo_description or 'Без описания'}"
        
        return format_html(preview)
    
    seo_preview.short_description = "SEO предпросмотр"