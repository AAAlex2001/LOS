from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import ShopsAndMarketsPage, ShopCity, ShopOrMarket
from .serializers import ShopsAndMarketsPageSerializer, CitySerializer, ShopSerializer


class ShopsAndMarketsPageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ShopsAndMarketsPage.objects.all()
    serializer_class = ShopsAndMarketsPageSerializer

    @action(detail=False, methods=['get'])
    def content(self, request):
        page = ShopsAndMarketsPage.objects.first()
        if not page:
            return Response({"cities": [], "shops": []})
        serializer = ShopsAndMarketsPageSerializer(page)
        return Response(serializer.data)

    @action(detail=False, methods=['get'], url_path='city/(?P<name>[^/]+)')
    def city(self, request, name=None):
        page = ShopsAndMarketsPage.objects.first()
        city = ShopCity.objects.filter(name__iexact=name).first()
        if not page or not city:
            return Response({"title": "", "shops": []})
        items = ShopOrMarket.objects.filter(city=city).order_by('order', 'id')
        return Response({
            "title": city.title or city.name,
            "city": {"id": city.id, "name": city.name, "title": city.title, "order": city.order},
            "shops": ShopSerializer(items, many=True).data,
        })


class CityViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ShopCity.objects.all().order_by('order', 'id')
    serializer_class = CitySerializer


class ShopViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ShopOrMarket.objects.all().order_by('order', 'id')
    serializer_class = ShopSerializer

