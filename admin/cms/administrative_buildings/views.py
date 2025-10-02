from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import AdministrativeBuildingsPage, AdministrativeBuildingCity, AdministrativeBuilding
from .serializers import AdministrativeBuildingsPageSerializer, CitySerializer, AdministrativeBuildingSerializer


class AdministrativeBuildingsPageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = AdministrativeBuildingsPage.objects.all()
    serializer_class = AdministrativeBuildingsPageSerializer

    @action(detail=False, methods=['get'])
    def content(self, request):
        """Получить все данные страницы административных зданий"""
        try:
            page = self.get_queryset().first()
            if not page:
                return Response({"error": "Страница административных зданий не найдена"}, status=404)
            
            serializer = self.get_serializer(page)
            return Response(serializer.data)
            
        except Exception as e:
            return Response({"error": str(e)}, status=500)

    @action(detail=False, methods=['get'], url_path='city_page/(?P<city_name>[^/]+)')
    def city_page(self, request, city_name=None):
        """Получить данные страницы административных зданий для конкретного города"""
        try:
            page = self.get_queryset().first()
            if not page:
                return Response({"error": "Страница административных зданий не найдена"}, status=404)
            
            # Найти город по имени
            city = AdministrativeBuildingCity.objects.filter(
                page=page,
                name__icontains=city_name
            ).first()
            
            if not city:
                return Response({"error": f"Город '{city_name}' не найден"}, status=404)
            
            # Получить административные здания для этого города
            buildings = AdministrativeBuilding.objects.filter(city=city).order_by('order', 'id')
            
            # Формируем заголовок
            title = city.title or f"{city.name}: административные здания"
            
            data = {
                "title": title,
                "city": CitySerializer(city).data,
                "buildings": AdministrativeBuildingSerializer(buildings, many=True).data
            }
            
            return Response(data)
            
        except Exception as e:
            return Response({"error": str(e)}, status=500)
