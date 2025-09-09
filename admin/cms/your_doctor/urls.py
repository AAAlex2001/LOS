from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
    YourDoctorPageViewSet,
    HospitalViewSet,
    PrivateClinicViewSet,
    DentistryViewSet,
    VetClinicViewSet,
    DoctorsGroupViewSet,
)


router = DefaultRouter()
router.register(r'page', YourDoctorPageViewSet)
router.register(r'hospitals', HospitalViewSet)
router.register(r'private-clinics', PrivateClinicViewSet)
router.register(r'dentistry', DentistryViewSet)
router.register(r'vet-clinics', VetClinicViewSet)
router.register(r'doctors-groups', DoctorsGroupViewSet)


urlpatterns = [
    path('', include(router.urls)),
]




