from rest_framework import serializers



from .models import RestaurantsPage, RestaurantCity, Restaurant





class CitySerializer(serializers.ModelSerializer):

    class Meta:

        model = RestaurantCity

        fields = ["id", "name", "title", "order"]





class RestaurantSerializer(serializers.ModelSerializer):

    image_url = serializers.SerializerMethodField()



    class Meta:

        model = Restaurant

        fields = [

            "id", "city", "name", "name_link", "website", "address", "address_link",

            "phone", "working_hours", "image_url", "order"

        ]



    def get_image_url(self, obj: Restaurant) -> str:

        if not obj.image:

            return ""

        return obj.image.url.replace('/media/', '')





class RestaurantsPageSerializer(serializers.ModelSerializer):

    cities = CitySerializer(many=True, read_only=True)

    restaurants = RestaurantSerializer(many=True, read_only=True)



    class Meta:

        model = RestaurantsPage

        fields = [

            "id", "seo_title", "seo_description", "seo_keywords", "canonical_url",

            "og_title", "og_description", "og_image", "twitter_title",

            "twitter_description", "twitter_image", "robots_index", "robots_follow",

            "cities", "restaurants"

        ]



