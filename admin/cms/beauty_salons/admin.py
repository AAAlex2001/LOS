from django.contrib import admin

from .models import BeautySalonsPage, BeautySalonCity, BeautySalon


class CityInline(admin.TabularInline):
    model = BeautySalonCity
    extra = 0
    fields = ("name", "title", "order")
    ordering = ("order", "id")


class BeautySalonInline(admin.TabularInline):
    model = BeautySalon
    extra = 0
    fields = ("city", "name", "name_link", "address", "address_link", "phone", "working_hours", "services", "image", "order")
    ordering = ("order", "id")


@admin.register(BeautySalonsPage)
class BeautySalonsPageAdmin(admin.ModelAdmin):
    list_display = ("id", "created_at", "updated_at")
    inlines = [CityInline, BeautySalonInline]

    def has_add_permission(self, request):
        if BeautySalonsPage.objects.exists():
            return False
        return super().has_add_permission(request)
