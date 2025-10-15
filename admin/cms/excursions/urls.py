from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ExcursionsPageViewSet, ExcursionServiceViewSet

router = DefaultRouter()
router.register(r'page', ExcursionsPageViewSet, basename='excursions-page')
router.register(r'services', ExcursionServiceViewSet, basename='excursion-services')

urlpatterns = [
    path('', include(router.urls)),
]











