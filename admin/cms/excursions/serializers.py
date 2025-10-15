from rest_framework import serializers
from .models import ExcursionsPage, ExcursionService


class ExcursionServiceSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = ExcursionService
        fields = ["id", "contacts", "site", "order", "image_url"]

    def get_image_url(self, obj):
        return obj.image.name if obj.image else ""


class ExcursionsPageSerializer(serializers.ModelSerializer):
    services = ExcursionServiceSerializer(many=True, read_only=True)

    class Meta:
        model = ExcursionsPage
        fields = [
            "id",
            "seo_title",
            "seo_description",
            "seo_keywords",
            "canonical_url",
            "og_title",
            "og_description",
            "og_image",
            "twitter_title",
            "twitter_description",
            "twitter_image",
            "robots_index",
            "robots_follow",
            "services",
        ]











