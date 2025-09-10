from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import BeachesPageViewSet


router = DefaultRouter()
router.register(r'page', BeachesPageViewSet)


urlpatterns = [
    path('', include(router.urls)),
]




