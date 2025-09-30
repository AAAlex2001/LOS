from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PartiesPageViewSet

app_name = 'parties'

router = DefaultRouter()
router.register(r'page', PartiesPageViewSet)

urlpatterns = [
    path('', include(router.urls)),
]


