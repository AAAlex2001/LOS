from rest_framework import serializers



from .models import ChurchesPage, ChurchCity, Church





class CitySerializer(serializers.ModelSerializer):

    class Meta:

        model = ChurchCity

        fields = ["id", "name", "title", "order"]





class ChurchSerializer(serializers.ModelSerializer):

    image_url = serializers.SerializerMethodField()



    class Meta:

        model = Church

        fields = [

            "id", "city", "name", "name_link", "address", "address_link",

            "working_hours", "description", "services", "image_url", "order"

        ]



    def get_image_url(self, obj: Church) -> str:

        if not obj.image:

            return ""

        return obj.image.url.replace('/media/', '')





class ChurchesPageSerializer(serializers.ModelSerializer):

    cities = CitySerializer(many=True, read_only=True)

    churches = ChurchSerializer(many=True, read_only=True)



    class Meta:

        model = ChurchesPage

        fields = [

            "id", "seo_title", "seo_description", "seo_keywords", "canonical_url",

            "og_title", "og_description", "og_image", "twitter_title",

            "twitter_description", "twitter_image", "robots_index", "robots_follow",

            "cities", "churches"

        ]



