from django.contrib import admin

from .models import CulturalAttractionsPage, CulturalAttractionCity, CulturalAttraction


class CityInline(admin.TabularInline):
    model = CulturalAttractionCity
    extra = 0
    fields = ("name", "title", "order")
    ordering = ("order", "id")


class CulturalAttractionInline(admin.TabularInline):
    model = CulturalAttraction
    extra = 0
    fields = ("city", "name", "name_link", "description", "address", "address_link", "working_hours", "contacts", "image", "order")
    ordering = ("order", "id")


@admin.register(CulturalAttractionsPage)
class CulturalAttractionsPageAdmin(admin.ModelAdmin):
    list_display = ("id", "created_at", "updated_at")
    inlines = [CityInline, CulturalAttractionInline]

    def has_add_permission(self, request):
        if CulturalAttractionsPage.objects.exists():
            return False
        return super().has_add_permission(request)
