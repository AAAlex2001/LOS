from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import HistoryAndCulturePageViewSet, HistorySectionViewSet, CultureSectionViewSet

router = DefaultRouter()
router.register(r'page', HistoryAndCulturePageViewSet)
router.register(r'history-sections', HistorySectionViewSet)
router.register(r'culture-sections', CultureSectionViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
