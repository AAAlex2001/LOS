from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CulturalAttractionsPageViewSet

router = DefaultRouter()
router.register(r'page', CulturalAttractionsPageViewSet)

urlpatterns = [
    path('', include(router.urls)),
]

