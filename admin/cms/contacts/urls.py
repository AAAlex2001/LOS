from django.urls import path, include

from rest_framework.routers import DefaultRouter

from .views import ContactsPageViewSet



router = DefaultRouter()

router.register(r'page', ContactsPageViewSet)



urlpatterns = [

    path('', include(router.urls)),

]



