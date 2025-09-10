from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import TaxiPage
from .serializers import TaxiPageSerializer


class TaxiPageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = TaxiPage.objects.all()
    serializer_class = TaxiPageSerializer

    @action(detail=False, methods=['get'])
    def content(self, request):
        """Получить все данные страницы такси"""
        try:
            page = self.get_queryset().first()
            if not page:
                return Response({"error": "Страница такси не найдена"}, status=404)
            
            serializer = self.get_serializer(page)
            return Response(serializer.data)
            
        except Exception as e:
            return Response({"error": str(e)}, status=500)

