from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import AbkhazianCustomsPageViewSet, CustomSectionViewSet

router = DefaultRouter()
router.register(r'page', AbkhazianCustomsPageViewSet)
router.register(r'sections', CustomSectionViewSet)

urlpatterns = [
    path('', include(router.urls)),
]

