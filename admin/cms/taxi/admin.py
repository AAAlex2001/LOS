from django.contrib import admin
from modeltranslation.admin import TranslationAdmin, TranslationTabularInline

from .models import TaxiPage, TaxiService


class TaxiServiceInline(TranslationTabularInline):
    model = TaxiService
    extra = 0
    fields = ("name", "working_hours", "phones_raw", "site", "image", "order")
    ordering = ("order", "id")


@admin.register(TaxiPage)
class TaxiPageAdmin(TranslationAdmin):
    list_display = ("id", "main_title", "created_at", "updated_at")
    inlines = [TaxiServiceInline]

    def has_add_permission(self, request):
        # Разрешаем только одну страницу такси
        if TaxiPage.objects.exists():
            return False
        return super().has_add_permission(request)


