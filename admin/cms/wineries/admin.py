from django.contrib import admin

from .models import WineriesPage, WineryCity, Winery


@admin.register(WineriesPage)
class WineriesPageAdmin(admin.ModelAdmin):
    list_display = ("id", "seo_title", "updated_at")
    search_fields = ("seo_title",)
    list_filter = ("updated_at",)


@admin.register(WineryCity)
class WineryCityAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "title", "order", "updated_at")
    list_editable = ("order",)
    search_fields = ("name", "title")
    list_filter = ("updated_at",)


@admin.register(Winery)
class WineryAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "city", "order", "updated_at")
    list_editable = ("order",)
    search_fields = ("name", "address", "contacts")
    list_filter = ("city", "updated_at")

