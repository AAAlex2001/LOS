from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import AbkhazianCuisinePageViewSet, CuisineSectionViewSet, MainDishViewSet

router = DefaultRouter()
router.register(r'page', AbkhazianCuisinePageViewSet)
router.register(r'sections', CuisineSectionViewSet)
router.register(r'dishes', MainDishViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
