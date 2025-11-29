from rest_framework import serializers
from .models import TransportCommunicationsPage, TransportBlock


class TransportBlockSerializer(serializers.ModelSerializer):
    class Meta:
        model = TransportBlock
        fields = [
            'id', 'title', 'location_link', 'image_1', 'image_2', 'order'
        ]


class TransportCommunicationsPageSerializer(serializers.ModelSerializer):
    transport_blocks = TransportBlockSerializer(many=True, read_only=True)

    class Meta:
        model = TransportCommunicationsPage
        fields = [
            'id', 'main_title', 'transport_blocks',
            'seo_title', 'seo_description', 'seo_keywords', 'canonical_url',
            'og_title', 'og_description', 'og_image',
            'twitter_title', 'twitter_description', 'twitter_image',
            'robots_index', 'robots_follow', 'created_at', 'updated_at'
        ]
