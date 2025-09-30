from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import HotSpringsPage, HotSpring
from .serializers import HotSpringsPageSerializer, HotSpringSerializer


class HotSpringsPageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = HotSpringsPage.objects.all()
    serializer_class = HotSpringsPageSerializer

    @action(detail=False, methods=["get"]) 
    def content(self, request):
        page = self.get_queryset().first()
        if not page:
            return Response({"springs": []})
        return Response(self.get_serializer(page).data)


class HotSpringViewSet(viewsets.ModelViewSet):
    queryset = HotSpring.objects.all()
    serializer_class = HotSpringSerializer






