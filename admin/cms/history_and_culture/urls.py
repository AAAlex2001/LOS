from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import HistoryAndCulturePageViewSet

router = DefaultRouter()
router.register(r'page', HistoryAndCulturePageViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
