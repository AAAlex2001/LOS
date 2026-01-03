from django.urls import path, include

from rest_framework.routers import DefaultRouter

from .views import ElementaryDictionaryPageViewSet, DictionaryCategoryViewSet, DictionaryWordViewSet



router = DefaultRouter()

router.register(r'page', ElementaryDictionaryPageViewSet, basename='elementary-dictionary-page')

router.register(r'categories', DictionaryCategoryViewSet, basename='dictionary-categories')

router.register(r'words', DictionaryWordViewSet, basename='dictionary-words')



urlpatterns = [

    path('', include(router.urls)),

]

