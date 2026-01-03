from django.urls import path, include

from rest_framework.routers import DefaultRouter



from .views import AdBannerViewSet





router = DefaultRouter()

router.register(r'', AdBannerViewSet)





urlpatterns = [

    path('', include(router.urls)),

]



