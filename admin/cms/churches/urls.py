from django.urls import path, include

from rest_framework.routers import DefaultRouter

from .views import ChurchesPageViewSet



router = DefaultRouter()

router.register(r'page', ChurchesPageViewSet)



urlpatterns = [

    path('', include(router.urls)),

]



