from django.urls import path, include

from rest_framework.routers import DefaultRouter

from .views import MountainRoutesPageViewSet



app_name = 'mountain_routes'



router = DefaultRouter()

router.register(r'page', MountainRoutesPageViewSet)



urlpatterns = [

    path('', include(router.urls)),

]





















