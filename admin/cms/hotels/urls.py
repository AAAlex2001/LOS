from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import HotelsPageViewSet, CityViewSet, HotelViewSet


router = DefaultRouter()
router.register(r'page', HotelsPageViewSet)
router.register(r'cities', CityViewSet)
router.register(r'hotels', HotelViewSet)


urlpatterns = [
    path('', include(router.urls)),
]



