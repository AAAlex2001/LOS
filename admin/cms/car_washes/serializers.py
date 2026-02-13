from rest_framework import serializers



from .models import CarWashesPage, CarWashCity, CarWash





class CitySerializer(serializers.ModelSerializer):

    class Meta:

        model = CarWashCity

        fields = ["id", "name", "title", "order"]





class CarWashSerializer(serializers.ModelSerializer):

    image_url = serializers.SerializerMethodField()
    phone = serializers.SerializerMethodField()



    class Meta:

        model = CarWash

        fields = [

            "id", "city", "name", "name_link", "address", "address_link",

            "contacts", "phone", "working_hours", "services", "image_url", "order"

        ]



    def get_image_url(self, obj: CarWash) -> str:

        if not obj.image:

            return ""

        return obj.image.url.replace('/media/', '')

    def get_phone(self, obj: CarWash) -> str:
        return obj.contacts





class CarWashesPageSerializer(serializers.ModelSerializer):

    cities = CitySerializer(many=True, read_only=True)

    car_washes = CarWashSerializer(many=True, read_only=True)



    class Meta:

        model = CarWashesPage

        fields = [

            "id", "seo_title", "seo_description", "seo_keywords", "canonical_url",

            "og_title", "og_description", "og_image", "twitter_title",

            "twitter_description", "twitter_image", "robots_index", "robots_follow",

            "cities", "car_washes"

        ]



