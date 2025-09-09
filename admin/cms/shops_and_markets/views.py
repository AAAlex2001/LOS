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
        """Получить все данные страницы магазинов и рынков"""
        try:
            page = self.get_queryset().first()
            if not page:
                return Response({"error": "Страница магазинов и рынков не найдена"}, status=404)
            
            serializer = self.get_serializer(page)
            return Response(serializer.data)
            
        except Exception as e:
            return Response({"error": str(e)}, status=500)

    @action(detail=False, methods=['get'], url_path='city/(?P<city_name>[^/]+)')
    def city_page(self, request, city_name=None):
        """Получить данные страницы магазинов и рынков для конкретного города"""
        try:
            page = self.get_queryset().first()
            if not page:
                return Response({"error": "Страница магазинов и рынков не найдена"}, status=404)
            
            # Найти город по имени
            city = ShopCity.objects.filter(
                page=page,
                name__icontains=city_name
            ).first()
            
            if not city:
                return Response({"error": f"Город '{city_name}' не найден"}, status=404)
            
            # Получить магазины и рынки для этого города
            shops = ShopOrMarket.objects.filter(city=city).order_by('order', 'id')
            
            # Формируем заголовок
            title = city.title or f"{city.name}: магазины и рынки"
            
            data = {
                "title": title,
                "city": CitySerializer(city).data,
                "shops": ShopSerializer(shops, many=True).data
            }
            
            return Response(data)
            
        except Exception as e:
            return Response({"error": str(e)}, status=500)


class CityViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ShopCity.objects.all().order_by('order', 'id')
    serializer_class = CitySerializer


class ShopViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ShopOrMarket.objects.all().order_by('order', 'id')
    serializer_class = ShopSerializer

