from django.contrib import admin
from .models import AdBanner


@admin.register(AdBanner)
class AdBannerAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'is_active', 'title', 'site', 'notes')
    list_editable = ('is_active',)
    fields = ('image', 'title', 'description', 'site', 'url', 'is_active', 'notes')

