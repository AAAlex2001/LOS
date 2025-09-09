from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import WineriesPageViewSet, CityViewSet, WineryViewSet


router = DefaultRouter()
router.register(r'page', WineriesPageViewSet)
router.register(r'cities', CityViewSet)
router.register(r'wineries', WineryViewSet)


urlpatterns = [
    path('', include(router.urls)),
]



