from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import GasStationsPageViewSet, CityViewSet, GasStationViewSet


router = DefaultRouter()
router.register(r'page', GasStationsPageViewSet)
router.register(r'cities', CityViewSet)
router.register(r'gas-stations', GasStationViewSet)


urlpatterns = [
    path('', include(router.urls)),
]



