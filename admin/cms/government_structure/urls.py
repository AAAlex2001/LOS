from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import GovernmentStructurePageViewSet, GovernmentBlockViewSet

router = DefaultRouter()
router.register(r'page', GovernmentStructurePageViewSet, basename='government-structure-page')
router.register(r'blocks', GovernmentBlockViewSet, basename='government-blocks')

urlpatterns = [
    path('', include(router.urls)),
]





