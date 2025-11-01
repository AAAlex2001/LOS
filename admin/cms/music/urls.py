from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MusicPageViewSet, MusicTrackViewSet

app_name = 'music'

router = DefaultRouter()
router.register(r'page', MusicPageViewSet)
router.register(r'tracks', MusicTrackViewSet)

urlpatterns = [
    path('', include(router.urls)),
]

