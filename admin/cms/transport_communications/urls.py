from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TransportCommunicationsPageViewSet

app_name = 'transport_communications'

router = DefaultRouter()
router.register(r'page', TransportCommunicationsPageViewSet)

urlpatterns = [
    path('', include(router.urls)),
]



