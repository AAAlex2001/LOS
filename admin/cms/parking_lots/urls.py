from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import ParkingLotsPageViewSet, CityViewSet, ParkingLotViewSet


router = DefaultRouter()
router.register(r'page', ParkingLotsPageViewSet)
router.register(r'cities', CityViewSet)
router.register(r'parking-lots', ParkingLotViewSet)


urlpatterns = [
    path('', include(router.urls)),
]



