from rest_framework import serializers

from .models import AdBanner



class AdBannerSerializer(serializers.ModelSerializer):
    title = serializers.CharField(read_only=True)
    description = serializers.CharField(read_only=True)
    site = serializers.CharField(read_only=True)

    image = serializers.SerializerMethodField()
    video = serializers.SerializerMethodField()

    def get_image(self, obj):
        request = self.context.get('request')
        if obj.image:
            url = obj.image.url
            if request:
                return request.build_absolute_uri(url)
            return url
        return None

    def get_video(self, obj):
        request = self.context.get('request')
        if obj.video:
            url = obj.video.url
            if request:
                return request.build_absolute_uri(url)
            return url
        return None

    class Meta:

        model = AdBanner

        fields = ('image', 'video', 'title', 'description', 'site', 'url', 'age_restriction', 'is_active')



