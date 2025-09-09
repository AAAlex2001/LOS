from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import RestaurantsPage, RestaurantCity, Restaurant
from .serializers import RestaurantsPageSerializer, CitySerializer, RestaurantSerializer


class RestaurantsPageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = RestaurantsPage.objects.all()
    serializer_class = RestaurantsPageSerializer

    @action(detail=False, methods=['get'])
    def content(self, request):
        page = RestaurantsPage.objects.first()
        if not page:
            return Response({"cities": [], "restaurants": []})
        serializer = RestaurantsPageSerializer(page)
        return Response(serializer.data)

    @action(detail=False, methods=['get'], url_path='city/(?P<name>[^/]+)')
    def city(self, request, name=None):
        page = RestaurantsPage.objects.first()
        city = RestaurantCity.objects.filter(name__iexact=name).first()
        if not page or not city:
            return Response({"title": "", "restaurants": []})
        items = Restaurant.objects.filter(city=city).order_by('order', 'id')
        return Response({
            "title": city.title or city.name,
            "city": {"id": city.id, "name": city.name, "title": city.title, "order": city.order},
            "restaurants": RestaurantSerializer(items, many=True).data,
        })


class CityViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = RestaurantCity.objects.all().order_by('order', 'id')
    serializer_class = CitySerializer


class RestaurantViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Restaurant.objects.all().order_by('order', 'id')
    serializer_class = RestaurantSerializer

