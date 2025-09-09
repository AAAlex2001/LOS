from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import ShopsAndMarketsPageViewSet, CityViewSet, ShopViewSet


router = DefaultRouter()
router.register(r'page', ShopsAndMarketsPageViewSet)
router.register(r'cities', CityViewSet)
router.register(r'shops', ShopViewSet)


urlpatterns = [
    path('', include(router.urls)),
]



