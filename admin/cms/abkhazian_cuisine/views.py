from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import AbkhazianCuisinePage, CuisineSection, MainDish
from .serializers import AbkhazianCuisinePageSerializer, CuisineSectionSerializer, MainDishSerializer


class AbkhazianCuisinePageViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API для страницы абхазской кухни
    """
    queryset = AbkhazianCuisinePage.objects.all()
    serializer_class = AbkhazianCuisinePageSerializer

    @action(detail=False, methods=['get'])
    def content(self, request):
        """
        Получить полное содержимое страницы абхазской кухни
        """
        try:
            page = AbkhazianCuisinePage.objects.first()
            if not page:
                return Response({
                    "sections": [],
                    "main_dishes": [],
                    "hero_image_url": ""
                })
            
            serializer = AbkhazianCuisinePageSerializer(page)
            return Response(serializer.data)
        except Exception as e:
            return Response({
                "error": str(e),
                "sections": [],
                "main_dishes": [],
                "hero_image_url": ""
            })

    @action(detail=False, methods=['get'])
    def sections(self, request):
        """
        Получить только секции контента
        """
        sections = CuisineSection.objects.all().order_by('order', 'id')
        serializer = CuisineSectionSerializer(sections, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def main_dishes(self, request):
        """
        Получить только основные блюда
        """
        dishes = MainDish.objects.all().order_by('order', 'id')
        serializer = MainDishSerializer(dishes, many=True)
        return Response(serializer.data)


class CuisineSectionViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API для секций абхазской кухни
    """
    queryset = CuisineSection.objects.all().order_by('order', 'id')
    serializer_class = CuisineSectionSerializer


class MainDishViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API для основных блюд абхазской кухни
    """
    queryset = MainDish.objects.all().order_by('order', 'id')
    serializer_class = MainDishSerializer
