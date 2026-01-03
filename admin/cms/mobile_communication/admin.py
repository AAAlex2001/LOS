from django.contrib import admin

from django.utils.html import format_html

from modeltranslation.admin import TranslationAdmin, TranslationTabularInline



from .models import (

    MobileCommunicationPage,

    MobileProvider,

    InternetProvider,

)





class MobileProviderInline(TranslationTabularInline):

    model = MobileProvider

    extra = 0

    fields = ("name", "description", "website_url", "logo_image", "logo_preview", "order")

    readonly_fields = ("logo_preview",)

    ordering = ("order", "id")



    def logo_preview(self, obj):

        if obj.logo_image:

            return format_html('<img src="{}" style="max-height: 50px; max-width: 100px;" />', obj.logo_image.url)

        return "Изображение не загружено"

    logo_preview.short_description = "Превью"





class InternetProviderInline(TranslationTabularInline):

    model = InternetProvider

    extra = 0

    fields = ("name", "description", "website_url", "logo_image", "logo_preview", "order")

    readonly_fields = ("logo_preview",)

    ordering = ("order", "id")



    def logo_preview(self, obj):

        if obj.logo_image:

            return format_html('<img src="{}" style="max-height: 50px; max-width: 100px;" />', obj.logo_image.url)

        return "Изображение не загружено"

    logo_preview.short_description = "Превью"





@admin.register(MobileCommunicationPage)

class MobileCommunicationPageAdmin(TranslationAdmin):

    list_display = ("id", "main_title", "created_at", "updated_at")

    inlines = [MobileProviderInline, InternetProviderInline]

    readonly_fields = ("background_image_preview", "og_image_preview", "twitter_image_preview")

    fieldsets = (

        ("Основная информация", {

            "fields": (

                "main_title", 

                "intro_text", 

                "background_image", 

                "background_image_preview",

                "mobile_section_title",

                "internet_section_title"

            )

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



    def background_image_preview(self, obj):

        if obj.background_image:

            return format_html('<img src="{}" style="max-height: 100px; max-width: 200px;" />', obj.background_image.url)

        return "Изображение не загружено"

    background_image_preview.short_description = "Превью фонового изображения"



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

                                                          

        if MobileCommunicationPage.objects.exists():

            return False

        return super().has_add_permission(request)

















