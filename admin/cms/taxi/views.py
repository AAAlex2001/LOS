from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import TaxiPage, TaxiService
from .serializers import TaxiPageSerializer, TaxiServiceSerializer


class TaxiPageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = TaxiPage.objects.all()
    serializer_class = TaxiPageSerializer

    @action(detail=False, methods=['get'])
    def content(self, request):
        try:
            page = TaxiPage.objects.first()
            if not page:
                return Response({
                    "services": []
                })

            serializer = TaxiPageSerializer(page)
            return Response(serializer.data)
        except Exception as e:
            return Response({
                "error": str(e),
                "services": []
            })


class TaxiServiceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = TaxiService.objects.all().order_by('order', 'id')
    serializer_class = TaxiServiceSerializer


