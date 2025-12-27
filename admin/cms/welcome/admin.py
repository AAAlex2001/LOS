from django.contrib import admin
from modeltranslation.admin import TranslationAdmin, TranslationTabularInline
from .models import WelcomePage, WelcomeIcon


class WelcomeIconInline(TranslationTabularInline):
    model = WelcomeIcon
    extra = 0
    fields = ('order', 'image')
    ordering = ('order',)


@admin.register(WelcomePage)
class WelcomePageAdmin(TranslationAdmin):
    list_display = ('__str__',)
    inlines = [WelcomeIconInline]