from django.contrib import admin

from .models import ParkingLotsPage, ParkingLotCity, ParkingLot


@admin.register(ParkingLotsPage)
class ParkingLotsPageAdmin(admin.ModelAdmin):
    list_display = ("id", "seo_title", "updated_at")
    search_fields = ("seo_title",)
    list_filter = ("updated_at",)


@admin.register(ParkingLotCity)
class ParkingLotCityAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "title", "order", "updated_at")
    list_editable = ("order",)
    search_fields = ("name", "title")
    list_filter = ("updated_at",)


@admin.register(ParkingLot)
class ParkingLotAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "city", "order", "updated_at")
    list_editable = ("order",)
    search_fields = ("name", "address")
    list_filter = ("city", "updated_at")

