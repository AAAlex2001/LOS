from rest_framework import serializers

from .models import TransportCommunicationsPage, TransportBlock





class TransportBlockSerializer(serializers.ModelSerializer):

    class Meta:

        model = TransportBlock

        fields = [

            'id', 'title', 'location_link', 'image_1', 'image_2', 'order'

        ]





class TransportCommunicationsPageSerializer(serializers.ModelSerializer):

    transport_blocks = TransportBlockSerializer(many=True, read_only=True)

    main_title = serializers.SerializerMethodField()



    class Meta:

        model = TransportCommunicationsPage

        fields = [

            'id', 'main_title', 'transport_blocks',

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

