from rest_framework import viewsets

from rest_framework.decorators import action

from rest_framework.response import Response



from .models import ClothingRepairPage, ClothingRepairCity, ClothingRepair

from .serializers import ClothingRepairPageSerializer, CitySerializer, ClothingRepairSerializer





class ClothingRepairPageViewSet(viewsets.ReadOnlyModelViewSet):

    queryset = ClothingRepairPage.objects.all()

    serializer_class = ClothingRepairPageSerializer



    @action(detail=False, methods=['get'])

    def content(self, request):

        """Получить все данные страницы ремонта одежды"""

        page = self.get_queryset().first()

        if not page:

            return Response({"error": "Страница ремонта одежды не найдена"}, status=404)

        

        serializer = self.get_serializer(page)

        return Response(serializer.data)



    @action(detail=False, methods=['get'], url_path='city_page/(?P<city_name>[^/]+)')

    def city_page(self, request, city_name=None):

        """Получить данные страницы ремонта одежды для конкретного города"""

        try:

            page = self.get_queryset().first()

            if not page:

                return Response({"error": "Страница ремонта одежды не найдена"}, status=404)

            

                                  

            city = ClothingRepairCity.objects.filter(

                page=page,

                name__icontains=city_name

            ).first()

            

            if not city:

                return Response({"error": f"Город '{city_name}' не найден"}, status=404)

            

                                                  

            repairs = ClothingRepair.objects.filter(city=city).order_by('order', 'id')

            

                                 

            title = city.title or f"{city.name}: ремонт одежды и обуви"

            

            data = {

                "title": title,

                "city": CitySerializer(city).data,

                "repairs": ClothingRepairSerializer(repairs, many=True).data

            }

            

            return Response(data)

            

        except Exception as e:

            return Response({"error": str(e)}, status=500)



