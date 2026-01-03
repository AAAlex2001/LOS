from rest_framework import serializers



from .models import AbkhazianCustomsPage, CustomSection





class CustomSectionSerializer(serializers.ModelSerializer):

    class Meta:

        model = CustomSection

        fields = ["id", "title", "text", "order"]





class AbkhazianCustomsPageSerializer(serializers.ModelSerializer):

    sections = CustomSectionSerializer(many=True, read_only=True)

    hero_image_url = serializers.SerializerMethodField()

    main_title = serializers.SerializerMethodField()



    class Meta:

        model = AbkhazianCustomsPage

        fields = [

            "id", "main_title", "intro_text", "seo_title", "seo_description", "seo_keywords", "canonical_url",

            "og_title", "og_description", "og_image", "twitter_title", 

            "twitter_description", "twitter_image", "robots_index", "robots_follow",

            "hero_image_url", "sections"

        ]



    def get_main_title(self, obj: AbkhazianCustomsPage) -> str:

        request = self.context.get('request')

        lang = None

        if request is not None:

            lang = getattr(request, 'LANGUAGE_CODE', None) or request.GET.get('lang')

        if lang and lang.startswith('en'):

            return getattr(obj, 'main_title_en', None) or getattr(obj, 'main_title', '')

        return getattr(obj, 'main_title_ru', None) or getattr(obj, 'main_title', '')



    def get_hero_image_url(self, obj: AbkhazianCustomsPage) -> str:

        if not obj.hero_image:

            return ""

                                                                          

        return obj.hero_image.url.replace('/media/', '')





