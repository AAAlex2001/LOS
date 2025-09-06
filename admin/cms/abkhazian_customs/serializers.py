from rest_framework import serializers

from .models import AbkhazianCustomsPage, CustomSection


class CustomSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomSection
        fields = ["id", "title", "text", "order"]


class AbkhazianCustomsPageSerializer(serializers.ModelSerializer):
    sections = CustomSectionSerializer(many=True, read_only=True)
    hero_image_url = serializers.SerializerMethodField()

    class Meta:
        model = AbkhazianCustomsPage
        fields = [
            "id", "main_title", "intro_text", "seo_title", "seo_description", "seo_keywords", "canonical_url",
            "og_title", "og_description", "og_image", "twitter_title", 
            "twitter_description", "twitter_image", "robots_index", "robots_follow",
            "hero_image_url", "sections"
        ]

    def get_hero_image_url(self, obj: AbkhazianCustomsPage) -> str:
        if not obj.hero_image:
            return ""
        # Возвращаем относительный путь, без /media/, как в других модулях
        return obj.hero_image.url.replace('/media/', '')
