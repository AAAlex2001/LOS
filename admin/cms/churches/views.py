from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import ChurchesPage, ChurchCity, Church
from .serializers import ChurchesPageSerializer, CitySerializer, ChurchSerializer


class ChurchesPageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ChurchesPage.objects.all()
    serializer_class = ChurchesPageSerializer

    @action(detail=False, methods=['get'])
    def content(self, request):
        """Получить все данные страницы церквей"""
        page = self.get_queryset().first()
        if not page:
            return Response({"error": "Страница церквей не найдена"}, status=404)
        
        serializer = self.get_serializer(page)
        return Response(serializer.data)

    @action(detail=False, methods=['get'], url_path='city/(?P<city_name>[^/]+)')
    def city_page(self, request, city_name=None):
        """Получить данные страницы церквей для конкретного города"""
        try:
            page = self.get_queryset().first()
            if not page:
                return Response({"error": "Страница церквей не найдена"}, status=404)
            
            # Найти город по имени
            city = ChurchCity.objects.filter(
                page=page,
                name__icontains=city_name
            ).first()
            
            if not city:
                return Response({"error": f"Город '{city_name}' не найден"}, status=404)
            
            # Получить церкви для этого города
            churches = Church.objects.filter(city=city)
            
            # Формируем заголовок
            title = city.title or f"{city.name}: церкви и храмы"
            
            data = {
                "title": title,
                "city": CitySerializer(city).data,
                "churches": ChurchSerializer(churches, many=True).data
            }
            
            return Response(data)
            
        except Exception as e:
            return Response({"error": str(e)}, status=500)
