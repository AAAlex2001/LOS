from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import BeachesPage, BeachCity, Beach
from .serializers import BeachesPageSerializer, CitySerializer, BeachSerializer


class BeachesPageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = BeachesPage.objects.all()
    serializer_class = BeachesPageSerializer

    @action(detail=False, methods=['get'])
    def content(self, request):
        """Получить все данные страницы пляжей"""
        try:
            page = self.get_queryset().first()
            if not page:
                return Response({"error": "Страница пляжей не найдена"}, status=404)
            
            serializer = self.get_serializer(page)
            return Response(serializer.data)
            
        except Exception as e:
            return Response({"error": str(e)}, status=500)

    @action(detail=False, methods=['get'], url_path='city_page/(?P<city_name>[^/]+)')
    def city_page(self, request, city_name=None):
        """Получить данные страницы пляжей для конкретного города"""
        try:
            page = self.get_queryset().first()
            if not page:
                return Response({"error": "Страница пляжей не найдена"}, status=404)
            
            # Найти город по имени
            city = BeachCity.objects.filter(
                page=page,
                name__icontains=city_name
            ).first()
            
            if not city:
                return Response({"error": f"Город '{city_name}' не найден"}, status=404)
            
            # Получить пляжи для этого города
            beaches = Beach.objects.filter(city=city).order_by('order', 'id')
            
            # Формируем заголовок
            title = city.title or f"{city.name}: пляжи"
            
            data = {
                "title": title,
                "city": CitySerializer(city).data,
                "beaches": BeachSerializer(beaches, many=True).data
            }
            
            return Response(data)
            
        except Exception as e:
            return Response({"error": str(e)}, status=500)


class CityViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = BeachCity.objects.all().order_by('order', 'id')
    serializer_class = CitySerializer


class BeachViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Beach.objects.all().order_by('order', 'id')
    serializer_class = BeachSerializer


