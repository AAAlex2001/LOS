from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import PharmacyPage, PharmacyCity, PharmacyItem
from .serializers import PharmacyPageSerializer, CitySerializer, PharmacySerializer


class PharmacyPageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = PharmacyPage.objects.all()
    serializer_class = PharmacyPageSerializer

    @action(detail=False, methods=['get'])
    def content(self, request):
        page = PharmacyPage.objects.first()
        if not page:
            return Response({"cities": [], "pharmacies": []})
        serializer = PharmacyPageSerializer(page)
        return Response(serializer.data)

    @action(detail=False, methods=['get'], url_path='city/(?P<name>[^/]+)')
    def city(self, request, name=None):
        page = PharmacyPage.objects.first()
        city = PharmacyCity.objects.filter(name__iexact=name).first()
        if not page or not city:
            return Response({"title": "", "pharmacies": []})
        items = PharmacyItem.objects.filter(city=city).order_by('order', 'id')
        return Response({
            "title": city.title or city.name,
            "city": {"id": city.id, "name": city.name, "title": city.title, "order": city.order},
            "pharmacies": PharmacySerializer(items, many=True).data,
        })


class CityViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = PharmacyCity.objects.all().order_by('order', 'id')
    serializer_class = CitySerializer


class PharmacyViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = PharmacyItem.objects.all().order_by('order', 'id')
    serializer_class = PharmacySerializer

