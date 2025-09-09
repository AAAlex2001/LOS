from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import ParkingLotsPage, ParkingLotCity, ParkingLot
from .serializers import ParkingLotsPageSerializer, CitySerializer, ParkingLotSerializer


class ParkingLotsPageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ParkingLotsPage.objects.all()
    serializer_class = ParkingLotsPageSerializer

    @action(detail=False, methods=['get'])
    def content(self, request):
        """Получить все данные страницы парковок"""
        try:
            page = self.get_queryset().first()
            if not page:
                return Response({"error": "Страница парковок не найдена"}, status=404)
            
            serializer = self.get_serializer(page)
            return Response(serializer.data)
            
        except Exception as e:
            return Response({"error": str(e)}, status=500)

    @action(detail=False, methods=['get'], url_path='city_page/(?P<city_name>[^/]+)')
    def city_page(self, request, city_name=None):
        """Получить данные страницы парковок для конкретного города"""
        try:
            page = self.get_queryset().first()
            if not page:
                return Response({"error": "Страница парковок не найдена"}, status=404)
            
            # Найти город по имени
            city = ParkingLotCity.objects.filter(
                page=page,
                name__icontains=city_name
            ).first()
            
            if not city:
                return Response({"error": f"Город '{city_name}' не найден"}, status=404)
            
            # Получить парковки для этого города
            parking_lots = ParkingLot.objects.filter(city=city).order_by('order', 'id')
            
            # Формируем заголовок
            title = city.title or f"{city.name}: парковки"
            
            data = {
                "title": title,
                "city": CitySerializer(city).data,
                "parking_lots": ParkingLotSerializer(parking_lots, many=True).data
            }
            
            return Response(data)
            
        except Exception as e:
            return Response({"error": str(e)}, status=500)


class CityViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ParkingLotCity.objects.all().order_by('order', 'id')
    serializer_class = CitySerializer


class ParkingLotViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ParkingLot.objects.all().order_by('order', 'id')
    serializer_class = ParkingLotSerializer

