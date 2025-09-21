from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ImportantPageViewSet

router = DefaultRouter()
router.register(r'page', ImportantPageViewSet)

urlpatterns = [
    path('', include(router.urls)),
]

