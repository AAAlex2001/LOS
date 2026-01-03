from rest_framework import serializers

from .models import HotSpringsPage, HotSpring





class HotSpringSerializer(serializers.ModelSerializer):

    image_url = serializers.SerializerMethodField()



    class Meta:

        model = HotSpring

        fields = ["id", "title", "description", "order", "image_url", "location_link"]



    def get_image_url(self, obj):

        return obj.image.name if obj.image else ""





class HotSpringsPageSerializer(serializers.ModelSerializer):

    springs = HotSpringSerializer(many=True, read_only=True)

    hero_background_url = serializers.SerializerMethodField()



    class Meta:

        model = HotSpringsPage

        fields = [

            "id",

            "seo_title", "seo_description", "seo_keywords", "canonical_url",

            "og_title", "og_description", "og_image",

            "twitter_title", "twitter_description", "twitter_image",

            "robots_index", "robots_follow",

            "hero_text", "hero_background_url",

            "springs",

        ]



    def get_hero_background_url(self, obj):

        try:

            return obj.hero_background.url if obj.hero_background else ""

        except Exception:

            return ""





