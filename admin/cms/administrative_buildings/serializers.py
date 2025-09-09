from rest_framework import serializers

from .models import AdministrativeBuildingsPage, City, AdministrativeBuilding


class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = ["id", "name", "title", "order"]


class AdministrativeBuildingSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = AdministrativeBuilding
        fields = [
            "id", "city", "name", "name_link", "working_hours", "address", "address_link",
            "contacts", "image_url", "order"
        ]

    def get_image_url(self, obj: AdministrativeBuilding) -> str:
        if not obj.image:
            return ""
        return obj.image.url.replace('/media/', '')


class AdministrativeBuildingsPageSerializer(serializers.ModelSerializer):
    cities = CitySerializer(many=True, read_only=True)
    buildings = AdministrativeBuildingSerializer(many=True, read_only=True)

    class Meta:
        model = AdministrativeBuildingsPage
        fields = [
            "id", "seo_title", "seo_description", "seo_keywords", "canonical_url",
            "og_title", "og_description", "og_image", "twitter_title",
            "twitter_description", "twitter_image", "robots_index", "robots_follow",
            "cities", "buildings"
        ]


