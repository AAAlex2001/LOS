from rest_framework import viewsets

from rest_framework.decorators import action

from rest_framework.response import Response



from .models import HomePage

from .serializers import HomePageSerializer





class HomePageViewSet(viewsets.ReadOnlyModelViewSet):

    queryset = HomePage.objects.all()

    serializer_class = HomePageSerializer



    @action(detail=False, methods=['get'])

    def content(self, request):

        """Получить все данные главной страницы"""

        try:

            homepage = self.get_queryset().first()

            if not homepage:

                homepage = HomePage.objects.create(id=1)

            

            serializer = self.get_serializer(homepage)

            return Response(serializer.data)

            

        except Exception as e:

            return Response({"error": str(e)}, status=500)





