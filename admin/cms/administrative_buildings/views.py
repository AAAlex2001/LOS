from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import AdministrativeBuildingsPage, City, AdministrativeBuilding
from .serializers import AdministrativeBuildingsPageSerializer, CitySerializer, AdministrativeBuildingSerializer


class AdministrativeBuildingsPageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = AdministrativeBuildingsPage.objects.all()
    serializer_class = AdministrativeBuildingsPageSerializer

    @action(detail=False, methods=['get'])
    def content(self, request):
        page = AdministrativeBuildingsPage.objects.first()
        if not page:
            return Response({"cities": [], "buildings": []})
        serializer = AdministrativeBuildingsPageSerializer(page)
        return Response(serializer.data)

    @action(detail=False, methods=['get'], url_path='city/(?P<name>[^/]+)')
    def city(self, request, name=None):
        page = AdministrativeBuildingsPage.objects.first()
        city = City.objects.filter(name__iexact=name).first()
        if not page or not city:
            return Response({"title": "", "buildings": []})
        buildings = AdministrativeBuilding.objects.filter(city=city).order_by('order', 'id')
        return Response({
            "title": city.title or city.name,
            "city": {"id": city.id, "name": city.name, "title": city.title, "order": city.order},
            "buildings": AdministrativeBuildingSerializer(buildings, many=True).data,
        })


class CityViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = City.objects.all().order_by('order', 'id')
    serializer_class = CitySerializer


class AdministrativeBuildingViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = AdministrativeBuilding.objects.all().order_by('order', 'id')
    serializer_class = AdministrativeBuildingSerializer


