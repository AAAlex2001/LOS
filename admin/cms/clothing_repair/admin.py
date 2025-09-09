from django.contrib import admin

from .models import ClothingRepairPage, ClothingRepairCity, ClothingRepair


class CityInline(admin.TabularInline):
    model = ClothingRepairCity
    extra = 0
    fields = ("name", "title", "order")
    ordering = ("order", "id")


class ClothingRepairInline(admin.TabularInline):
    model = ClothingRepair
    extra = 0
    fields = ("city", "name", "name_link", "address", "address_link", "working_hours", "contacts", "description", "services", "image", "order")
    ordering = ("order", "id")


@admin.register(ClothingRepairPage)
class ClothingRepairPageAdmin(admin.ModelAdmin):
    list_display = ("id", "created_at", "updated_at")
    inlines = [CityInline, ClothingRepairInline]

    def has_add_permission(self, request):
        if ClothingRepairPage.objects.exists():
            return False
        return super().has_add_permission(request)
