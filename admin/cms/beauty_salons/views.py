from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import BeautySalonsPage, BeautySalonCity, BeautySalon
from .serializers import BeautySalonsPageSerializer, CitySerializer, BeautySalonSerializer


class BeautySalonsPageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = BeautySalonsPage.objects.all()
    serializer_class = BeautySalonsPageSerializer

    @action(detail=False, methods=['get'])
    def content(self, request):
        """Получить все данные страницы салонов красоты"""
        page = self.get_queryset().first()
        if not page:
            return Response({"cities": [], "beauty_salons": []})
        serializer = self.get_serializer(page)
        return Response(serializer.data)

    @action(detail=False, methods=['get'], url_path='city/(?P<city_name>[^/]+)')
    def city_page(self, request, city_name=None):
        """Получить данные страницы салона красоты для конкретного города"""
        page = self.get_queryset().first()
        if not page:
            return Response({"title": "", "beauty_salons": []})
        city = BeautySalonCity.objects.filter(page=page, name__iexact=city_name).first()
        if not city:
            return Response({"title": "", "beauty_salons": []})
        beauty_salons = BeautySalon.objects.filter(city=city).order_by('order', 'id')
        title = city.title or f"{city.name}: салоны красоты"
        data = {
            "title": title,
            "city": CitySerializer(city).data,
            "beauty_salons": BeautySalonSerializer(beauty_salons, many=True).data
        }
        return Response(data)
