from django.contrib import admin
from .models import WelcomePage, WelcomeIcon


class WelcomeIconInline(admin.TabularInline):
    model = WelcomeIcon
    extra = 0
    fields = ('order', 'image')
    ordering = ('order',)


@admin.register(WelcomePage)
class WelcomePageAdmin(admin.ModelAdmin):
    list_display = ('__str__',)
    inlines = [WelcomeIconInline]