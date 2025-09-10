from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import AdministrativeBuildingsPageViewSet


router = DefaultRouter()
router.register(r'page', AdministrativeBuildingsPageViewSet)


urlpatterns = [
    path('', include(router.urls)),
]




