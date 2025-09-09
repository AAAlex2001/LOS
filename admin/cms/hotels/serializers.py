from rest_framework import serializers

from .models import HotelsPage, HotelCity, Hotel


class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = HotelCity
        fields = ["id", "name", "title", "order"]


class HotelSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Hotel
        fields = [
            "id", "city", "name", "address", "address_link",
            "contacts", "price", "image_url", "order"
        ]

    def get_image_url(self, obj: Hotel) -> str:
        if not obj.image:
            return ""
        return obj.image.url.replace('/media/', '')


class HotelsPageSerializer(serializers.ModelSerializer):
    cities = CitySerializer(many=True, read_only=True)
    hotels = HotelSerializer(many=True, read_only=True)

    class Meta:
        model = HotelsPage
        fields = [
            "id", "seo_title", "seo_description", "seo_keywords", "canonical_url",
            "og_title", "og_description", "og_image", "twitter_title",
            "twitter_description", "twitter_image", "robots_index", "robots_follow",
            "cities", "hotels"
        ]

