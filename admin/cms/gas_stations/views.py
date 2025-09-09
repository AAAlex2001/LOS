from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import GasStationsPage, GasStationCity, GasStation
from .serializers import GasStationsPageSerializer, CitySerializer, GasStationSerializer


class GasStationsPageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = GasStationsPage.objects.all()
    serializer_class = GasStationsPageSerializer

    @action(detail=False, methods=['get'])
    def content(self, request):
        page = GasStationsPage.objects.first()
        if not page:
            return Response({"cities": [], "gas_stations": []})
        serializer = GasStationsPageSerializer(page)
        return Response(serializer.data)

    @action(detail=False, methods=['get'], url_path='city/(?P<name>[^/]+)')
    def city(self, request, name=None):
        page = GasStationsPage.objects.first()
        city = GasStationCity.objects.filter(name__iexact=name).first()
        if not page or not city:
            return Response({"title": "", "gas_stations": []})
        items = GasStation.objects.filter(city=city).order_by('order', 'id')
        return Response({
            "title": city.title or city.name,
            "city": {"id": city.id, "name": city.name, "title": city.title, "order": city.order},
            "gas_stations": GasStationSerializer(items, many=True).data,
        })


class CityViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = GasStationCity.objects.all().order_by('order', 'id')
    serializer_class = CitySerializer


class GasStationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = GasStation.objects.all().order_by('order', 'id')
    serializer_class = GasStationSerializer

