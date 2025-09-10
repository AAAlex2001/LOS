from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import AbkhazianCuisinePageViewSet

router = DefaultRouter()
router.register(r'page', AbkhazianCuisinePageViewSet)

urlpatterns = [
    path('', include(router.urls)),
]


