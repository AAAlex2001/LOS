from django.contrib import admin

from django.utils.html import format_html

from modeltranslation.admin import TranslationAdmin, TranslationTabularInline



from .models import City, CityCategory





"""Убираем отдельные пункты админки для CitiesPage и CityCategory.
Оставляем только City, а категории подключаем инлайном к City.
"""





@admin.register(City)

class CityAdmin(TranslationAdmin):

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





class CityCategoryInline(TranslationTabularInline):

    model = CityCategory

    extra = 5

    fields = ("name", "url", "is_active", "order")



                                        

CityAdmin.inlines = [CityCategoryInline]

