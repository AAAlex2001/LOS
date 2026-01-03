from rest_framework import viewsets

from rest_framework.decorators import action

from rest_framework.response import Response



from .models import ElementaryDictionaryPage, DictionaryCategory, DictionaryWord

from .serializers import ElementaryDictionaryPageSerializer, DictionaryCategorySerializer, DictionaryWordSerializer





class ElementaryDictionaryPageViewSet(viewsets.ReadOnlyModelViewSet):

    """
    API для страницы элементарного словаря
    """

    queryset = ElementaryDictionaryPage.objects.all()

    serializer_class = ElementaryDictionaryPageSerializer



    @action(detail=False, methods=['get'])

    def content(self, request):

        """Получить все данные страницы элементарного словаря"""

        try:

            page = self.get_queryset().first()

            if not page:

                return Response({"error": "Страница элементарного словаря не найдена"}, status=404)

            

            serializer = self.get_serializer(page)

            return Response(serializer.data)

            

        except Exception as e:

            return Response({"error": str(e)}, status=500)





class DictionaryCategoryViewSet(viewsets.ModelViewSet):

    """
    API для категорий словаря
    """

    queryset = DictionaryCategory.objects.all()

    serializer_class = DictionaryCategorySerializer





class DictionaryWordViewSet(viewsets.ModelViewSet):

    """
    API для слов/фраз словаря
    """

    queryset = DictionaryWord.objects.all()

    serializer_class = DictionaryWordSerializer



















