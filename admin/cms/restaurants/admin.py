from django.contrib import admin

from .models import RestaurantsPage, RestaurantCity, Restaurant


@admin.register(RestaurantsPage)
class RestaurantsPageAdmin(admin.ModelAdmin):
    list_display = ("id", "seo_title", "updated_at")
    search_fields = ("seo_title",)
    list_filter = ("updated_at",)


@admin.register(RestaurantCity)
class RestaurantCityAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "title", "order", "updated_at")
    list_editable = ("order",)
    search_fields = ("name", "title")
    list_filter = ("updated_at",)


@admin.register(Restaurant)
class RestaurantAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "city", "order", "updated_at")
    list_editable = ("order",)
    search_fields = ("name", "address", "phone")
    list_filter = ("city", "updated_at")

