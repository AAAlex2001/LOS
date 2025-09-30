from rest_framework import serializers
from .models import MobileCommunicationPage, MobileProvider, InternetProvider


class MobileProviderSerializer(serializers.ModelSerializer):
    class Meta:
        model = MobileProvider
        fields = ['id', 'name', 'description', 'website_url', 'logo_image', 'order']


class InternetProviderSerializer(serializers.ModelSerializer):
    class Meta:
        model = InternetProvider
        fields = ['id', 'name', 'description', 'website_url', 'logo_image', 'order']


class MobileCommunicationPageSerializer(serializers.ModelSerializer):
    mobile_providers = MobileProviderSerializer(many=True, read_only=True)
    internet_providers = InternetProviderSerializer(many=True, read_only=True)

    class Meta:
        model = MobileCommunicationPage
        fields = [
            'id',
            'main_title',
            'intro_text',
            'background_image',
            'mobile_section_title',
            'internet_section_title',
            'mobile_providers',
            'internet_providers',
            'seo_title',
            'seo_description',
            'seo_keywords',
            'canonical_url',
            'og_title',
            'og_description',
            'og_image',
            'twitter_title',
            'twitter_description',
            'twitter_image',
            'robots_index',
            'robots_follow',
            'created_at',
            'updated_at'
        ]


