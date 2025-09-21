from django.contrib import admin
from django.utils.html import format_html

from .models import (
    YourDoctorPage,
    Hospital,
    PrivateClinic,
    Dentistry,
    VetClinic,
    DoctorsGroup,
)


class HospitalInline(admin.TabularInline):
    model = Hospital
    extra = 0
    fields = ("name", "name_link", "working_hours", "address", "address_link", "contacts", "image", "image_preview", "order")
    readonly_fields = ("image_preview",)
    ordering = ("order", "id")

    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" style="max-height: 50px; max-width: 100px;" />', obj.image.url)
        return "Изображение не загружено"
    image_preview.short_description = "Превью"


class PrivateClinicInline(admin.TabularInline):
    model = PrivateClinic
    extra = 0
    fields = ("name", "name_link", "working_hours", "address", "address_link", "contacts", "image", "image_preview", "order")
    readonly_fields = ("image_preview",)
    ordering = ("order", "id")

    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" style="max-height: 50px; max-width: 100px;" />', obj.image.url)
        return "Изображение не загружено"
    image_preview.short_description = "Превью"


class DentistryInline(admin.TabularInline):
    model = Dentistry
    extra = 0
    fields = ("name", "name_link", "working_hours", "address", "address_link", "contacts", "image", "image_preview", "order")
    readonly_fields = ("image_preview",)
    ordering = ("order", "id")

    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" style="max-height: 50px; max-width: 100px;" />', obj.image.url)
        return "Изображение не загружено"
    image_preview.short_description = "Превью"


class VetClinicInline(admin.TabularInline):
    model = VetClinic
    extra = 0
    fields = ("name", "name_link", "working_hours", "address", "address_link", "contacts", "image", "image_preview", "order")
    readonly_fields = ("image_preview",)
    ordering = ("order", "id")

    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" style="max-height: 50px; max-width: 100px;" />', obj.image.url)
        return "Изображение не загружено"
    image_preview.short_description = "Превью"


class DoctorsGroupInline(admin.TabularInline):
    model = DoctorsGroup
    extra = 0
    fields = ("hospital_name", "doctors_raw", "order")
    ordering = ("order", "id")


@admin.register(YourDoctorPage)
class YourDoctorPageAdmin(admin.ModelAdmin):
    list_display = ("id", "main_title", "created_at", "updated_at")
    inlines = [HospitalInline, PrivateClinicInline, DentistryInline, VetClinicInline, DoctorsGroupInline]
    readonly_fields = ("logo_preview", "hospitals_hero_preview", "og_image_preview", "twitter_image_preview")
    fieldsets = (
        ("Основная информация", {
            "fields": ("main_title", "logo_image", "logo_preview", "hospitals_hero_image", "hospitals_hero_preview")
        }),
        ("SEO", {
            "fields": ("seo_title", "seo_description", "seo_keywords", "canonical_url"),
            "classes": ("collapse",)
        }),
        ("Open Graph", {
            "fields": ("og_title", "og_description", "og_image", "og_image_preview"),
            "classes": ("collapse",)
        }),
        ("Twitter Cards", {
            "fields": ("twitter_title", "twitter_description", "twitter_image", "twitter_image_preview"),
            "classes": ("collapse",)
        }),
        ("Robots", {
            "fields": ("robots_index", "robots_follow"),
            "classes": ("collapse",)
        }),
    )

    def logo_preview(self, obj):
        if obj.logo_image:
            return format_html('<img src="{}" style="max-height: 100px; max-width: 200px;" />', obj.logo_image.url)
        return "Изображение не загружено"
    logo_preview.short_description = "Превью логотипа"

    def hospitals_hero_preview(self, obj):
        if obj.hospitals_hero_image:
            return format_html('<img src="{}" style="max-height: 100px; max-width: 200px;" />', obj.hospitals_hero_image.url)
        return "Изображение не загружено"
    hospitals_hero_preview.short_description = "Превью изображения блока 'Больницы'"

    def og_image_preview(self, obj):
        if obj.og_image:
            return format_html('<img src="{}" style="max-height: 100px; max-width: 200px;" />', obj.og_image.url)
        return "Изображение не загружено"
    og_image_preview.short_description = "Превью Open Graph изображения"

    def twitter_image_preview(self, obj):
        if obj.twitter_image:
            return format_html('<img src="{}" style="max-height: 100px; max-width: 200px;" />', obj.twitter_image.url)
        return "Изображение не загружено"
    twitter_image_preview.short_description = "Превью Twitter Card изображения"

    def has_add_permission(self, request):
        # Разрешаем только одну страницу "Ваш доктор"
        if YourDoctorPage.objects.exists():
            return False
        return super().has_add_permission(request)


