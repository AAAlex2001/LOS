from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CarWashesPageViewSet

router = DefaultRouter()
router.register(r'page', CarWashesPageViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
