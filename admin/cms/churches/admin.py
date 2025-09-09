from django.contrib import admin

from .models import ChurchesPage, ChurchCity, Church


class CityInline(admin.TabularInline):
    model = ChurchCity
    extra = 0
    fields = ("name", "title", "order")
    ordering = ("order", "id")


class ChurchInline(admin.TabularInline):
    model = Church
    extra = 0
    fields = ("city", "name", "name_link", "address", "address_link", "working_hours", "description", "services", "image", "order")
    ordering = ("order", "id")


@admin.register(ChurchesPage)
class ChurchesPageAdmin(admin.ModelAdmin):
    list_display = ("id", "created_at", "updated_at")
    inlines = [CityInline, ChurchInline]

    def has_add_permission(self, request):
        if ChurchesPage.objects.exists():
            return False
        return super().has_add_permission(request)
