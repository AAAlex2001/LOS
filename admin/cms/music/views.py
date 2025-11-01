from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import MusicPage, MusicTrack
from .serializers import MusicPageSerializer, MusicTrackSerializer


class MusicPageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = MusicPage.objects.all()
    serializer_class = MusicPageSerializer

    @action(detail=False, methods=['get'])
    def content(self, request):
        """Получить все данные страницы музыки"""
        try:
            page = self.get_queryset().first()
            if not page:
                return Response({"error": "Страница музыки не найдена"}, status=404)
            serializer = self.get_serializer(page)
            return Response(serializer.data)
        except Exception as e:
            return Response({"error": str(e)}, status=500)


class MusicTrackViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = MusicTrack.objects.filter(is_active=True).order_by('order', 'id')
    serializer_class = MusicTrackSerializer

    @action(detail=False, methods=['get'])
    def list_all(self, request):
        """Получить все активные треки"""
        try:
            tracks = self.get_queryset()
            serializer = self.get_serializer(tracks, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response({"error": str(e)}, status=500)

