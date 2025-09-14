from django.contrib import admin
from .models import ElementaryDictionaryPage, DictionaryCategory, DictionaryWord


class DictionaryCategoryInline(admin.TabularInline):
    """
    Инлайн для категорий словаря
    """
    model = DictionaryCategory
    extra = 1
    fields = ['title', 'split_two_columns', 'order']
    ordering = ['order']


class DictionaryWordInline(admin.TabularInline):
    """
    Инлайн для слов/фраз в странице словаря
    """
    model = DictionaryWord
    extra = 1
    fields = ['category', 'russian', 'abkhazian', 'order']
    ordering = ['order']
    
    # Делаем поля компактнее
    def get_formset(self, request, obj=None, **kwargs):
        formset = super().get_formset(request, obj, **kwargs)
        formset.form.base_fields['russian'].widget.attrs.update({'rows': 2, 'cols': 30})
        formset.form.base_fields['abkhazian'].widget.attrs.update({'rows': 2, 'cols': 30})
        return formset


@admin.register(ElementaryDictionaryPage)
class ElementaryDictionaryPageAdmin(admin.ModelAdmin):
    """
    Админка для страницы элементарного словаря
    """
    list_display = ['id', 'seo_title', 'created_at', 'updated_at']
    list_filter = ['created_at', 'updated_at']
    search_fields = ['seo_title', 'seo_description']
    inlines = [DictionaryCategoryInline, DictionaryWordInline]
    
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
    )


