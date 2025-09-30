from rest_framework import serializers
from .models import GovernmentStructurePage, GovernmentBlock


class GovernmentBlockSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = GovernmentBlock
        fields = ["id", "title", "content", "order", "image_url"]

    def get_image_url(self, obj):
        return obj.image.name if obj.image else ""


class GovernmentStructurePageSerializer(serializers.ModelSerializer):
    blocks = GovernmentBlockSerializer(many=True, read_only=True)

    class Meta:
        model = GovernmentStructurePage
        fields = [
            "id",
            "seo_title", "seo_description", "seo_keywords", "canonical_url",
            "og_title", "og_description", "og_image",
            "twitter_title", "twitter_description", "twitter_image",
            "robots_index", "robots_follow",
            "blocks",
        ]






