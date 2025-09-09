from rest_framework import serializers

from .models import GasStationsPage, GasStationCity, GasStation


class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = GasStationCity
        fields = ["id", "name", "title", "order"]


class GasStationSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = GasStation
        fields = [
            "id", "city", "name", "name_link", "address", "address_link",
            "contacts", "image_url", "order"
        ]

    def get_image_url(self, obj: GasStation) -> str:
        if not obj.image:
            return ""
        return obj.image.url.replace('/media/', '')


class GasStationsPageSerializer(serializers.ModelSerializer):
    cities = CitySerializer(many=True, read_only=True)
    gas_stations = GasStationSerializer(many=True, read_only=True)

    class Meta:
        model = GasStationsPage
        fields = [
            "id", "seo_title", "seo_description", "seo_keywords", "canonical_url",
            "og_title", "og_description", "og_image", "twitter_title",
            "twitter_description", "twitter_image", "robots_index", "robots_follow",
            "cities", "gas_stations"
        ]

