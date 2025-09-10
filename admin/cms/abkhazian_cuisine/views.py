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
            page = self.get_queryset().first()
            if not page:
                return Response({"error": "Страница абхазской кухни не найдена"}, status=404)
            
            serializer = self.get_serializer(page)
            return Response(serializer.data)
            
        except Exception as e:
            return Response({"error": str(e)}, status=500)

    @action(detail=False, methods=['get'])
    def sections(self, request):
        """
        Получить только секции контента
        """
        try:
            sections = CuisineSection.objects.all().order_by('order', 'id')
            serializer = CuisineSectionSerializer(sections, many=True)
            return Response(serializer.data)
            
        except Exception as e:
            return Response({"error": str(e)}, status=500)

    @action(detail=False, methods=['get'])
    def main_dishes(self, request):
        """
        Получить только основные блюда
        """
        try:
            dishes = MainDish.objects.all().order_by('order', 'id')
            serializer = MainDishSerializer(dishes, many=True)
            return Response(serializer.data)
            
        except Exception as e:
            return Response({"error": str(e)}, status=500)