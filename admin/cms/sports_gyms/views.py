from rest_framework import viewsets

from rest_framework.decorators import action

from rest_framework.response import Response



from .models import SportsGymsPage, SportsGym

from .serializers import SportsGymsPageSerializer, SportsGymSerializer





class SportsGymsPageViewSet(viewsets.ReadOnlyModelViewSet):

    queryset = SportsGymsPage.objects.all()

    serializer_class = SportsGymsPageSerializer



    @action(detail=False, methods=['get'])

    def content(self, request):

        """Получить все данные страницы спортивных залов"""

        try:

            page = self.get_queryset().first()

            if not page:

                return Response({"error": "Страница спортивных залов не найдена"}, status=404)

            

            serializer = self.get_serializer(page)

            return Response(serializer.data)

            

        except Exception as e:

            return Response({"error": str(e)}, status=500)



