from rest_framework import serializers



from .models import WineriesPage, WineryCity, Winery





class CitySerializer(serializers.ModelSerializer):

    class Meta:

        model = WineryCity

        fields = ["id", "name", "title", "order"]





class WinerySerializer(serializers.ModelSerializer):

    image_url = serializers.SerializerMethodField()



    class Meta:

        model = Winery

        fields = [

            "id", "city", "name", "working_hours", "address", "address_link",

            "contacts", "image_url", "order"

        ]



    def get_image_url(self, obj: Winery) -> str:

        if not obj.image:

            return ""

        return obj.image.url.replace('/media/', '')





class WineriesPageSerializer(serializers.ModelSerializer):

    cities = CitySerializer(many=True, read_only=True)

    wineries = WinerySerializer(many=True, read_only=True)



    class Meta:

        model = WineriesPage

        fields = [

            "id", "seo_title", "seo_description", "seo_keywords", "canonical_url",

            "og_title", "og_description", "og_image", "twitter_title",

            "twitter_description", "twitter_image", "robots_index", "robots_follow",

            "cities", "wineries"

        ]



