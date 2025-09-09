from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import HomePage
from .serializers import HomePageSerializer


class HomePageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = HomePage.objects.all()
    serializer_class = HomePageSerializer

    @action(detail=False, methods=['get'])
    def content(self, request):
        homepage = HomePage.objects.first()
        if not homepage:
            homepage = HomePage.objects.create(id=1)
        serializer = HomePageSerializer(homepage)
        return Response(serializer.data)

