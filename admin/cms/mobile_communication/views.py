from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import MobileCommunicationPage
from .serializers import MobileCommunicationPageSerializer


class MobileCommunicationPageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = MobileCommunicationPage.objects.all()
    serializer_class = MobileCommunicationPageSerializer

    @action(detail=False, methods=["get"])
    def content(self, request):
        """Вернуть контент страницы 'Мобильная связь'"""
        page = MobileCommunicationPage.objects.first()
        if page is None:
            # Создаем запись по умолчанию, чтобы админам было проще стартовать
            page = MobileCommunicationPage.objects.create(
                main_title="Интернет и мобильная связь",
                intro_text=(
                    "Интернет и мобильная связь, которым можно доверять.\n\n"
                    "Сравните и подключайтесь — все провайдеры здесь!"
                ),
                mobile_section_title="Мобильная связь",
                internet_section_title="Интернет",
            )
        serializer = self.get_serializer(page, context={"request": request})
        return Response(serializer.data)
