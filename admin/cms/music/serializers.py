from rest_framework import serializers
from .models import MusicPage, MusicTrack


class MusicTrackSerializer(serializers.ModelSerializer):
    audio_url = serializers.SerializerMethodField()

    class Meta:
        model = MusicTrack
        fields = ["id", "title", "artist", "audio_url", "order", "is_active"]

    def get_audio_url(self, obj: MusicTrack) -> str:
        if not obj.audio_file:
            return ""
        return obj.audio_file.url.replace('/media/', '')


class MusicPageSerializer(serializers.ModelSerializer):
    tracks = MusicTrackSerializer(many=True, read_only=True)
    intro_text_field = serializers.CharField(source="intro_text", read_only=True)
    intro_bg_image_url = serializers.SerializerMethodField()
    main_image_url = serializers.SerializerMethodField()

    class Meta:
        model = MusicPage
        fields = [
            "id", "intro_text_field", "intro_bg_image_url", "main_image_url",
            "seo_title", "seo_description", "seo_keywords", "canonical_url",
            "og_title", "og_description", "og_image", "twitter_title",
            "twitter_description", "twitter_image", "robots_index", "robots_follow",
            "tracks"
        ]

    def get_intro_bg_image_url(self, obj: MusicPage) -> str:
        if not obj.intro_bg_image:
            return ""
        return obj.intro_bg_image.url.replace('/media/', '')

    def get_main_image_url(self, obj: MusicPage) -> str:
        if not obj.main_image:
            return ""
        return obj.main_image.url.replace('/media/', '')

