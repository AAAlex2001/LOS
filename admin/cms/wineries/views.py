from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import WineriesPage, WineryCity, Winery
from .serializers import WineriesPageSerializer, CitySerializer, WinerySerializer


class WineriesPageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = WineriesPage.objects.all()
    serializer_class = WineriesPageSerializer

    @action(detail=False, methods=['get'])
    def content(self, request):
        """Получить все данные страницы виноделен"""
        try:
            page = self.get_queryset().first()
            if not page:
                return Response({"error": "Страница виноделен не найдена"}, status=404)
            
            serializer = self.get_serializer(page)
            return Response(serializer.data)
            
        except Exception as e:
            return Response({"error": str(e)}, status=500)

    @action(detail=False, methods=['get'], url_path='city/(?P<city_name>[^/]+)')
    def city_page(self, request, city_name=None):
        """Получить данные страницы виноделен для конкретного города"""
        try:
            page = self.get_queryset().first()
            if not page:
                return Response({"error": "Страница виноделен не найдена"}, status=404)
            
            # Найти город по имени
            city = WineryCity.objects.filter(
                page=page,
                name__icontains=city_name
            ).first()
            
            if not city:
                return Response({"error": f"Город '{city_name}' не найден"}, status=404)
            
            # Получить винодельни для этого города
            wineries = Winery.objects.filter(city=city).order_by('order', 'id')
            
            # Формируем заголовок
            title = city.title or f"{city.name}: винодельни"
            
            data = {
                "title": title,
                "city": CitySerializer(city).data,
                "wineries": WinerySerializer(wineries, many=True).data
            }
            
            return Response(data)
            
        except Exception as e:
            return Response({"error": str(e)}, status=500)


class CityViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = WineryCity.objects.all().order_by('order', 'id')
    serializer_class = CitySerializer


class WineryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Winery.objects.all().order_by('order', 'id')
    serializer_class = WinerySerializer

