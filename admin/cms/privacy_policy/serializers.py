from rest_framework import serializers

from .models import PrivacyPolicyPage, AccessibilityAndTermsPage





class PrivacyPolicyPageSerializer(serializers.ModelSerializer):

    content = serializers.CharField()
    title = serializers.SerializerMethodField()

    

    class Meta:

        model = PrivacyPolicyPage

        fields = ['id', 'title', 'content', 'created_at', 'updated_at']

    def get_title(self, obj):
        request = self.context.get('request')
        lang = None
        if request is not None:
            lang = getattr(request, 'LANGUAGE_CODE', None) or request.GET.get('lang')
        if lang and lang.startswith('en'):
            return getattr(obj, 'title_en', None) or getattr(obj, 'title', '')
        return getattr(obj, 'title_ru', None) or getattr(obj, 'title', '')





class AccessibilityAndTermsPageSerializer(serializers.ModelSerializer):

    content = serializers.CharField()
    title = serializers.SerializerMethodField()

    

    class Meta:

        model = AccessibilityAndTermsPage

        fields = ['id', 'title', 'content', 'created_at', 'updated_at']

    def get_title(self, obj):
        request = self.context.get('request')
        lang = None
        if request is not None:
            lang = getattr(request, 'LANGUAGE_CODE', None) or request.GET.get('lang')
        if lang and lang.startswith('en'):
            return getattr(obj, 'title_en', None) or getattr(obj, 'title', '')
        return getattr(obj, 'title_ru', None) or getattr(obj, 'title', '')



