from rest_framework import serializers

from .models import AbkhazianCuisinePage, CuisineSection, MainDish


class CuisineSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CuisineSection
        fields = ["id", "title", "text", "order"]


class MainDishSerializer(serializers.ModelSerializer):
    class Meta:
        model = MainDish
        fields = ["id", "name", "description", "order"]


class AbkhazianCuisinePageSerializer(serializers.ModelSerializer):
    sections = CuisineSectionSerializer(many=True, read_only=True)
    main_dishes = MainDishSerializer(many=True, read_only=True)
    hero_image_url = serializers.SerializerMethodField()

    class Meta:
        model = AbkhazianCuisinePage
        fields = [
            "id", "main_title", "seo_title", "seo_description", "seo_keywords", "canonical_url",
            "og_title", "og_description", "og_image", "twitter_title", 
            "twitter_description", "twitter_image", "robots_index", "robots_follow",
            "hero_image_url", "sections", "main_dishes"
        ]

    def get_hero_image_url(self, obj: AbkhazianCuisinePage) -> str:
        if not obj.hero_image:
            return ""
        # Возвращаем относительный путь, без /media/, как в History & Culture
        return obj.hero_image.url.replace('/media/', '')
