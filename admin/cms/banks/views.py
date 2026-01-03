from rest_framework import viewsets

from rest_framework.decorators import action

from rest_framework.response import Response



from .models import BanksPage, Bank

from .serializers import BanksPageSerializer, BankSerializer





class BanksPageViewSet(viewsets.ReadOnlyModelViewSet):

    """
    API для страницы банков
    """

    queryset = BanksPage.objects.all()

    serializer_class = BanksPageSerializer



    @action(detail=False, methods=['get'])

    def content(self, request):

        """Получить все данные страницы банков"""

        try:

            page = self.get_queryset().first()

            if not page:

                return Response({"error": "Страница банков не найдена"}, status=404)

            

            serializer = self.get_serializer(page)

            return Response(serializer.data)

            

        except Exception as e:

            return Response({"error": str(e)}, status=500)
