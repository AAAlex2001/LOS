from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import GasStationsPage, GasStationCity, GasStation
from .serializers import GasStationsPageSerializer, CitySerializer, GasStationSerializer


class GasStationsPageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = GasStationsPage.objects.all()
    serializer_class = GasStationsPageSerializer

    @action(detail=False, methods=['get'])
    def content(self, request):
        """Получить все данные страницы заправок"""
        try:
            page = self.get_queryset().first()
            if not page:
                return Response({"error": "Страница заправок не найдена"}, status=404)
            
            serializer = self.get_serializer(page)
            return Response(serializer.data)
            
        except Exception as e:
            return Response({"error": str(e)}, status=500)

    @action(detail=False, methods=['get'], url_path='city_page/(?P<city_name>[^/]+)')
    def city_page(self, request, city_name=None):
        """Получить данные страницы заправок для конкретного города"""
        try:
            page = self.get_queryset().first()
            if not page:
                return Response({"error": "Страница заправок не найдена"}, status=404)
            
            # Найти город по имени
            city = GasStationCity.objects.filter(
                page=page,
                name__icontains=city_name
            ).first()
            
            if not city:
                return Response({"error": f"Город '{city_name}' не найден"}, status=404)
            
            # Получить заправки для этого города
            gas_stations = GasStation.objects.filter(city=city).order_by('order', 'id')
            
            # Формируем заголовок
            title = city.title or f"{city.name}: заправки"
            
            data = {
                "title": title,
                "city": CitySerializer(city).data,
                "gas_stations": GasStationSerializer(gas_stations, many=True).data
            }
            
            return Response(data)
            
        except Exception as e:
            return Response({"error": str(e)}, status=500)


