from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.request import Request

from .models import HomePage
from .serializers import HomePageSerializer


class HomePageViewSet(viewsets.ViewSet):
    def list(self, request: Request) -> Response:
        homepage, _ = HomePage.objects.get_or_create(id=1)
        data = HomePageSerializer(homepage, context={"request": request}).data
        return Response(data)
