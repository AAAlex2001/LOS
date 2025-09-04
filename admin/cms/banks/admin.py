from django.contrib import admin
from django.utils.html import format_html

from .models import BanksPage, Bank


class BankInline(admin.TabularInline):
    model = Bank
    extra = 1
    fields = ("name", "name_link", "working_hours", "address", "contacts", "email", "image", "order", "preview")
    readonly_fields = ("preview",)

    def preview(self, obj):
        if obj and obj.image:
            return format_html('<img src="{}" style="height:60px;" />', obj.image.url)
        return "—"
    
    preview.short_description = "Предпросмотр"


@admin.register(BanksPage)
class BanksPageAdmin(admin.ModelAdmin):
    list_display = ("id", "updated_at")
    inlines = [BankInline]
    readonly_fields = ("seo_preview",)
    
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


## ВАЖНО: Не регистрируем модель `Bank` отдельно,
## чтобы она не отображалась в главном меню админки. Управление — только через inlines.
