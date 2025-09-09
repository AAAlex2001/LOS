from rest_framework import serializers

from .models import BeachesPage, BeachCity, Beach


class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = BeachCity
        fields = ["id", "name", "title", "order"]


class BeachSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Beach
        fields = [
            "id", "city", "name", "name_link", "address", "address_link",
            "description", "phone", "image_url", "order"
        ]

    def get_image_url(self, obj: Beach) -> str:
        if not obj.image:
            return ""
        return obj.image.url.replace('/media/', '')


class BeachesPageSerializer(serializers.ModelSerializer):
    cities = CitySerializer(many=True, read_only=True)
    beaches = BeachSerializer(many=True, read_only=True)

    class Meta:
        model = BeachesPage
        fields = [
            "id", "seo_title", "seo_description", "seo_keywords", "canonical_url",
            "og_title", "og_description", "og_image", "twitter_title",
            "twitter_description", "twitter_image", "robots_index", "robots_follow",
            "cities", "beaches"
        ]


