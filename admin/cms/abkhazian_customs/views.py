from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import AbkhazianCustomsPage, CustomSection
from .serializers import AbkhazianCustomsPageSerializer, CustomSectionSerializer


class AbkhazianCustomsPageViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API для страницы абхазских обычаев
    """
    queryset = AbkhazianCustomsPage.objects.all()
    serializer_class = AbkhazianCustomsPageSerializer

    @action(detail=False, methods=['get'])
    def content(self, request):
        """
        Получить полное содержимое страницы абхазских обычаев
        """
        try:
            page = AbkhazianCustomsPage.objects.order_by('-updated_at', '-id').first()
            if not page:
                return Response({"error": "Страница абхазских обычаев не найдена"}, status=404)
            
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
            sections = CustomSection.objects.all().order_by('order', 'id')
            serializer = CustomSectionSerializer(sections, many=True)
            return Response(serializer.data)
            
        except Exception as e:
            return Response({"error": str(e)}, status=500)


class CustomSectionViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API для секций абхазских обычаев
    """
    queryset = CustomSection.objects.all().order_by('order', 'id')
    serializer_class = CustomSectionSerializer


