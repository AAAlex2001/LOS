from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import BeachesPageViewSet, CityViewSet, BeachViewSet


router = DefaultRouter()
router.register(r'page', BeachesPageViewSet)
router.register(r'cities', CityViewSet)
router.register(r'beaches', BeachViewSet)


urlpatterns = [
    path('', include(router.urls)),
]


