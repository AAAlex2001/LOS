from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import BanksPageViewSet, BankViewSet

router = DefaultRouter()
router.register(r'page', BanksPageViewSet)
router.register(r'list', BankViewSet)  # backward compatibility for /api/banks/list/

urlpatterns = [
    path('', include(router.urls)),
]
