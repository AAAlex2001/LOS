from django.contrib import admin

from .models import BeachesPage, BeachCity, Beach


class CityInline(admin.TabularInline):
    model = BeachCity
    extra = 0
    fields = ("name", "title", "order")
    ordering = ("order", "id")


class BeachInline(admin.TabularInline):
    model = Beach
    extra = 0
    fields = ("city", "name", "name_link", "address", "address_link", "description", "phone", "image", "order")
    ordering = ("order", "id")


@admin.register(BeachesPage)
class BeachesPageAdmin(admin.ModelAdmin):
    list_display = ("id", "created_at", "updated_at")
    inlines = [CityInline, BeachInline]

    def has_add_permission(self, request):
        if BeachesPage.objects.exists():
            return False
        return super().has_add_permission(request)


