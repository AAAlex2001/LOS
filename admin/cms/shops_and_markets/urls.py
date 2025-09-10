from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import ShopsAndMarketsPageViewSet


router = DefaultRouter()
router.register(r'page', ShopsAndMarketsPageViewSet)


urlpatterns = [
    path('', include(router.urls)),
]



