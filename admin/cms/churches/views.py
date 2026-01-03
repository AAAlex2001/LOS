from rest_framework import viewsets

from rest_framework.decorators import action

from rest_framework.response import Response



from .models import ChurchesPage, ChurchCity, Church

from .serializers import ChurchesPageSerializer, CitySerializer, ChurchSerializer





class ChurchesPageViewSet(viewsets.ReadOnlyModelViewSet):

    queryset = ChurchesPage.objects.all()

    serializer_class = ChurchesPageSerializer



    @action(detail=False, methods=['get'])

    def content(self, request):

        """Получить все данные страницы церквей"""

        page = self.get_queryset().first()

        if not page:

            return Response({"cities": [], "churches": []})

        serializer = self.get_serializer(page)

        return Response(serializer.data)



    @action(detail=False, methods=['get'], url_path='city_page/(?P<city_name>[^/]+)')

    def city_page(self, request, city_name=None):

        """Получить данные страницы церквей для конкретного города"""

        page = self.get_queryset().first()

        if not page:

            return Response({"title": "", "churches": []})

        city = ChurchCity.objects.filter(page=page, name__iexact=city_name).first()

        if not city:

            return Response({"error": f"Город '{city_name}' не найден"}, status=404)

        churches = Church.objects.filter(city=city).order_by('order', 'id')

        title = city.title or f"{city.name}: церкви и храмы"

        data = {

            "title": title,

            "city": CitySerializer(city).data,

            "churches": ChurchSerializer(churches, many=True).data

        }

        return Response(data)



