from rest_framework import serializers
from .models import PrivacyPolicyPage, AccessibilityAndTermsPage


class PrivacyPolicyPageSerializer(serializers.ModelSerializer):
    content = serializers.CharField()
    
    class Meta:
        model = PrivacyPolicyPage
        fields = ['id', 'title', 'content', 'created_at', 'updated_at']


class AccessibilityAndTermsPageSerializer(serializers.ModelSerializer):
    content = serializers.CharField()
    
    class Meta:
        model = AccessibilityAndTermsPage
        fields = ['id', 'title', 'content', 'created_at', 'updated_at']

