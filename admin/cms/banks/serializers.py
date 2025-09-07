from rest_framework import serializers

from .models import BanksPage, Bank


class BankSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Bank
        fields = [
            "id", "name", "name_link", "working_hours", "address", 
            "address_link", "contacts", "email", "image_url", "order"
        ]

    def get_image_url(self, obj: Bank) -> str:
        if not obj.image:
            return ""
        # Возвращаем относительный путь, без /media/, для унификации с другими модулями
        return obj.image.url.replace('/media/', '')


class BanksPageSerializer(serializers.ModelSerializer):
    banks = BankSerializer(many=True, read_only=True)

    class Meta:
        model = BanksPage
        fields = [
            "id", "seo_title", "seo_description", "seo_keywords", "canonical_url",
            "og_title", "og_description", "og_image", "twitter_title", 
            "twitter_description", "twitter_image", "robots_index", "robots_follow",
            "banks"
        ]
