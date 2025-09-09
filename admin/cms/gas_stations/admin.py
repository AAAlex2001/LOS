from django.contrib import admin

from .models import GasStationsPage, GasStationCity, GasStation


@admin.register(GasStationsPage)
class GasStationsPageAdmin(admin.ModelAdmin):
    list_display = ("id", "seo_title", "updated_at")
    search_fields = ("seo_title",)
    list_filter = ("updated_at",)


@admin.register(GasStationCity)
class GasStationCityAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "title", "order", "updated_at")
    list_editable = ("order",)
    search_fields = ("name", "title")
    list_filter = ("updated_at",)


@admin.register(GasStation)
class GasStationAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "city", "order", "updated_at")
    list_editable = ("order",)
    search_fields = ("name", "address", "contacts")
    list_filter = ("city", "updated_at")

