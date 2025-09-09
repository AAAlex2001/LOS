from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BeautySalonsPageViewSet

router = DefaultRouter()
router.register(r'page', BeautySalonsPageViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
