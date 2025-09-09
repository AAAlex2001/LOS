from django.contrib import admin

from .models import CarWashesPage, CarWashCity, CarWash


class CityInline(admin.TabularInline):
    model = CarWashCity
    extra = 0
    fields = ("name", "title", "order")
    ordering = ("order", "id")


class CarWashInline(admin.TabularInline):
    model = CarWash
    extra = 0
    fields = ("city", "name", "name_link", "address", "address_link", "contacts", "working_hours", "services", "image", "order")
    ordering = ("order", "id")


@admin.register(CarWashesPage)
class CarWashesPageAdmin(admin.ModelAdmin):
    list_display = ("id", "created_at", "updated_at")
    inlines = [CityInline, CarWashInline]

    def has_add_permission(self, request):
        if CarWashesPage.objects.exists():
            return False
        return super().has_add_permission(request)
