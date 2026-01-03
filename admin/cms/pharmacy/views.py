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

        """Получить все данные страницы аптек"""

        try:

            page = self.get_queryset().first()

            if not page:

                return Response({"error": "Страница аптек не найдена"}, status=404)

            

            serializer = self.get_serializer(page)

            return Response(serializer.data)

            

        except Exception as e:

            return Response({"error": str(e)}, status=500)



    @action(detail=False, methods=['get'], url_path='city_page/(?P<city_name>[^/]+)')

    def city_page(self, request, city_name=None):

        """Получить данные страницы аптек для конкретного города"""

        try:

            page = self.get_queryset().first()

            if not page:

                return Response({"error": "Страница аптек не найдена"}, status=404)

            

                                  

            city = PharmacyCity.objects.filter(

                page=page,

                name__icontains=city_name

            ).first()

            

            if not city:

                return Response({"error": f"Город '{city_name}' не найден"}, status=404)

            

                                              

            pharmacies = PharmacyItem.objects.filter(city=city).order_by('order', 'id')

            

                                 

            title = city.title or f"{city.name}: аптеки"

            

            data = {

                "title": title,

                "city": CitySerializer(city).data,

                "pharmacies": PharmacySerializer(pharmacies, many=True).data

            }

            

            return Response(data)

            

        except Exception as e:

            return Response({"error": str(e)}, status=500)



