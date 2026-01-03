from rest_framework import viewsets

from rest_framework.decorators import action

from rest_framework.response import Response

from .models import PartiesPage

from .serializers import PartiesPageSerializer





class PartiesPageViewSet(viewsets.ReadOnlyModelViewSet):

    queryset = PartiesPage.objects.all()

    serializer_class = PartiesPageSerializer



    @action(detail=False, methods=['get'])

    def content(self, request):

        page = PartiesPage.objects.order_by('-updated_at', '-id').first()

        if page is None:

            page = PartiesPage.objects.create(

                main_title='Вечеринки и яркие впечатления',

                intro_text='<strong>Абхазия зажигает огни!</strong>\n\nОт атмосферных винодельческих вечеров с дегустациями местных вин до зажигательных пляжных вечеринок под открытым небом — здесь каждый найдёт свой идеальный вечер.\n\nГотовы окунуться в атмосферу беззаботного отдыха? Выбирайте событие по настроению — и вперёд за впечатлениями!'

            )

        serializer = self.get_serializer(page, context={'request': request})

        return Response(serializer.data)

