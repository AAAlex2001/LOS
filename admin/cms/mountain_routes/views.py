from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import MountainRoutesPage
from .serializers import MountainRoutesPageSerializer


class MountainRoutesPageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = MountainRoutesPage.objects.all()
    serializer_class = MountainRoutesPageSerializer

    @action(detail=False, methods=['get'])
    def content(self, request):
        page = MountainRoutesPage.objects.first()
        if page is None:
            page = MountainRoutesPage.objects.create(
                main_title='Горные маршруты',
                section_title='Горные маршруты',
            )
        serializer = self.get_serializer(page, context={'request': request})
        return Response(serializer.data)







