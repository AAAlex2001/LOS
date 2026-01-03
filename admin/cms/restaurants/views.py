from rest_framework import viewsets

from rest_framework.decorators import action

from rest_framework.response import Response



from .models import RestaurantsPage, RestaurantCity, Restaurant

from .serializers import RestaurantsPageSerializer, CitySerializer, RestaurantSerializer





class RestaurantsPageViewSet(viewsets.ReadOnlyModelViewSet):

    queryset = RestaurantsPage.objects.all()

    serializer_class = RestaurantsPageSerializer



    @action(detail=False, methods=['get'])

    def content(self, request):

        """Получить все данные страницы ресторанов"""

        try:

            page = self.get_queryset().first()

            if not page:

                return Response({"error": "Страница ресторанов не найдена"}, status=404)

            

            serializer = self.get_serializer(page)

            return Response(serializer.data)

            

        except Exception as e:

            return Response({"error": str(e)}, status=500)



    @action(detail=False, methods=['get'], url_path='city_page/(?P<city_name>[^/]+)')

    def city_page(self, request, city_name=None):

        """Получить данные страницы ресторанов для конкретного города"""

        try:

            page = self.get_queryset().first()

            if not page:

                return Response({"error": "Страница ресторанов не найдена"}, status=404)

            

                                  

            city = RestaurantCity.objects.filter(

                page=page,

                name__icontains=city_name

            ).first()

            

            if not city:

                return Response({"error": f"Город '{city_name}' не найден"}, status=404)

            

                                                 

            restaurants = Restaurant.objects.filter(city=city).order_by('order', 'id')

            

                                 

            title = city.title or f"{city.name}: рестораны"

            

            data = {

                "title": title,

                "city": CitySerializer(city).data,

                "restaurants": RestaurantSerializer(restaurants, many=True).data

            }

            

            return Response(data)

            

        except Exception as e:

            return Response({"error": str(e)}, status=500)



