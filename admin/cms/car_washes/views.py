from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import CarWashesPage, CarWashCity, CarWash
from .serializers import CarWashesPageSerializer, CitySerializer, CarWashSerializer


class CarWashesPageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = CarWashesPage.objects.all()
    serializer_class = CarWashesPageSerializer

    @action(detail=False, methods=['get'])
    def content(self, request):
        """Получить все данные страницы моек машин"""
        try:
            page = self.get_queryset().first()
            if not page:
                return Response({"error": "Страница моек машин не найдена"}, status=404)
            
            serializer = self.get_serializer(page)
            return Response(serializer.data)
            
        except Exception as e:
            return Response({"error": str(e)}, status=500)

    @action(detail=False, methods=['get'], url_path='city_page/(?P<city_name>[^/]+)')
    def city_page(self, request, city_name=None):
        """Получить данные страницы мойки машин для конкретного города"""
        try:
            page = self.get_queryset().first()
            if not page:
                return Response({"error": "Страница моек машин не найдена"}, status=404)
            
            # Найти город по имени
            city = CarWashCity.objects.filter(
                page=page,
                name__icontains=city_name
            ).first()
            
            if not city:
                return Response({"error": f"Город '{city_name}' не найден"}, status=404)
            
            # Получить мойки машин для этого города
            car_washes = CarWash.objects.filter(city=city).order_by('order', 'id')
            
            # Формируем заголовок
            title = city.title or f"{city.name}: мойки машин"
            
            data = {
                "title": title,
                "city": CitySerializer(city).data,
                "car_washes": CarWashSerializer(car_washes, many=True).data
            }
            
            return Response(data)
            
        except Exception as e:
            return Response({"error": str(e)}, status=500)

