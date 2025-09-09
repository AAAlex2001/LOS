from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import ParkingLotsPage, ParkingLotCity, ParkingLot
from .serializers import ParkingLotsPageSerializer, CitySerializer, ParkingLotSerializer


class ParkingLotsPageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ParkingLotsPage.objects.all()
    serializer_class = ParkingLotsPageSerializer

    @action(detail=False, methods=['get'])
    def content(self, request):
        page = ParkingLotsPage.objects.first()
        if not page:
            return Response({"cities": [], "parking_lots": []})
        serializer = ParkingLotsPageSerializer(page)
        return Response(serializer.data)

    @action(detail=False, methods=['get'], url_path='city/(?P<name>[^/]+)')
    def city(self, request, name=None):
        page = ParkingLotsPage.objects.first()
        city = ParkingLotCity.objects.filter(name__iexact=name).first()
        if not page or not city:
            return Response({"title": "", "parking_lots": []})
        items = ParkingLot.objects.filter(city=city).order_by('order', 'id')
        return Response({
            "title": city.title or city.name,
            "city": {"id": city.id, "name": city.name, "title": city.title, "order": city.order},
            "parking_lots": ParkingLotSerializer(items, many=True).data,
        })


class CityViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ParkingLotCity.objects.all().order_by('order', 'id')
    serializer_class = CitySerializer


class ParkingLotViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ParkingLot.objects.all().order_by('order', 'id')
    serializer_class = ParkingLotSerializer

