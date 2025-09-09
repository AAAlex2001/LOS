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
            page = AbkhazianCustomsPage.objects.first()
            if not page:
                return Response({
                    "sections": [],
                    "hero_image_url": ""
                })
            
            serializer = AbkhazianCustomsPageSerializer(page)
            return Response(serializer.data)
        except Exception as e:
            return Response({
                "error": str(e),
                "sections": [],
                "hero_image_url": ""
            })

    @action(detail=False, methods=['get'])
    def sections(self, request):
        """
        Получить только секции контента
        """
        sections = CustomSection.objects.all().order_by('order', 'id')
        serializer = CustomSectionSerializer(sections, many=True)
        return Response(serializer.data)


class CustomSectionViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API для секций абхазских обычаев
    """
    queryset = CustomSection.objects.all().order_by('order', 'id')
    serializer_class = CustomSectionSerializer

