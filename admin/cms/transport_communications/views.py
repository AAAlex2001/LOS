from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import TransportCommunicationsPage
from .serializers import TransportCommunicationsPageSerializer


class TransportCommunicationsPageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = TransportCommunicationsPage.objects.all()
    serializer_class = TransportCommunicationsPageSerializer

    @action(detail=False, methods=['get'])
    def content(self, request):
        page = TransportCommunicationsPage.objects.first()
        if page is None:
            page = TransportCommunicationsPage.objects.create(
                main_title='Транспортное сообщение республики Абхазия',
            )
        serializer = self.get_serializer(page, context={'request': request})
        return Response(serializer.data)





