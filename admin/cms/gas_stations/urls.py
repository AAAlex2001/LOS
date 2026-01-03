from django.urls import path, include

from rest_framework.routers import DefaultRouter



from .views import GasStationsPageViewSet





router = DefaultRouter()

router.register(r'page', GasStationsPageViewSet)





urlpatterns = [

    path('', include(router.urls)),

]







