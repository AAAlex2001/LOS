from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import WineriesPage, WineryCity, Winery
from .serializers import WineriesPageSerializer, CitySerializer, WinerySerializer


class WineriesPageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = WineriesPage.objects.all()
    serializer_class = WineriesPageSerializer

    @action(detail=False, methods=['get'])
    def content(self, request):
        page = WineriesPage.objects.first()
        if not page:
            return Response({"cities": [], "wineries": []})
        serializer = WineriesPageSerializer(page)
        return Response(serializer.data)

    @action(detail=False, methods=['get'], url_path='city/(?P<name>[^/]+)')
    def city(self, request, name=None):
        page = WineriesPage.objects.first()
        city = WineryCity.objects.filter(name__iexact=name).first()
        if not page or not city:
            return Response({"title": "", "wineries": []})
        items = Winery.objects.filter(city=city).order_by('order', 'id')
        return Response({
            "title": city.title or city.name,
            "city": {"id": city.id, "name": city.name, "title": city.title, "order": city.order},
            "wineries": WinerySerializer(items, many=True).data,
        })


class CityViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = WineryCity.objects.all().order_by('order', 'id')
    serializer_class = CitySerializer


class WineryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Winery.objects.all().order_by('order', 'id')
    serializer_class = WinerySerializer

