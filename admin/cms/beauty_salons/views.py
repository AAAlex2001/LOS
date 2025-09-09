from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import BeautySalonsPage, BeautySalonCity, BeautySalon
from .serializers import BeautySalonsPageSerializer, CitySerializer, BeautySalonSerializer


class BeautySalonsPageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = BeautySalonsPage.objects.all()
    serializer_class = BeautySalonsPageSerializer

    @action(detail=False, methods=['get'])
    def content(self, request):
        """Получить все данные страницы салонов красоты"""
        try:
            page = self.get_queryset().first()
            if not page:
                return Response({"error": "Страница салонов красоты не найдена"}, status=404)
            
            serializer = self.get_serializer(page)
            return Response(serializer.data)
            
        except Exception as e:
            return Response({"error": str(e)}, status=500)

    @action(detail=False, methods=['get'], url_path='city_page/(?P<city_name>[^/]+)')
    def city_page(self, request, city_name=None):
        """Получить данные страницы салона красоты для конкретного города"""
        try:
            page = self.get_queryset().first()
            if not page:
                return Response({"error": "Страница салонов красоты не найдена"}, status=404)
            
            # Найти город по имени
            city = BeautySalonCity.objects.filter(
                page=page,
                name__icontains=city_name
            ).first()
            
            if not city:
                return Response({"error": f"Город '{city_name}' не найден"}, status=404)
            
            # Получить салоны красоты для этого города
            beauty_salons = BeautySalon.objects.filter(city=city).order_by('order', 'id')
            
            # Формируем заголовок
            title = city.title or f"{city.name}: салоны красоты"
            
            data = {
                "title": title,
                "city": CitySerializer(city).data,
                "beauty_salons": BeautySalonSerializer(beauty_salons, many=True).data
            }
            
            return Response(data)
            
        except Exception as e:
            return Response({"error": str(e)}, status=500)
