from rest_framework import serializers
from .models import MountainRoutesPage, MountainRoute


class MountainRouteSerializer(serializers.ModelSerializer):
    class Meta:
        model = MountainRoute
        fields = [
            'id', 'title', 'name', 'image', 'site_url', 'phone', 'order'
        ]


class MountainRoutesPageSerializer(serializers.ModelSerializer):
    routes = MountainRouteSerializer(many=True, read_only=True)

    class Meta:
        model = MountainRoutesPage
        fields = [
            'id', 'main_title', 'section_title', 'routes',
            'seo_title', 'seo_description', 'seo_keywords', 'canonical_url',
            'og_title', 'og_description', 'og_image',
            'twitter_title', 'twitter_description', 'twitter_image',
            'robots_index', 'robots_follow', 'created_at', 'updated_at'
        ]


