from rest_framework import serializers

from .models import Page, ImageAsset, HomePage, HomeSliderItem, HomeCity, HomeActivity, HomeActionButton, HomePopupItem


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

    class Meta:
        model = HomePage
        fields = [
            "id",
            "hero_text",
            "slider_items",
            "cities",
            "activities",
            "action_buttons",
            "popup_items",
        ]


