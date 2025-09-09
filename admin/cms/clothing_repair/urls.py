from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ClothingRepairPageViewSet

router = DefaultRouter()
router.register(r'page', ClothingRepairPageViewSet)

urlpatterns = [
    path('', include(router.urls)),
]

