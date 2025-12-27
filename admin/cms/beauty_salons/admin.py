from django.contrib import admin
from django.utils.html import format_html
from modeltranslation.admin import TranslationAdmin, TranslationTabularInline

from .models import BeautySalonsPage, BeautySalonCity, BeautySalon


class BeautySalonInline(TranslationTabularInline):
    model = BeautySalon
    extra = 1
    fields = ("city", "name", "name_link", "address", "address_link", "phone", "working_hours", "services", "image", "order", "preview")
    readonly_fields = ("preview",)

    def preview(self, obj):
        if obj and obj.image:
            return format_html('<img src="{}" style="height:60px;" />', obj.image.url)
        return "—"
    
    preview.short_description = "Предпросмотр"

    def get_parent_object(self, request):
        try:
            object_id = request.resolver_match.kwargs.get("object_id")
        except Exception:
            object_id = None
        if not object_id:
            return None
        return BeautySalonsPage.objects.filter(pk=object_id).first()

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == "city":
            page = self.get_parent_object(request)
            if page is not None:
                kwargs["queryset"] = BeautySalonCity.objects.filter(page=page)
        return super().formfield_for_foreignkey(db_field, request, **kwargs)


class BeautySalonCityInline(TranslationTabularInline):
    model = BeautySalonCity
    extra = 1
    fields = ("name", "title", "order")


@admin.register(BeautySalonsPage)
class BeautySalonsPageAdmin(TranslationAdmin):
    list_display = ("id", "updated_at")
    inlines = [BeautySalonCityInline, BeautySalonInline]
    readonly_fields = ("seo_preview",)

    def has_add_permission(self, request):
        if BeautySalonsPage.objects.exists():
            return False
        return super().has_add_permission(request)
    
    fieldsets = (
        ("SEO", {
            "fields": (
                "seo_title", "seo_description", "seo_keywords", "canonical_url",
                "robots_index", "robots_follow", "seo_preview"
            )
        }),
        ("Open Graph", {
            "fields": ("og_title", "og_description", "og_image")
        }),
        ("Twitter Cards", {
            "fields": ("twitter_title", "twitter_description", "twitter_image")
        }),
    )

    def seo_preview(self, obj):
        if not obj.seo_title and not obj.seo_description:
            return "SEO не настроено"
        
        preview = f"<strong>{obj.seo_title or 'Без заголовка'}</strong><br>"
        preview += f"{obj.seo_description or 'Без описания'}"
        
        return format_html(preview)
    
    seo_preview.short_description = "SEO предпросмотр"


## ВАЖНО: Не регистрируем модели `BeautySalonCity` и `BeautySalon` отдельно,
## чтобы они не отображались в главном меню админки. Управление — только через inlines.