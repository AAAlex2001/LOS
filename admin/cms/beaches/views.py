from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import BeachesPage, BeachCity, Beach
from .serializers import BeachesPageSerializer, CitySerializer, BeachSerializer


class BeachesPageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = BeachesPage.objects.all()
    serializer_class = BeachesPageSerializer

    @action(detail=False, methods=['get'])
    def content(self, request):
        try:
            page = BeachesPage.objects.first()
            if not page:
                return Response({"cities": [], "beaches": []})
            serializer = BeachesPageSerializer(page)
            return Response(serializer.data)
        except Exception as e:
            return Response({"error": str(e), "cities": [], "beaches": []})

    @action(detail=False, methods=['get'], url_path='city/(?P<name>[^/]+)')
    def city(self, request, name=None):
        try:
            page = BeachesPage.objects.first()
            city = BeachCity.objects.filter(name__iexact=name).first()
            if not page or not city:
                return Response({"title": "", "beaches": []})
            beaches = Beach.objects.filter(city=city).order_by('order', 'id')
            return Response({
                "title": city.title or city.name,
                "city": {"id": city.id, "name": city.name, "title": city.title, "order": city.order},
                "beaches": BeachSerializer(beaches, many=True).data,
            })
        except Exception as e:
            return Response({"error": str(e), "title": "", "beaches": []})


class CityViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = BeachCity.objects.all().order_by('order', 'id')
    serializer_class = CitySerializer


class BeachViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Beach.objects.all().order_by('order', 'id')
    serializer_class = BeachSerializer


