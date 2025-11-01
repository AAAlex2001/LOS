from django.contrib import admin
from django.utils.html import format_html

from .models import MusicPage, MusicTrack


class MusicTrackInline(admin.TabularInline):
    model = MusicTrack
    extra = 1
    fields = ("title", "artist", "audio_file", "is_active", "order")

    def get_readonly_fields(self, request, obj=None):
        return ["audio_file_preview"] if obj else []


@admin.register(MusicPage)
class MusicPageAdmin(admin.ModelAdmin):
    list_display = ("id", "updated_at")
    inlines = [MusicTrackInline]
    readonly_fields = ("seo_preview", "og_image_preview", "twitter_image_preview")

    def has_add_permission(self, request):
        if MusicPage.objects.exists():
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
            "fields": ("og_title", "og_description", "og_image", "og_image_preview")
        }),
        ("Twitter Cards", {
            "fields": ("twitter_title", "twitter_description", "twitter_image", "twitter_image_preview")
        }),
    )

    def seo_preview(self, obj):
        if not obj.seo_title and not obj.seo_description:
            return "SEO не настроено"
        preview = f"<strong>{obj.seo_title or 'Без заголовка'}</strong><br>"
        preview += f"{obj.seo_description or 'Без описания'}"
        return format_html(preview)
    seo_preview.short_description = "SEO предпросмотр"

    def og_image_preview(self, obj):
        if obj.og_image:
            return format_html('<img src="{}" style="height:60px;" />', obj.og_image.url)
        return "—"
    og_image_preview.short_description = "Превью OG"

    def twitter_image_preview(self, obj):
        if obj.twitter_image:
            return format_html('<img src="{}" style="height:60px;" />', obj.twitter_image.url)
        return "—"
    twitter_image_preview.short_description = "Превью Twitter"

