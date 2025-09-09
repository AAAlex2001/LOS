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
        """Получить все данные страницы врачей"""
        try:
            page = self.get_queryset().first()
            if not page:
                return Response({"error": "Страница врачей не найдена"}, status=404)
            
            serializer = self.get_serializer(page)
            return Response(serializer.data)
            
        except Exception as e:
            return Response({"error": str(e)}, status=500)


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




