from django.urls import path, include

from rest_framework.routers import DefaultRouter



from .views import HotelsPageViewSet





router = DefaultRouter()

router.register(r'page', HotelsPageViewSet)





urlpatterns = [

    path('', include(router.urls)),

]







