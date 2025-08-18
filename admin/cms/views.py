from rest_framework import viewsets, mixins
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.request import Request

from .models import Page, HomePage
from .serializers import PageSerializer, HomePageSerializer


class PageViewSet(mixins.ListModelMixin,
                  mixins.RetrieveModelMixin,
                  viewsets.GenericViewSet):
    queryset = Page.objects.prefetch_related("images").all()
    lookup_field = "slug"
    serializer_class = PageSerializer

    @action(detail=False, url_path="by-slug/(?P<slug>[^/]+)")
    def by_slug(self, request: Request, slug: str | None = None) -> Response:
        page = self.get_queryset().filter(slug=slug).first()
        if not page:
            return Response({"detail": "Not found"}, status=404)
        return Response(self.get_serializer(page).data)


class HomePageViewSet(viewsets.ViewSet):
    def list(self, request: Request) -> Response:
        homepage, _ = HomePage.objects.get_or_create(id=1)
        data = HomePageSerializer(homepage, context={"request": request}).data
        return Response(data)


