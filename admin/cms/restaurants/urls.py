from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import RestaurantsPageViewSet, CityViewSet, RestaurantViewSet


router = DefaultRouter()
router.register(r'page', RestaurantsPageViewSet)
router.register(r'cities', CityViewSet)
router.register(r'restaurants', RestaurantViewSet)


urlpatterns = [
    path('', include(router.urls)),
]



