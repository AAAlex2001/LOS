from rest_framework import serializers



from .models import ShopsAndMarketsPage, ShopCity, ShopOrMarket





class CitySerializer(serializers.ModelSerializer):

    class Meta:

        model = ShopCity

        fields = ["id", "name", "title", "order"]





class ShopSerializer(serializers.ModelSerializer):

    image_url = serializers.SerializerMethodField()
    phone = serializers.SerializerMethodField()



    class Meta:

        model = ShopOrMarket

        fields = [

            "id", "city", "name", "working_hours", "address", "address_link",

            "website", "contacts", "phone", "image_url", "order"

        ]



    def get_image_url(self, obj: ShopOrMarket) -> str:

        if not obj.image:

            return ""

        return obj.image.url.replace('/media/', '')
    
    def get_phone(self, obj: ShopOrMarket) -> str:
        # alias for frontend which expects `phone`
        return obj.contacts





class ShopsAndMarketsPageSerializer(serializers.ModelSerializer):

    cities = CitySerializer(many=True, read_only=True)

    shops = ShopSerializer(many=True, read_only=True)



    class Meta:

        model = ShopsAndMarketsPage

        fields = [

            "id", "seo_title", "seo_description", "seo_keywords", "canonical_url",

            "og_title", "og_description", "og_image", "twitter_title",

            "twitter_description", "twitter_image", "robots_index", "robots_follow",

            "cities", "shops"

        ]



