from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import HotSpringsPageViewSet, HotSpringViewSet

router = DefaultRouter()
router.register(r'page', HotSpringsPageViewSet, basename='hot-springs-page')
router.register(r'springs', HotSpringViewSet, basename='hot-springs')

urlpatterns = [
    path('', include(router.urls)),
]



