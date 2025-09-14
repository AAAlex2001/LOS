from django.contrib import admin
from .models import ImportantPage, ImportantSection, ImportantRule, ImportantImage


class ImportantRuleInline(admin.TabularInline):
    model = ImportantRule
    extra = 0
    fields = ('rule_type', 'title', 'description', 'order')
    ordering = ['order']


class ImportantImageInline(admin.TabularInline):
    model = ImportantImage
    extra = 0
    fields = ('image', 'alt_text', 'order')
    ordering = ['order']


class ImportantSectionInline(admin.StackedInline):
    model = ImportantSection
    extra = 0
    fields = ('section_type', 'title', 'content', 'order')
    ordering = ['order']
    inlines = [ImportantRuleInline, ImportantImageInline]


@admin.register(ImportantPage)
class ImportantPageAdmin(admin.ModelAdmin):
    fieldsets = (
        ('Основная информация', {
            'fields': ('title',)
        }),
        ('SEO', {
            'fields': ('meta_title', 'meta_description'),
            'classes': ('collapse',)
        }),
    )
    inlines = [ImportantSectionInline]
    list_display = ('title', 'created_at', 'updated_at')
    readonly_fields = ('created_at', 'updated_at')
    
    def has_add_permission(self, request):
        # Разрешаем только одну страницу
        return not ImportantPage.objects.exists()
