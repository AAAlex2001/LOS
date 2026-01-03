from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import ImportantPage
from .serializers import ImportantPageSerializer


class ImportantPageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ImportantPage.objects.all()
    serializer_class = ImportantPageSerializer
    
    @action(detail=False, methods=['get'])
    def content(self, request):
        """Получить контент страницы"""
        page = ImportantPage.objects.order_by('-updated_at', '-id').first()
        if not page:
            return Response({'error': 'Страница не найдена'}, status=404)
        
        serializer = self.get_serializer(page)
        return Response(serializer.data)









