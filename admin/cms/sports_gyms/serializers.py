from rest_framework import serializers

from .models import SportsGymsPage, SportsGym


class SportsGymSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = SportsGym
        fields = [
            "id", "name", "name_link", "working_hours", "address", "address_link",
            "contacts", "image_url", "order"
        ]

    def get_image_url(self, obj: SportsGym) -> str:
        if not obj.image:
            return ""
        return obj.image.url.replace('/media/', '')


class SportsGymsPageSerializer(serializers.ModelSerializer):
    gyms = SportsGymSerializer(many=True, read_only=True)

    class Meta:
        model = SportsGymsPage
        fields = [
            "id", "seo_title", "seo_description", "seo_keywords", "canonical_url",
            "og_title", "og_description", "og_image", "twitter_title",
            "twitter_description", "twitter_image", "robots_index", "robots_follow",
            "gyms"
        ]


