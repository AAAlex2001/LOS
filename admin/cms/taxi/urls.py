from django.urls import path, include

from rest_framework.routers import DefaultRouter



from .views import TaxiPageViewSet





router = DefaultRouter()

router.register(r'page', TaxiPageViewSet)





urlpatterns = [

    path('', include(router.urls)),

]









