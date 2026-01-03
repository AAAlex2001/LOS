from rest_framework import serializers

from .models import MountainRoutesPage, MountainRoute





class MountainRouteSerializer(serializers.ModelSerializer):

    class Meta:

        model = MountainRoute

        fields = [

            'id', 'title', 'name', 'image', 'site_url', 'phone', 'order'

        ]





class MountainRoutesPageSerializer(serializers.ModelSerializer):

    routes = MountainRouteSerializer(many=True, read_only=True)

    main_title = serializers.SerializerMethodField()

    section_title = serializers.SerializerMethodField()



    class Meta:

        model = MountainRoutesPage

        fields = [

            'id', 'main_title', 'section_title', 'routes',

            'seo_title', 'seo_description', 'seo_keywords', 'canonical_url',

            'og_title', 'og_description', 'og_image',

            'twitter_title', 'twitter_description', 'twitter_image',

            'robots_index', 'robots_follow', 'created_at', 'updated_at'

        ]



    def get_main_title(self, obj):

        request = self.context.get('request')

        lang = None

        if request is not None:

            lang = getattr(request, 'LANGUAGE_CODE', None) or request.GET.get('lang')

        if lang and lang.startswith('en'):

            return getattr(obj, 'main_title_en', None) or getattr(obj, 'main_title', '')

        return getattr(obj, 'main_title_ru', None) or getattr(obj, 'main_title', '')



    def get_section_title(self, obj):

        request = self.context.get('request')

        lang = None

        if request is not None:

            lang = getattr(request, 'LANGUAGE_CODE', None) or request.GET.get('lang')

        if lang and lang.startswith('en'):

            return getattr(obj, 'section_title_en', None) or getattr(obj, 'section_title', '')

        return getattr(obj, 'section_title_ru', None) or getattr(obj, 'section_title', '')





