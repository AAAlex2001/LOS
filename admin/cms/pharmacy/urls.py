from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import PharmacyPageViewSet, CityViewSet, PharmacyViewSet


router = DefaultRouter()
router.register(r'page', PharmacyPageViewSet)
router.register(r'cities', CityViewSet)
router.register(r'pharmacies', PharmacyViewSet)


urlpatterns = [
    path('', include(router.urls)),
]



