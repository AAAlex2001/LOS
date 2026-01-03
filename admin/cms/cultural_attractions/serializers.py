from rest_framework import serializers



from .models import CulturalAttractionsPage, CulturalAttractionCity, CulturalAttraction





class CitySerializer(serializers.ModelSerializer):

    class Meta:

        model = CulturalAttractionCity

        fields = ["id", "name", "title", "order"]





class CulturalAttractionSerializer(serializers.ModelSerializer):

    image_url = serializers.SerializerMethodField()



    class Meta:

        model = CulturalAttraction

        fields = [

            "id", "city", "name", "name_link", "description", "address", "address_link",

            "working_hours", "image_url", "order"

        ]



    def get_image_url(self, obj: CulturalAttraction) -> str:

        if not obj.image:

            return ""

        return obj.image.url.replace('/media/', '')





class CulturalAttractionsPageSerializer(serializers.ModelSerializer):

    cities = CitySerializer(many=True, read_only=True)

    attractions = CulturalAttractionSerializer(many=True, read_only=True)



    class Meta:

        model = CulturalAttractionsPage

        fields = [

            "id", "seo_title", "seo_description", "seo_keywords", "canonical_url",

            "og_title", "og_description", "og_image", "twitter_title",

            "twitter_description", "twitter_image", "robots_index", "robots_follow",

            "cities", "attractions"

        ]



