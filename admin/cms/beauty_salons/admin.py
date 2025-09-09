from django.contrib import admin
from django.utils.html import format_html

from .models import BeautySalonsPage, BeautySalonCity, BeautySalon


class BeautySalonInline(admin.TabularInline):
    model = BeautySalon
    extra = 1
    fields = ("name", "name_link", "working_hours", "address", "address_link", "contacts", "services", "image", "order", "preview")
    readonly_fields = ("preview",)

    def preview(self, obj):
        if obj and obj.image:
            return format_html('<img src="{}" style="height:60px;" />', obj.image.url)
        return "—"
    
    preview.short_description = "Предпросмотр"


class BeautySalonCityInline(admin.TabularInline):
    model = BeautySalonCity
    extra = 1
    fields = ("name", "title", "order")
    inlines = [BeautySalonInline]


@admin.register(BeautySalonsPage)
class BeautySalonsPageAdmin(admin.ModelAdmin):
    list_display = ("id", "updated_at")
    inlines = [BeautySalonCityInline]
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