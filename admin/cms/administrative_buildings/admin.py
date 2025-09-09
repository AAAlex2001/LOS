from django.contrib import admin

from .models import AdministrativeBuildingsPage, City, AdministrativeBuilding


class CityInline(admin.TabularInline):
    model = City
    extra = 0
    fields = ("name", "title", "order")
    ordering = ("order", "id")


class AdministrativeBuildingInline(admin.TabularInline):
    model = AdministrativeBuilding
    extra = 0
    fields = ("city", "name", "name_link", "working_hours", "address", "address_link", "contacts", "image", "order")
    ordering = ("order", "id")


@admin.register(AdministrativeBuildingsPage)
class AdministrativeBuildingsPageAdmin(admin.ModelAdmin):
    list_display = ("id", "created_at", "updated_at")
    inlines = [CityInline, AdministrativeBuildingInline]

    def has_add_permission(self, request):
        if AdministrativeBuildingsPage.objects.exists():
            return False
        return super().has_add_permission(request)


