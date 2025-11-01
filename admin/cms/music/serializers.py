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

    class Meta:
        model = MusicPage
        fields = [
            "id", "seo_title", "seo_description", "seo_keywords", "canonical_url",
            "og_title", "og_description", "og_image", "twitter_title",
            "twitter_description", "twitter_image", "robots_index", "robots_follow",
            "tracks"
        ]

