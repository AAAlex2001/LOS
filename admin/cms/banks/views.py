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
    def banks_list(self, request):
        """
        Получить список всех банков
        """
        banks = Bank.objects.all().order_by('order', 'id')
        serializer = BankSerializer(banks, many=True)
        return Response(serializer.data)


class BankViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API для отдельных банков
    """
    queryset = Bank.objects.all().order_by('order', 'id')
    serializer_class = BankSerializer
