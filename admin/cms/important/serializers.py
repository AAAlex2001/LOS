from rest_framework import serializers
from .models import ImportantPage, ImportantSection, ImportantRule, ImportantImage


class ImportantImageSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = ImportantImage
        fields = ['id', 'image_url', 'alt_text', 'order']
    
    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None


class ImportantRuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImportantRule
        fields = ['id', 'rule_type', 'title', 'description', 'order']


class ImportantSectionSerializer(serializers.ModelSerializer):
    rules = ImportantRuleSerializer(many=True, read_only=True)
    images = ImportantImageSerializer(many=True, read_only=True)
    
    class Meta:
        model = ImportantSection
        fields = ['id', 'section_type', 'title', 'content', 'order', 'rules', 'images']


class ImportantPageSerializer(serializers.ModelSerializer):
    sections = ImportantSectionSerializer(many=True, read_only=True)
    
    class Meta:
        model = ImportantPage
        fields = ['id', 'title', 'meta_title', 'meta_description', 'sections']
