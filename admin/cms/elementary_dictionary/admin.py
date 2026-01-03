from django.contrib import admin

from modeltranslation.admin import TranslationAdmin, TranslationTabularInline

from .models import ElementaryDictionaryPage, DictionaryCategory, DictionaryWord





class DictionaryCategoryInline(TranslationTabularInline):

    """
    Инлайн для категорий словаря
    """

    model = DictionaryCategory

    extra = 1

    fields = ['title', 'split_two_columns', 'order']

    ordering = ['order']





class DictionaryWordInline(TranslationTabularInline):

    """
    Инлайн для слов/фраз в странице словаря
    """

    model = DictionaryWord

    extra = 1

    fields = ['category', 'russian', 'abkhazian', 'order']

    ordering = ['order']





@admin.register(ElementaryDictionaryPage)

class ElementaryDictionaryPageAdmin(TranslationAdmin):

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





