from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import CulturalAttractionsPage, CulturalAttractionCity, CulturalAttraction
from .serializers import CulturalAttractionsPageSerializer, CitySerializer, CulturalAttractionSerializer


class CulturalAttractionsPageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = CulturalAttractionsPage.objects.all()
    serializer_class = CulturalAttractionsPageSerializer

    @action(detail=False, methods=['get'])
    def content(self, request):
        """Получить все данные страницы культурных достопримечательностей"""
        page = self.get_queryset().first()
        if not page:
            return Response({"error": "Страница культурных достопримечательностей не найдена"}, status=404)
        
        serializer = self.get_serializer(page)
        return Response(serializer.data)

    @action(detail=False, methods=['get'], url_path='city/(?P<city_name>[^/]+)')
    def city_page(self, request, city_name=None):
        """Получить данные страницы культурных достопримечательностей для конкретного города"""
        try:
            page = self.get_queryset().first()
            if not page:
                return Response({"error": "Страница культурных достопримечательностей не найдена"}, status=404)
            
            # Найти город по имени
            city = CulturalAttractionCity.objects.filter(
                page=page,
                name__icontains=city_name
            ).first()
            
            if not city:
                return Response({"error": f"Город '{city_name}' не найден"}, status=404)
            
            # Получить достопримечательности для этого города
            attractions = CulturalAttraction.objects.filter(city=city)
            
            # Формируем заголовок
            title = city.title or f"{city.name}: культурные достопримечательности"
            
            data = {
                "title": title,
                "city": CitySerializer(city).data,
                "attractions": CulturalAttractionSerializer(attractions, many=True).data
            }
            
            return Response(data)
            
        except Exception as e:
            return Response({"error": str(e)}, status=500)

