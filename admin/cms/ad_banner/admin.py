from django.contrib import admin

from modeltranslation.admin import TranslationAdmin

from .models import AdBanner





@admin.register(AdBanner)

class AdBannerAdmin(TranslationAdmin):

    list_display = ('__str__', 'is_active', 'title', 'age_restriction', 'site', 'notes')

    list_editable = ('is_active',)

    fields = (
        'image', 'video',
        'title', 'description', 'site', 'url',
        'age_restriction', 'is_active', 'notes',
    )



