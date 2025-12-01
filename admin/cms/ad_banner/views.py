from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import AdBanner
from .serializers import AdBannerSerializer


class AdBannerViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = AdBanner.objects.all()
    serializer_class = AdBannerSerializer

    @action(detail=False, methods=['get'])
    def content(self, request):
        active_banners = self.get_queryset().filter(is_active=True)
        if not active_banners.exists():
            return Response({})
        # Выбираем случайный баннер из активных
        banner = active_banners.order_by('?').first()
        serializer = self.get_serializer(banner, context={'request': request})
        return Response(serializer.data)

