from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Footer
from .serializers import FooterSerializer


class FooterViewSet(viewsets.ModelViewSet):
    queryset = Footer.objects.all()
    serializer_class = FooterSerializer

    @action(detail=False, methods=['get'])
    def footer_data(self, request):
        """Возвращает данные футера"""
        footer = self.queryset.first()
        if not footer:
            return Response({'detail': 'Футер не настроен'}, status=404)
        
        serializer = self.get_serializer(footer, context={'request': request})
        return Response(serializer.data)


