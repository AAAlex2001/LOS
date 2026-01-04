from rest_framework import serializers

from .models import PartiesPage, PartyCity, PartyEvent, PartySliderItem





class PartyEventSerializer(serializers.ModelSerializer):

    city_name = serializers.CharField(source='city.name', read_only=True)

    city_slug = serializers.CharField(source='city.slug', read_only=True)

    

    class Meta:

        model = PartyEvent

        fields = [

            'id', 'title', 'date_info', 'location', 'location_link', 'description', 'event_url', 'order',

            'city', 'city_name', 'city_slug'

        ]





class PartySliderItemSerializer(serializers.ModelSerializer):

    city_name = serializers.CharField(source='city.name', read_only=True)

    city_slug = serializers.CharField(source='city.slug', read_only=True)

    

    class Meta:

        model = PartySliderItem

        fields = [

            'id', 'media_type', 'media_file', 'order', 'city', 'city_name', 'city_slug'

        ]





class PartyCitySerializer(serializers.ModelSerializer):

    events = PartyEventSerializer(many=True, read_only=True)

    slider_items = PartySliderItemSerializer(many=True, read_only=True)

    main_title = serializers.SerializerMethodField()



    class Meta:

        model = PartyCity

        fields = [

            'id', 'name', 'slug', 'city_image', 'events', 'slider_items', 'order', 'main_title'

        ]

    def get_main_title(self, obj):
        return self.pick(obj, 'name', self.context.get('request'))

    def pick(self, obj, field_base, request):
        lang = None
        if request is not None:
            # prefer explicit ?lang= over request.LANGUAGE_CODE
            lang = request.GET.get('lang') or getattr(request, 'LANGUAGE_CODE', None)
        if lang and lang.startswith('en'):
            return getattr(obj, field_base + '_en', None) or getattr(obj, field_base, '')
        return getattr(obj, field_base + '_ru', None) or getattr(obj, field_base, '')





class PartiesPageSerializer(serializers.ModelSerializer):

    cities = PartyCitySerializer(many=True, read_only=True)

    events = PartyEventSerializer(many=True, read_only=True)

    slider_items = PartySliderItemSerializer(many=True, read_only=True)

    main_title = serializers.SerializerMethodField()



    class Meta:

        model = PartiesPage

        fields = [

            'id', 'main_title',

            'background_image', 'center_icon',

            'decor_image_1', 'decor_image_2', 'decor_image_3', 'decor_image_4', 'decor_image_5',

            'intro_text',

            'cities', 'events', 'slider_items',

            'seo_title', 'seo_description', 'seo_keywords', 'canonical_url',

            'og_title', 'og_description', 'og_image',

            'twitter_title', 'twitter_description', 'twitter_image',

            'robots_index', 'robots_follow', 'created_at', 'updated_at'

        ]



    def get_main_title(self, obj):
        return self.pick(obj, 'main_title', self.context.get('request'))

    def pick(self, obj, field_base, request):
        lang = None
        if request is not None:
            lang = request.GET.get('lang') or getattr(request, 'LANGUAGE_CODE', None)
        if lang and lang.startswith('en'):
            return getattr(obj, field_base + '_en', None) or getattr(obj, field_base, '')
        return getattr(obj, field_base + '_ru', None) or getattr(obj, field_base, '')

