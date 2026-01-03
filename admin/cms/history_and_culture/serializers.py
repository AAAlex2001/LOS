from rest_framework import serializers



from .models import HistoryAndCulturePage, HistorySection, CultureSection





class HistorySectionSerializer(serializers.ModelSerializer):

    image_url = serializers.SerializerMethodField()



    class Meta:

        model = HistorySection

        fields = [

            "id", "title", "content", "image_url", "order"

        ]



    def get_image_url(self, obj: HistorySection) -> str:

        if not obj.image:

            return ""

                                                           

        return obj.image.url.replace('/media/', '')





class CultureSectionSerializer(serializers.ModelSerializer):

    image_url = serializers.SerializerMethodField()



    class Meta:

        model = CultureSection

        fields = [

            "id", "title", "content", "image_url", "order"

        ]



    def get_image_url(self, obj: CultureSection) -> str:

        if not obj.image:

            return ""

                                                           

        return obj.image.url.replace('/media/', '')





class HistoryAndCulturePageSerializer(serializers.ModelSerializer):

    history_sections = HistorySectionSerializer(many=True, read_only=True)

    culture_sections = CultureSectionSerializer(many=True, read_only=True)



    class Meta:

        model = HistoryAndCulturePage

        fields = [

            "id", "seo_title", "seo_description", "seo_keywords", "canonical_url",

            "og_title", "og_description", "og_image", "twitter_title", 

            "twitter_description", "twitter_image", "robots_index", "robots_follow",

            "history_sections", "culture_sections"

        ]

