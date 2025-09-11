from rest_framework import serializers

from .models import CitiesPage, City, CityCategory


class CitySerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    categories = serializers.SerializerMethodField()

    class Meta:
        model = City
        fields = ["id", "name", "title", "description", "image_url", "order", "categories"]

    def get_image_url(self, obj: City) -> str:
        if not obj.image:
            return ""
        return obj.image.url.replace('/media/', '')

    def get_categories(self, obj: City):
        items = obj.categories.order_by('order', 'id').all()
        return [
            {
                "id": c.id,
                "name": c.name,
                "url": c.url,
                "is_active": c.is_active,
                "order": c.order,
            }
            for c in items
        ]


class CitiesPageSerializer(serializers.ModelSerializer):
    cities = CitySerializer(many=True, read_only=True)

    class Meta:
        model = CitiesPage
        fields = [
            "id", "seo_title", "seo_description", "seo_keywords", "canonical_url",
            "og_title", "og_description", "og_image", "twitter_title",
            "twitter_description", "twitter_image", "robots_index", "robots_follow",
            "cities"
        ]
