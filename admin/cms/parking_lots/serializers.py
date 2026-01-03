from rest_framework import serializers



from .models import ParkingLotsPage, ParkingLotCity, ParkingLot





class CitySerializer(serializers.ModelSerializer):

    class Meta:

        model = ParkingLotCity

        fields = ["id", "name", "title", "order"]





class ParkingLotSerializer(serializers.ModelSerializer):

    image_url = serializers.SerializerMethodField()



    class Meta:

        model = ParkingLot

        fields = [

            "id", "city", "name", "address", "address_link",

            "working_hours", "contacts", "image_url", "order"

        ]



    def get_image_url(self, obj: ParkingLot) -> str:

        if not obj.image:

            return ""

        return obj.image.url.replace('/media/', '')





class ParkingLotsPageSerializer(serializers.ModelSerializer):

    cities = CitySerializer(many=True, read_only=True)

    parking_lots = ParkingLotSerializer(many=True, read_only=True)



    class Meta:

        model = ParkingLotsPage

        fields = [

            "id", "seo_title", "seo_description", "seo_keywords", "canonical_url",

            "og_title", "og_description", "og_image", "twitter_title",

            "twitter_description", "twitter_image", "robots_index", "robots_follow",

            "cities", "parking_lots"

        ]



