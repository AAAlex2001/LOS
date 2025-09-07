from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import TaxiPageViewSet, TaxiServiceViewSet


router = DefaultRouter()
router.register(r'page', TaxiPageViewSet)
router.register(r'services', TaxiServiceViewSet)


urlpatterns = [
    path('', include(router.urls)),
]


