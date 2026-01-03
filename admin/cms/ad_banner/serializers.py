from rest_framework import serializers

from .models import AdBanner





class AdBannerSerializer(serializers.ModelSerializer):

    class Meta:

        model = AdBanner

        fields = ('image', 'title', 'description', 'site', 'url', 'is_active')



