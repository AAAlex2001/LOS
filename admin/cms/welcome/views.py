from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import WelcomePage
from .serializers import WelcomePageSerializer


class WelcomePageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = WelcomePage.objects.all()
    serializer_class = WelcomePageSerializer

    @action(detail=False, methods=['get'])
    def content(self, request):
        page = self.get_queryset().first()
        if not page:
            # Создаем пустую, чтобы мобильное не падало
            page = WelcomePage.objects.create()
        serializer = self.get_serializer(page, context={'request': request})
        return Response(serializer.data)
