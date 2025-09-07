from django.contrib import admin

from .models import (
    YourDoctorPage,
    Hospital,
    PrivateClinic,
    Dentistry,
    VetClinic,
    DoctorsGroup,
)


class HospitalInline(admin.TabularInline):
    model = Hospital
    extra = 0
    fields = ("name", "name_link", "working_hours", "address", "address_link", "contacts", "image", "order")
    ordering = ("order", "id")


class PrivateClinicInline(admin.TabularInline):
    model = PrivateClinic
    extra = 0
    fields = ("name", "name_link", "working_hours", "address", "address_link", "contacts", "image", "order")
    ordering = ("order", "id")


class DentistryInline(admin.TabularInline):
    model = Dentistry
    extra = 0
    fields = ("name", "name_link", "working_hours", "address", "address_link", "contacts", "image", "order")
    ordering = ("order", "id")


class VetClinicInline(admin.TabularInline):
    model = VetClinic
    extra = 0
    fields = ("name", "name_link", "working_hours", "address", "address_link", "contacts", "image", "order")
    ordering = ("order", "id")


class DoctorsGroupInline(admin.TabularInline):
    model = DoctorsGroup
    extra = 0
    fields = ("hospital_name", "doctors_raw", "order")
    ordering = ("order", "id")


@admin.register(YourDoctorPage)
class YourDoctorPageAdmin(admin.ModelAdmin):
    list_display = ("id", "main_title", "created_at", "updated_at")
    inlines = [HospitalInline, PrivateClinicInline, DentistryInline, VetClinicInline, DoctorsGroupInline]

    def has_add_permission(self, request):
        # Разрешаем только одну страницу "Ваш доктор"
        if YourDoctorPage.objects.exists():
            return False
        return super().has_add_permission(request)


