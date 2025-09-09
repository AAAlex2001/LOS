from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import HistoryAndCulturePage, HistorySection, CultureSection
from .serializers import HistoryAndCulturePageSerializer, HistorySectionSerializer, CultureSectionSerializer


class HistoryAndCulturePageViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API для страницы истории и культуры
    """
    queryset = HistoryAndCulturePage.objects.all()
    serializer_class = HistoryAndCulturePageSerializer

    @action(detail=False, methods=['get'])
    def content(self, request):
        """Получить все данные страницы истории и культуры"""
        try:
            page = self.get_queryset().first()
            if not page:
                return Response({"error": "Страница истории и культуры не найдена"}, status=404)
            
            serializer = self.get_serializer(page)
            return Response(serializer.data)
            
        except Exception as e:
            return Response({"error": str(e)}, status=500)

    @action(detail=False, methods=['get'])
    def history_sections(self, request):
        """Получить секции истории"""
        try:
            sections = HistorySection.objects.all().order_by('order', 'id')
            serializer = HistorySectionSerializer(sections, many=True)
            return Response(serializer.data)
            
        except Exception as e:
            return Response({"error": str(e)}, status=500)

    @action(detail=False, methods=['get'])
    def culture_sections(self, request):
        """Получить секции культуры"""
        try:
            sections = CultureSection.objects.all().order_by('order', 'id')
            serializer = CultureSectionSerializer(sections, many=True)
            return Response(serializer.data)
            
        except Exception as e:
            return Response({"error": str(e)}, status=500)


class HistorySectionViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API для секций истории
    """
    queryset = HistorySection.objects.all().order_by('order', 'id')
    serializer_class = HistorySectionSerializer


class CultureSectionViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API для секций культуры
    """
    queryset = CultureSection.objects.all().order_by('order', 'id')
    serializer_class = CultureSectionSerializer
