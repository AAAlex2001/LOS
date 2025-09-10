from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import RestaurantsPageViewSet


router = DefaultRouter()
router.register(r'page', RestaurantsPageViewSet)


urlpatterns = [
    path('', include(router.urls)),
]



