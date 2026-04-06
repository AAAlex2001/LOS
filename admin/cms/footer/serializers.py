from rest_framework import serializers

from .models import Footer, FooterLink, SocialLink





class FooterLinkSerializer(serializers.ModelSerializer):

    class Meta:

        model = FooterLink

        fields = ['id', 'category', 'label', 'url', 'order']





class SocialLinkSerializer(serializers.ModelSerializer):

    class Meta:

        model = SocialLink

        fields = ['id', 'network', 'url', 'order']





class FooterSerializer(serializers.ModelSerializer):

    links = FooterLinkSerializer(many=True, read_only=True)

    social_links = SocialLinkSerializer(many=True, read_only=True)

    

    class Meta:

        model = Footer

        fields = [
            'id', 'description', 'contact_info', 'email', 'copyright_text',
            'app_store_url', 'google_play_url',
            'links', 'social_links', 'created_at', 'updated_at'
        ]



