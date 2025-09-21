from rest_framework import serializers
from .models import PartiesPage, PartyCity, PartyEvent


class PartyEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = PartyEvent
        fields = [
            'id', 'title', 'date_info', 'location', 'description', 'event_url', 'order'
        ]


class PartyCitySerializer(serializers.ModelSerializer):
    events = PartyEventSerializer(many=True, read_only=True)

    class Meta:
        model = PartyCity
        fields = [
            'id', 'name', 'slug', 'city_image', 'events', 'order'
        ]


class PartiesPageSerializer(serializers.ModelSerializer):
    cities = PartyCitySerializer(many=True, read_only=True)

    class Meta:
        model = PartiesPage
        fields = [
            'id', 'main_title',
            'background_image', 'center_icon',
            'decor_image_1', 'decor_image_2', 'decor_image_3', 'decor_image_4', 'decor_image_5',
            'intro_text',
            'cities',
            'seo_title', 'seo_description', 'seo_keywords', 'canonical_url',
            'og_title', 'og_description', 'og_image',
            'twitter_title', 'twitter_description', 'twitter_image',
            'robots_index', 'robots_follow', 'created_at', 'updated_at'
        ]
