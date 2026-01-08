from rest_framework import serializers

from .models import AdBanner



class AdBannerSerializer(serializers.ModelSerializer):
    title = serializers.CharField(read_only=True)
    description = serializers.CharField(read_only=True)
    site = serializers.CharField(read_only=True)

    class Meta:

        model = AdBanner

        fields = ('image', 'title', 'description', 'site', 'url', 'is_active')



