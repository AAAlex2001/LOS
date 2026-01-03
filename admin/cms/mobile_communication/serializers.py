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

    main_title = serializers.SerializerMethodField()
    mobile_section_title = serializers.SerializerMethodField()
    internet_section_title = serializers.SerializerMethodField()

    def pick(self, obj, field_base, request):
        lang = None
        if request is not None:
            lang = getattr(request, 'LANGUAGE_CODE', None) or request.GET.get('lang')
        if lang and lang.startswith('en'):
            return getattr(obj, field_base + '_en', None) or getattr(obj, field_base, '')
        return getattr(obj, field_base + '_ru', None) or getattr(obj, field_base, '')

    def get_main_title(self, obj):
        return self.pick(obj, 'main_title', self.context.get('request'))

    def get_mobile_section_title(self, obj):
        return self.pick(obj, 'mobile_section_title', self.context.get('request'))

    def get_internet_section_title(self, obj):
        return self.pick(obj, 'internet_section_title', self.context.get('request'))








