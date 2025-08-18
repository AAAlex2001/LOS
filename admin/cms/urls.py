from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import PageViewSet, HomePageViewSet


router = DefaultRouter()
router.register(r"pages", PageViewSet, basename="page")
router.register(r"home", HomePageViewSet, basename="home")

urlpatterns = [
    path("", include(router.urls)),
]


