from rest_framework import viewsets

from rest_framework.decorators import action

from rest_framework.response import Response



from .models import CitiesPage, City

from .serializers import CitiesPageSerializer, CitySerializer





class CitiesPageViewSet(viewsets.ReadOnlyModelViewSet):

    queryset = CitiesPage.objects.all()

    serializer_class = CitiesPageSerializer



    @action(detail=False, methods=['get'])

    def content(self, request):

        """Получить все данные страницы городов"""

        try:

            page = self.get_queryset().first()

            if not page:

                return Response({"error": "Страница городов не найдена"}, status=404)

            

            serializer = self.get_serializer(page)

            return Response(serializer.data)

            

        except Exception as e:

            return Response({"error": str(e)}, status=500)



    @action(detail=False, methods=['get'], url_path='city_page/(?P<city_name>[^/]+)/?')

    def city_page(self, request, city_name=None):

        """Получить данные страницы конкретного города"""

        try:

            page = self.get_queryset().first()

            if not page:

                return Response({"error": "Страница городов не найдена"}, status=404)

            

            from urllib.parse import unquote

            city_name = unquote(city_name) if city_name else None

            

            city = City.objects.filter(

                page=page,

                name__iexact=city_name

            ).first()

            

            if not city:

                return Response({"error": f"Город '{city_name}' не найден"}, status=404)

            

                                 

            title = city.title or city.name

            

                                                    

            page_data = self.get_serializer(page).data

            

            data = {

                "title": title,

                **page_data,                                    

                "city": CitySerializer(city).data

            }

            

            return Response(data)

            

        except Exception as e:

            return Response({"error": str(e)}, status=500)

