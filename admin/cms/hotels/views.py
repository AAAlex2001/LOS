from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import HotelsPage, HotelCity, Hotel
from .serializers import HotelsPageSerializer, CitySerializer, HotelSerializer


class HotelsPageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = HotelsPage.objects.all()
    serializer_class = HotelsPageSerializer

    @action(detail=False, methods=['get'])
    def content(self, request):
        page = HotelsPage.objects.first()
        if not page:
            return Response({"cities": [], "hotels": []})
        serializer = HotelsPageSerializer(page)
        return Response(serializer.data)

    @action(detail=False, methods=['get'], url_path='city/(?P<name>[^/]+)')
    def city(self, request, name=None):
        page = HotelsPage.objects.first()
        city = HotelCity.objects.filter(name__iexact=name).first()
        if not page or not city:
            return Response({"title": "", "hotels": []})
        items = Hotel.objects.filter(city=city).order_by('order', 'id')
        return Response({
            "title": city.title or city.name,
            "city": {"id": city.id, "name": city.name, "title": city.title, "order": city.order},
            "hotels": HotelSerializer(items, many=True).data,
        })


class CityViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = HotelCity.objects.all().order_by('order', 'id')
    serializer_class = CitySerializer


class HotelViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Hotel.objects.all().order_by('order', 'id')
    serializer_class = HotelSerializer

