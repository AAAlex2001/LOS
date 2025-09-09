from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import AdministrativeBuildingsPageViewSet, CityViewSet, AdministrativeBuildingViewSet


router = DefaultRouter()
router.register(r'page', AdministrativeBuildingsPageViewSet)
router.register(r'cities', CityViewSet)
router.register(r'buildings', AdministrativeBuildingViewSet)


urlpatterns = [
    path('', include(router.urls)),
]




