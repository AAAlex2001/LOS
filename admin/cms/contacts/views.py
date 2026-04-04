from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import ContactsPage
from .serializers import ContactsPageSerializer


class ContactsPageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ContactsPage.objects.all()
    serializer_class = ContactsPageSerializer

    @action(detail=False, methods=["get"])
    def content(self, request):
        page = self.get_queryset().first()
        if not page:
            return Response({"error": "Страница контактов не найдена"}, status=404)
        serializer = self.get_serializer(page)
        return Response(serializer.data)
