from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import BanksPageViewSet, BankViewSet

router = DefaultRouter()
router.register(r'page', BanksPageViewSet)
router.register(r'banks', BankViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
