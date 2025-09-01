from django.contrib import admin
from django.utils.html import format_html

from .models import ImageAsset

# Регистрируем базовые модели
@admin.register(ImageAsset)
class ImageAssetAdmin(admin.ModelAdmin):
    """
    Базовый админ-класс для управления изображениями
    """
    list_display = ("id", "alt", "order", "updated_at")
    list_editable = ("order",)
    search_fields = ("alt",)
    list_filter = ("updated_at",)
    readonly_fields = ("preview",)

    def preview(self, obj):
        if obj and obj.image:
            return format_html('<img src="{}" style="height:60px;" />', obj.image.url)
        return "—"
    
    preview.short_description = "Предпросмотр"

# Импортируем админ-классы из homepage модуля
from .homepage.admin import HomePageAdmin
