from django.urls import path, include

from rest_framework.routers import DefaultRouter



from .views import PharmacyPageViewSet





router = DefaultRouter()

router.register(r'page', PharmacyPageViewSet)





urlpatterns = [

    path('', include(router.urls)),

]







