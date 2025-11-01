from rest_framework import serializers

from .models import (
    HomePage,
    HomeSliderItem,
    HomeCity,
    HomeActivity,
    HomeActionButton,
    HomePopupItem,
    HomeTab,
    MobileHomeTab,
    AboutAbkhaziaCategory,
    EntertainmentCategory,
    PlanTripCategory,
    ImportantTripCategory,
)


class HomeSliderItemSerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField()
    mobile_video_url = serializers.SerializerMethodField()

    class Meta:
        model = HomeSliderItem
        fields = ["id", "media_type", "url", "mobile_video_url", "alt", "order"]

    def get_url(self, obj: HomeSliderItem) -> str:
        file_field = obj.image if obj.media_type == HomeSliderItem.MediaType.IMAGE else obj.video
        if not file_field:
            return ""
        return file_field.url.replace('/media/', '')
    
    def get_mobile_video_url(self, obj: HomeSliderItem) -> str:
        if not obj.mobile_video:
            return ""
        return obj.mobile_video.url.replace('/media/', '')


class HomeCitySerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = HomeCity
        fields = ["id", "title", "description", "image_url", "order"]

    def get_image_url(self, obj: HomeCity) -> str:
        return obj.image.url.replace('/media/', '') if obj.image else ""


class HomeActivitySerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = HomeActivity
        fields = ["id", "title", "href", "image_url", "order"]

    def get_image_url(self, obj: HomeActivity) -> str:
        return obj.image.url.replace('/media/', '') if obj.image else ""


class HomeActionButtonSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomeActionButton
        fields = ["id", "label", "href", "order"]


class HomePopupItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomePopupItem
        fields = ["id", "group", "label", "href", "order"]


class HomeTabSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomeTab
        fields = ["id", "group", "label", "href", "order"]


class MobileHomeTabSerializer(serializers.ModelSerializer):
    class Meta:
        model = MobileHomeTab
        fields = ["id", "group", "label", "order"]


class AboutAbkhaziaCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutAbkhaziaCategory
        fields = ["id", "title", "slug", "is_active", "order"]


class EntertainmentCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = EntertainmentCategory
        fields = ["id", "title", "slug", "is_active", "order"]


class PlanTripCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = PlanTripCategory
        fields = ["id", "title", "slug", "is_active", "order"]


class ImportantTripCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ImportantTripCategory
        fields = ["id", "title", "slug", "is_active", "order"]


class HomePageSerializer(serializers.ModelSerializer):
    slider_items = HomeSliderItemSerializer(many=True, read_only=True)
    cities = HomeCitySerializer(many=True, read_only=True)
    activities = HomeActivitySerializer(many=True, read_only=True)
    action_buttons = HomeActionButtonSerializer(many=True, read_only=True)
    popup_items = HomePopupItemSerializer(many=True, read_only=True)
    tabs = HomeTabSerializer(many=True, read_only=True)
    mobile_tabs = MobileHomeTabSerializer(many=True, read_only=True)
    about_categories = AboutAbkhaziaCategorySerializer(many=True, read_only=True)
    entertainment_categories = EntertainmentCategorySerializer(many=True, read_only=True)
    plan_trip_categories = PlanTripCategorySerializer(many=True, read_only=True)
    important_trip_categories = ImportantTripCategorySerializer(many=True, read_only=True)

    cta_card_image_url = serializers.SerializerMethodField()
    hero_bg_image_url = serializers.SerializerMethodField()
    cta_bg_image_url = serializers.SerializerMethodField()
    cta_overlay_image_url = serializers.SerializerMethodField()
    activities_bg_image_url = serializers.SerializerMethodField()
    og_image_url = serializers.SerializerMethodField()
    twitter_image_url = serializers.SerializerMethodField()

    class Meta:
        model = HomePage
        fields = [
            "id",
            "hero_text_primary",
            "hero_text_secondary",
            "hero_bg_image_url",
            "cities_section_title",
            "activities_section_title",
            "actions_section_title",
            "cta_title",
            "cta_hero_text",
            "cta_bg_image_url",
            "cta_overlay_image_url",
            "cta_card_image_url",
            "cta_card_title",
            "cta_card_description",
            "cta_button_label",
            "cta_button_href",
            "activities_bg_image_url",
            "seo_title",
            "seo_description",
            "seo_keywords",
            "canonical_url",
            "og_title",
            "og_description",
            "og_image_url",
            "twitter_title",
            "twitter_description",
            "twitter_image_url",
            "robots_index",
            "robots_follow",
            "slider_items",
            "cities",
            "activities",
            "action_buttons",
            "popup_items",
            "tabs",
            "mobile_tabs",
            "about_categories",
            "entertainment_categories",
            "plan_trip_categories",
            "important_trip_categories",
            "updated_at",
        ]

    def get_cta_card_image_url(self, obj: HomePage) -> str:
        return obj.cta_card_image.url.replace('/media/', '') if obj.cta_card_image else ""

    def get_hero_bg_image_url(self, obj: HomePage) -> str:
        return obj.hero_bg_image.url.replace('/media/', '') if obj.hero_bg_image else ""

    def get_cta_bg_image_url(self, obj: HomePage) -> str:
        return obj.cta_bg_image.url.replace('/media/', '') if obj.cta_bg_image else ""

    def get_cta_overlay_image_url(self, obj: HomePage) -> str:
        return obj.cta_overlay_image.url.replace('/media/', '') if obj.cta_overlay_image else ""

    def get_activities_bg_image_url(self, obj: HomePage) -> str:
        return obj.activities_bg_image.url.replace('/media/', '') if obj.activities_bg_image else ""

    def get_og_image_url(self, obj: HomePage) -> str:
        return obj.og_image.url.replace('/media/', '') if obj.og_image else ""

    def get_twitter_image_url(self, obj: HomePage) -> str:
        return obj.twitter_image.url.replace('/media/', '') if obj.twitter_image else ""


