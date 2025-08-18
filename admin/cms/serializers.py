from rest_framework import serializers

from .models import (
    Page,
    ImageAsset,
    HomePage,
    HomeSliderItem,
    HomeCity,
    HomeActivity,
    HomeActionButton,
    HomePopupItem,
)


class ImageAssetSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = ImageAsset
        fields = ["id", "alt", "image_url", "order"]

    def get_image_url(self, obj: ImageAsset) -> str:
        if not obj.image:
            return ""
        return obj.image.url


class PageSerializer(serializers.ModelSerializer):
    images = ImageAssetSerializer(many=True, read_only=True)

    class Meta:
        model = Page
        fields = ["id", "slug", "title", "subtitle", "body", "images", "updated_at"]


class HomeSliderItemSerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField()

    class Meta:
        model = HomeSliderItem
        fields = ["id", "media_type", "url", "alt", "order"]

    def get_url(self, obj: HomeSliderItem) -> str:
        file_field = obj.image if obj.media_type == HomeSliderItem.MediaType.IMAGE else obj.video
        if not file_field:
            return ""
        return file_field.url


class HomeCitySerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = HomeCity
        fields = ["id", "title", "description", "image_url", "order"]

    def get_image_url(self, obj: HomeCity) -> str:
        return obj.image.url if obj.image else ""


class HomeActivitySerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = HomeActivity
        fields = ["id", "title", "href", "image_url", "order"]

    def get_image_url(self, obj: HomeActivity) -> str:
        return obj.image.url if obj.image else ""


class HomeActionButtonSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomeActionButton
        fields = ["id", "label", "href", "order"]


class HomePopupItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomePopupItem
        fields = ["id", "group", "label", "href", "order"]


class HomePageSerializer(serializers.ModelSerializer):
    slider_items = HomeSliderItemSerializer(many=True, read_only=True)
    cities = HomeCitySerializer(many=True, read_only=True)
    activities = HomeActivitySerializer(many=True, read_only=True)
    action_buttons = HomeActionButtonSerializer(many=True, read_only=True)
    popup_items = HomePopupItemSerializer(many=True, read_only=True)

    cta_card_image_url = serializers.SerializerMethodField()
    hero_bg_image_url = serializers.SerializerMethodField()
    cta_bg_image_url = serializers.SerializerMethodField()
    cta_overlay_image_url = serializers.SerializerMethodField()
    activities_bg_image_url = serializers.SerializerMethodField()

    class Meta:
        model = HomePage
        fields = [
            "id",
            "hero_text_primary",
            "hero_text_secondary",
            "hero_bg_image_url",
            "tab_about_label",
            "tab_activities_label",
            "tab_booking_label",
            "tab_essentials_label",
            "cities_section_title",
            "activities_section_title",
            "actions_section_title",
            "cta_title",
            "cta_hero_text",
            "cta_bg_image_url",
            "cta_overlay_image_url",
            "cta_card_title",
            "cta_card_description",
            "cta_button_label",
            "cta_button_href",
            "cta_card_image_url",
            # collections
            "slider_items",
            "cities",
            "activities",
            "action_buttons",
            "popup_items",
            # section bg
            "activities_bg_image_url",
        ]

    def get_cta_card_image_url(self, obj: HomePage) -> str:
        return obj.cta_card_image.url if obj.cta_card_image else ""

    def get_hero_bg_image_url(self, obj: HomePage) -> str:
        return obj.hero_bg_image.url if getattr(obj, "hero_bg_image", None) else ""

    def get_cta_bg_image_url(self, obj: HomePage) -> str:
        return obj.cta_bg_image.url if getattr(obj, "cta_bg_image", None) else ""

    def get_cta_overlay_image_url(self, obj: HomePage) -> str:
        return obj.cta_overlay_image.url if getattr(obj, "cta_overlay_image", None) else ""

    def get_activities_bg_image_url(self, obj: HomePage) -> str:
        return obj.activities_bg_image.url if getattr(obj, "activities_bg_image", None) else ""


