from rest_framework import serializers

from .models import WelcomePage, WelcomeIcon





class WelcomeIconSerializer(serializers.ModelSerializer):

    class Meta:

        model = WelcomeIcon

        fields = ('image', 'order')





class WelcomePageSerializer(serializers.ModelSerializer):

    icons = WelcomeIconSerializer(many=True, read_only=True)



    class Meta:

        model = WelcomePage

        fields = ('title', 'subtitle', 'description', 'icons')
