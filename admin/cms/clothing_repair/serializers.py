from rest_framework import serializers

from .models import ClothingRepairPage, ClothingRepairCity, ClothingRepair


class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = ClothingRepairCity
        fields = ["id", "name", "title", "order"]


class ClothingRepairSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = ClothingRepair
        fields = [
            "id", "city", "name", "name_link", "address", "address_link",
            "working_hours", "contacts", "description", "services", "image_url", "order"
        ]

    def get_image_url(self, obj: ClothingRepair) -> str:
        if not obj.image:
            return ""
        return obj.image.url.replace('/media/', '')


class ClothingRepairPageSerializer(serializers.ModelSerializer):
    cities = CitySerializer(many=True, read_only=True)
    repairs = ClothingRepairSerializer(many=True, read_only=True)

    class Meta:
        model = ClothingRepairPage
        fields = [
            "id", "seo_title", "seo_description", "seo_keywords", "canonical_url",
            "og_title", "og_description", "og_image", "twitter_title",
            "twitter_description", "twitter_image", "robots_index", "robots_follow",
            "cities", "repairs"
        ]
