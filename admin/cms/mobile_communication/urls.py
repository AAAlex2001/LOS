from django.urls import path, include

from rest_framework.routers import DefaultRouter

from .views import MobileCommunicationPageViewSet



app_name = 'mobile_communication'



router = DefaultRouter()

router.register(r'page', MobileCommunicationPageViewSet)



urlpatterns = [

    path('', include(router.urls)),

]

