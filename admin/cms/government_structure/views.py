from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import GovernmentStructurePage, GovernmentBlock
from .serializers import GovernmentStructurePageSerializer, GovernmentBlockSerializer


class GovernmentStructurePageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = GovernmentStructurePage.objects.all()
    serializer_class = GovernmentStructurePageSerializer

    @action(detail=False, methods=["get"]) 
    def content(self, request):
        page = self.get_queryset().first()
        if not page:
            return Response({"blocks": []})
        return Response(self.get_serializer(page).data)


class GovernmentBlockViewSet(viewsets.ModelViewSet):
    queryset = GovernmentBlock.objects.all()
    serializer_class = GovernmentBlockSerializer



