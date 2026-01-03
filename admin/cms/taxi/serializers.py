from rest_framework import serializers



from .models import TaxiPage, TaxiService





class TaxiServiceSerializer(serializers.ModelSerializer):

    image_url = serializers.SerializerMethodField()

    phones = serializers.SerializerMethodField()



    class Meta:

        model = TaxiService

        fields = [

            "id", "name", "working_hours", "phones", "site", "image_url", "order"

        ]



    def get_image_url(self, obj: TaxiService) -> str:

        if not obj.image:

            return ""

                                                    

        return obj.image.url.replace('/media/', '')



    def get_phones(self, obj: TaxiService) -> list[str]:

        raw = obj.phones_raw or ""

        return [line.strip() for line in raw.splitlines() if line.strip()]





class TaxiPageSerializer(serializers.ModelSerializer):

    services = TaxiServiceSerializer(many=True, read_only=True)

    hero_image_url = serializers.SerializerMethodField()



    class Meta:

        model = TaxiPage

        fields = [

            "id", "main_title", "intro_text", "seo_title", "seo_description", "seo_keywords", "canonical_url",

            "og_title", "og_description", "og_image", "twitter_title",

            "twitter_description", "twitter_image", "robots_index", "robots_follow",

            "hero_image_url", "services"

        ]



    def get_hero_image_url(self, obj: TaxiPage) -> str:

        if not getattr(obj, 'hero_image', None):

            return ""

        return obj.hero_image.url.replace('/media/', '')





