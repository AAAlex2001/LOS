from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import (
    YourDoctorPage,
    Hospital,
    PrivateClinic,
    Dentistry,
    VetClinic,
    DoctorsGroup,
)
from .serializers import (
    YourDoctorPageSerializer,
    HospitalSerializer,
    PrivateClinicSerializer,
    DentistrySerializer,
    VetClinicSerializer,
    DoctorsGroupSerializer,
)


class YourDoctorPageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = YourDoctorPage.objects.all()
    serializer_class = YourDoctorPageSerializer

    @action(detail=False, methods=['get'])
    def content(self, request):
        try:
            page = YourDoctorPage.objects.first()
            if not page:
                return Response({
                    "hospitals": [],
                    "private_clinics": [],
                    "dentistries": [],
                    "vet_clinics": [],
                    "doctors_groups": [],
                })

            serializer = YourDoctorPageSerializer(page)
            return Response(serializer.data)
        except Exception as e:
            return Response({
                "error": str(e),
                "hospitals": [],
                "private_clinics": [],
                "dentistries": [],
                "vet_clinics": [],
                "doctors_groups": [],
            })


class HospitalViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Hospital.objects.all().order_by('order', 'id')
    serializer_class = HospitalSerializer


class PrivateClinicViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = PrivateClinic.objects.all().order_by('order', 'id')
    serializer_class = PrivateClinicSerializer


class DentistryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Dentistry.objects.all().order_by('order', 'id')
    serializer_class = DentistrySerializer


class VetClinicViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = VetClinic.objects.all().order_by('order', 'id')
    serializer_class = VetClinicSerializer


class DoctorsGroupViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = DoctorsGroup.objects.all().order_by('order', 'id')
    serializer_class = DoctorsGroupSerializer



