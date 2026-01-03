from django.urls import path, include

from rest_framework.routers import DefaultRouter



from .views import ParkingLotsPageViewSet





router = DefaultRouter()

router.register(r'page', ParkingLotsPageViewSet)





urlpatterns = [

    path('', include(router.urls)),

]







