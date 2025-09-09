from django.contrib import admin

from .models import ShopsAndMarketsPage, ShopCity, ShopOrMarket


@admin.register(ShopsAndMarketsPage)
class ShopsAndMarketsPageAdmin(admin.ModelAdmin):
    list_display = ("id", "seo_title", "updated_at")
    search_fields = ("seo_title",)
    list_filter = ("updated_at",)


@admin.register(ShopCity)
class ShopCityAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "title", "order", "updated_at")
    list_editable = ("order",)
    search_fields = ("name", "title")
    list_filter = ("updated_at",)


@admin.register(ShopOrMarket)
class ShopOrMarketAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "city", "order", "updated_at")
    list_editable = ("order",)
    search_fields = ("name", "address", "contacts")
    list_filter = ("city", "updated_at")

