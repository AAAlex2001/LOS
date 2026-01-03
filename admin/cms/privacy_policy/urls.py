from django.urls import path

from rest_framework.routers import DefaultRouter

from .views import PrivacyPolicyPageViewSet, AccessibilityAndTermsPageViewSet



router = DefaultRouter()

router.register(r'privacy-policy', PrivacyPolicyPageViewSet, basename='privacy-policy')

router.register(r'accessibility-and-terms', AccessibilityAndTermsPageViewSet, basename='accessibility-and-terms')



urlpatterns = router.urls



