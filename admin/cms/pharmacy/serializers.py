from rest_framework import serializers

from .models import PharmacyPage, PharmacyCity, PharmacyItem


class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = PharmacyCity
        fields = ["id", "name", "title", "order"]


class PharmacySerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = PharmacyItem
        fields = [
            "id", "city", "name", "name_link", "working_hours", "address", "address_link",
            "contacts", "image_url", "order"
        ]

    def get_image_url(self, obj: PharmacyItem) -> str:
        if not obj.image:
            return ""
        return obj.image.url.replace('/media/', '')


class PharmacyPageSerializer(serializers.ModelSerializer):
    cities = CitySerializer(many=True, read_only=True)
    pharmacies = PharmacySerializer(many=True, read_only=True)

    class Meta:
        model = PharmacyPage
        fields = [
            "id", "seo_title", "seo_description", "seo_keywords", "canonical_url",
            "og_title", "og_description", "og_image", "twitter_title",
            "twitter_description", "twitter_image", "robots_index", "robots_follow",
            "cities", "pharmacies"
        ]

