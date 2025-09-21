from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import ExcursionsPage, ExcursionService
from .serializers import ExcursionsPageSerializer, ExcursionServiceSerializer


class ExcursionsPageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ExcursionsPage.objects.all()
    serializer_class = ExcursionsPageSerializer

    @action(detail=False, methods=["get"]) 
    def content(self, request):
        page = self.get_queryset().first()
        if not page:
            return Response({"services": []})
        return Response(self.get_serializer(page).data)


class ExcursionServiceViewSet(viewsets.ModelViewSet):
    queryset = ExcursionService.objects.all()
    serializer_class = ExcursionServiceSerializer




