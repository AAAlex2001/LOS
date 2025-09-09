from rest_framework import serializers

from .models import BeautySalonsPage, BeautySalonCity, BeautySalon


class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = BeautySalonCity
        fields = ["id", "name", "title", "order"]


class BeautySalonSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = BeautySalon
        fields = [
            "id", "city", "name", "name_link", "address", "address_link",
            "phone", "working_hours", "services", "image_url", "order"
        ]

    def get_image_url(self, obj: BeautySalon) -> str:
        if not obj.image:
            return ""
        return obj.image.url.replace('/media/', '')


class BeautySalonsPageSerializer(serializers.ModelSerializer):
    cities = CitySerializer(many=True, read_only=True)
    beauty_salons = BeautySalonSerializer(many=True, read_only=True)

    class Meta:
        model = BeautySalonsPage
        fields = [
            "id", "seo_title", "seo_description", "seo_keywords", "canonical_url",
            "og_title", "og_description", "og_image", "twitter_title",
            "twitter_description", "twitter_image", "robots_index", "robots_follow",
            "cities", "beauty_salons"
        ]
