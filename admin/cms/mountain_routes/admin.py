from django.contrib import admin

from django.utils.html import format_html

from modeltranslation.admin import TranslationAdmin, TranslationTabularInline



from .models import MountainRoutesPage, MountainRoute





class MountainRouteInline(TranslationTabularInline):

    model = MountainRoute

    extra = 0

    fields = ("title", "name", "image", "image_preview", "site_url", "phone", "order")

    readonly_fields = ("image_preview",)

    ordering = ("order", "id")



    def image_preview(self, obj):

        if obj.image:

            return format_html('<img src="{}" style="max-height: 60px; max-width: 120px;"/>', obj.image.url)

        return "—"

    image_preview.short_description = "Превью"





@admin.register(MountainRoutesPage)

class MountainRoutesPageAdmin(TranslationAdmin):

    list_display = ("id", "main_title", "created_at", "updated_at")

    inlines = [MountainRouteInline]

    readonly_fields = ("og_image_preview", "twitter_image_preview")

    fieldsets = (

        ("Основная информация", {

            "fields": ("main_title", "section_title"),

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



    def og_image_preview(self, obj):

        if obj.og_image:

            return format_html('<img src="{}" style="max-height: 100px; max-width: 200px;"/>', obj.og_image.url)

        return "—"

    og_image_preview.short_description = "Превью OG"



    def twitter_image_preview(self, obj):

        if obj.twitter_image:

            return format_html('<img src="{}" style="max-height: 100px; max-width: 200px;"/>', obj.twitter_image.url)

        return "—"

    twitter_image_preview.short_description = "Превью Twitter"



    def has_add_permission(self, request):

        if MountainRoutesPage.objects.exists():

            return False

        return super().has_add_permission(request)





