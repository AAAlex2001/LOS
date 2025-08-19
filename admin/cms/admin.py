from django.contrib import admin

from django.utils.html import format_html
from django.utils.safestring import mark_safe
from django import forms

from .models import (
    Page,
    ImageAsset,
    HomePage,
    HomeSliderItem,
    HomeCity,
    HomeActivity,
    HomeActionButton,
    HomePopupItem,
    HomeTab,
)


class ImageInline(admin.TabularInline):
    model = ImageAsset
    extra = 1


@admin.register(Page)
class PageAdmin(admin.ModelAdmin):
    list_display = ("id", "slug", "title", "updated_at")
    list_display_links = ("id", "slug", "title")
    search_fields = ("slug", "title", "subtitle", "body")
    list_filter = ("updated_at",)
    inlines = [ImageInline]


@admin.register(ImageAsset)
class ImageAssetAdmin(admin.ModelAdmin):
    list_display = ("id", "page", "alt", "order", "updated_at")
    list_editable = ("order",)
    search_fields = ("alt", "page__title", "page__slug")
    list_filter = ("updated_at",)


class SliderInline(admin.TabularInline):
    model = HomeSliderItem
    extra = 1
    fields = ("media_type", "image", "video", "alt", "order", "preview")
    readonly_fields = ("preview",)

    def preview(self, obj):
        if obj and obj.image:
            return format_html('<img src="{}" style="height:60px;" />', obj.image.url)
        return "—"


class CityInline(admin.TabularInline):
    model = HomeCity
    extra = 1
    fields = ("image", "title", "description", "order", "preview")
    readonly_fields = ("preview",)

    def preview(self, obj):
        if obj and obj.image:
            return format_html('<img src="{}" style="height:60px;" />', obj.image.url)
        return "—"


class ActivityInline(admin.TabularInline):
    model = HomeActivity
    extra = 1
    fields = ("image", "title", "href", "order", "preview")
    readonly_fields = ("preview",)

    def preview(self, obj):
        if obj and obj.image:
            return format_html('<img src="{}" style="height:60px;" />', obj.image.url)
        return "—"


class ActionButtonInline(admin.TabularInline):
    model = HomeActionButton
    extra = 1
    fields = ("label", "href", "order")


class PopupItemInline(admin.TabularInline):
    model = HomePopupItem
    extra = 1
    fields = ("group", "label", "href", "order")


class TabInline(admin.TabularInline):
    model = HomeTab
    extra = 1
    fields = ("group", "label", "href", "order")


@admin.register(HomePage)
class HomePageAdmin(admin.ModelAdmin):
    list_display = ("id", "updated_at")
    inlines = [TabInline, SliderInline, CityInline, ActivityInline, ActionButtonInline, PopupItemInline]
    readonly_fields = ("seo_preview",)
    fieldsets = (
        ("Геро-секции", {"fields": ("hero_text_primary", "hero_text_secondary", "hero_bg_image")}),
        # Табы управляются отдельным инлайном ниже
        ("Заголовки секций", {"fields": ("cities_section_title", "activities_section_title", "actions_section_title")}),
        ("CTA блок", {"fields": ("cta_title", "cta_hero_text", "cta_bg_image", "cta_overlay_image", "cta_card_image", "cta_card_title", "cta_card_description", "cta_button_label", "cta_button_href")}),
        ("SEO", {"fields": ("seo_title", "seo_description", "seo_keywords", "canonical_url",
                               "og_title", "og_description", "og_image",
                               "twitter_title", "twitter_description", "twitter_image",
                               "robots_index", "robots_follow", "seo_preview")}),
    )


class HomePageAdminForm(forms.ModelForm):
    class Meta:
        from .models import HomePage
        model = HomePage
        fields = "__all__"

    def clean_seo_keywords(self):
        keywords: str = self.cleaned_data.get("seo_keywords", "")
        tokens = [t.strip() for t in keywords.replace(";", ",").split(",") if t.strip()]
        # Уникальные, с сохранением порядка
        seen = set()
        uniq = []
        for t in tokens:
            if t.lower() in seen:
                continue
            seen.add(t.lower())
            uniq.append(t)
        if len(uniq) > 25:
            raise forms.ValidationError("Слишком много ключевых слов (максимум 25).")
        return ", ".join(uniq)

    def clean_canonical_url(self):
        url = self.cleaned_data.get("canonical_url", "").strip()
        if url and not (url.startswith("http://") or url.startswith("https://")):
            raise forms.ValidationError("Укажи абсолютный URL, начинающийся с http:// или https://")
        return url


HomePageAdmin.form = HomePageAdminForm


def _render_seo_preview(obj) -> str:
    if not obj:
        return ""
    og_img = obj.og_image.url if getattr(obj, "og_image", None) else ""
    tw_img = obj.twitter_image.url if getattr(obj, "twitter_image", None) else ""
    og_html = f"""
    <div style='border:1px solid #dcdcdc;border-radius:6px;padding:12px;margin-bottom:12px;max-width:520px;'>
      <div style='font-size:12px;color:#555;'>Open Graph предпросмотр</div>
      <div style='display:flex;gap:12px;align-items:flex-start'>
        {'<img src="'+og_img+'" style="width:120px;height:120px;object-fit:cover;border-radius:4px;" />' if og_img else ''}
        <div>
          <div style='font-weight:700'>{obj.og_title or obj.seo_title}</div>
          <div style='font-size:13px;color:#333'>{obj.og_description or obj.seo_description}</div>
          <div style='font-size:12px;color:#777'>{obj.canonical_url or ''}</div>
        </div>
      </div>
    </div>
    """
    tw_html = f"""
    <div style='border:1px solid #dcdcdc;border-radius:6px;padding:12px;max-width:520px;'>
      <div style='font-size:12px;color:#555;'>Twitter Card предпросмотр</div>
      {'<img src="'+tw_img+'" style="width:100%;max-width:520px;border-radius:4px;object-fit:cover;margin-bottom:8px;" />' if tw_img else ''}
      <div style='font-weight:700'>{obj.twitter_title or obj.seo_title}</div>
      <div style='font-size:13px;color:#333'>{obj.twitter_description or obj.seo_description}</div>
    </div>
    """
    return og_html + tw_html


def seo_preview(obj):  # pragma: no cover - admin helper
    return mark_safe(_render_seo_preview(obj))


HomePageAdmin.seo_preview = staticmethod(seo_preview)

# Не регистрируем HomeTab отдельно, управляем им только через инлайн на странице HomePage


## Убран отдельный раздел рекламных слайдеров; управление слайдами в HomePage


