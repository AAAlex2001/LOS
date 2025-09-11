from django.contrib import admin
from django.utils.html import format_html

from .models import CitiesPage, City, CityCategory


class CityInline(admin.TabularInline):
    model = City
    extra = 1
    fields = ("name", "title", "description", "image", "order")
    readonly_fields = ("preview",)

    def preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" style="max-height: 100px; max-width: 100px;" />',
                obj.image.url
            )
        return "Нет изображения"
    preview.short_description = "Превью"

    def get_parent_object(self, request):
        """Получить родительский объект для фильтрации"""
        if hasattr(request, '_obj_'):
            return request._obj_
        return None

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        """Фильтровать города по текущей странице"""
        if db_field.name == "page":
            parent_obj = self.get_parent_object(request)
            if parent_obj:
                kwargs["queryset"] = CitiesPage.objects.filter(id=parent_obj.id)
        return super().formfield_for_foreignkey(db_field, request, **kwargs)


@admin.register(CitiesPage)
class CitiesPageAdmin(admin.ModelAdmin):
    list_display = ["__str__", "seo_title", "robots_index", "robots_follow"]
    readonly_fields = ["created_at", "updated_at"]
    
    fieldsets = (
        ("SEO", {
            "fields": ("seo_title", "seo_description", "seo_keywords", "canonical_url")
        }),
        ("Open Graph", {
            "fields": ("og_title", "og_description", "og_image")
        }),
        ("Twitter", {
            "fields": ("twitter_title", "twitter_description", "twitter_image")
        }),
        ("Robots", {
            "fields": ("robots_index", "robots_follow")
        }),
        ("Системная информация", {
            "fields": ("created_at", "updated_at"),
            "classes": ("collapse",)
        })
    )
    
    inlines = [CityInline]
    
    def has_add_permission(self, request):
        """Разрешить создание только одной страницы городов"""
        return not CitiesPage.objects.exists()


@admin.register(City)
class CityAdmin(admin.ModelAdmin):
    list_display = ["name", "title", "order", "preview"]
    list_filter = ["page"]
    search_fields = ["name", "title"]
    readonly_fields = ["preview", "created_at", "updated_at"]
    
    fieldsets = (
        ("Основная информация", {
            "fields": ("page", "name", "title", "description", "image", "order")
        }),
        ("Превью", {
            "fields": ("preview",)
        }),
        ("Системная информация", {
            "fields": ("created_at", "updated_at"),
            "classes": ("collapse",)
        })
    )
    
    def preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" style="max-height: 200px; max-width: 200px;" />',
                obj.image.url
            )
        return "Нет изображения"
    preview.short_description = "Превью"


class CityCategoryInline(admin.TabularInline):
    model = CityCategory
    extra = 5
    fields = ("name", "url", "is_active", "order")


@admin.register(CityCategory)
class CityCategoryAdmin(admin.ModelAdmin):
    list_display = ("city", "name", "is_active", "order")
    list_filter = ("city", "is_active")
    search_fields = ("name", "url")


# Attach categories inline to City admin
CityAdmin.inlines = [CityCategoryInline]
