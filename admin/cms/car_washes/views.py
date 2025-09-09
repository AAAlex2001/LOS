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
        page = self.get_queryset().first()
        if not page:
            return Response({"cities": [], "car_washes": []})
        serializer = self.get_serializer(page)
        return Response(serializer.data)

    @action(detail=False, methods=['get'], url_path='city/(?P<city_name>[^/]+)')
    def city_page(self, request, city_name=None):
        """Получить данные страницы мойки машин для конкретного города"""
        page = self.get_queryset().first()
        if not page:
            return Response({"title": "", "car_washes": []})
        city = CarWashCity.objects.filter(page=page, name__iexact=city_name).first()
        if not city:
            return Response({"title": "", "car_washes": []})
        car_washes = CarWash.objects.filter(city=city).order_by('order', 'id')
        title = city.title or f"{city.name}: мойки машин"
        data = {
            "title": title,
            "city": CitySerializer(city).data,
            "car_washes": CarWashSerializer(car_washes, many=True).data
        }
        return Response(data)
