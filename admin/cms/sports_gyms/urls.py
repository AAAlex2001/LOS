from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import SportsGymsPageViewSet


router = DefaultRouter()
router.register(r'page', SportsGymsPageViewSet)


urlpatterns = [
    path('', include(router.urls)),
]





