from django.urls import path, include

from rest_framework.routers import DefaultRouter



from .views import BanksPageViewSet



router = DefaultRouter()

router.register(r'page', BanksPageViewSet)



urlpatterns = [

    path('', include(router.urls)),

]

