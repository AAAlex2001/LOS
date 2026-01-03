from rest_framework import serializers
from .models import ImportantPage, ImportantSection, ImportantRule, ImportantImage


class ImportantImageSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = ImportantImage
        fields = ['id', 'image_url', 'title', 'description', 'alt_text', 'order']
    
    def get_image_url(self, obj):
        if obj.image:
            return obj.image.url.replace('/media/', '')
        return ""


class ImportantRuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImportantRule
        fields = ['id', 'rule_type', 'title', 'description', 'order']


class ImportantSectionSerializer(serializers.ModelSerializer):
    rules = ImportantRuleSerializer(many=True, read_only=True)
    images = ImportantImageSerializer(many=True, read_only=True)
    image_url = serializers.SerializerMethodField()
    passenger_background_url = serializers.SerializerMethodField()
    driver_background_url = serializers.SerializerMethodField()
    
    class Meta:
        model = ImportantSection
        fields = [
            'id', 'section_type', 'title', 'subtitle', 'content', 'image_url', 'order', 'rules', 'images',
            'passenger_intro_text', 'passenger_background_url', 'passenger_conclusion_text',
            'driver_intro_text', 'driver_background_url', 'driver_description_text', 'driver_conclusion_text'
        ]
    
    def get_image_url(self, obj):
        if obj.image:
            return obj.image.url.replace('/media/', '')
        return ""
    
    def get_passenger_background_url(self, obj):
        if obj.passenger_background_image:
            return obj.passenger_background_image.url.replace('/media/', '')
        return ""
    
    def get_driver_background_url(self, obj):
        if obj.driver_background_image:
            return obj.driver_background_image.url.replace('/media/', '')
        return ""


class ImportantPageSerializer(serializers.ModelSerializer):
    sections = ImportantSectionSerializer(many=True, read_only=True)
    title = serializers.SerializerMethodField()
    
    class Meta:
        model = ImportantPage
        fields = [
            'id', 'title', 
            'seo_title', 'seo_description', 'seo_keywords', 'canonical_url',
            'robots_index', 'robots_follow',
            'og_title', 'og_description', 'og_image',
            'twitter_title', 'twitter_description', 'twitter_image',
            'sections'
        ]

    def get_title(self, obj):
        request = self.context.get('request')
        lang = None
        if request is not None:
            lang = getattr(request, 'LANGUAGE_CODE', None) or request.GET.get('lang')
        if lang and lang.startswith('en'):
            return getattr(obj, 'title_en', None) or getattr(obj, 'title', '')
        # default to Russian
        return getattr(obj, 'title_ru', None) or getattr(obj, 'title', '')