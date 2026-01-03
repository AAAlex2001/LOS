from rest_framework import serializers



from .models import (

    YourDoctorPage,

    Hospital,

    PrivateClinic,

    Dentistry,

    VetClinic,

    DoctorsGroup,

)





class ImageUrlMixin:

    def build_image_url(self, image_field) -> str:

        if not image_field:

            return ""

        return image_field.url.replace('/media/', '')





class HospitalSerializer(serializers.ModelSerializer, ImageUrlMixin):

    image_url = serializers.SerializerMethodField()



    class Meta:

        model = Hospital

        fields = [

            "id", "name", "name_link", "working_hours", "address", "address_link", "contacts", "image_url", "order"

        ]



    def get_image_url(self, obj: Hospital) -> str:

        return self.build_image_url(obj.image)





class PrivateClinicSerializer(serializers.ModelSerializer, ImageUrlMixin):

    image_url = serializers.SerializerMethodField()



    class Meta:

        model = PrivateClinic

        fields = [

            "id", "name", "name_link", "working_hours", "address", "address_link", "contacts", "image_url", "order"

        ]



    def get_image_url(self, obj: PrivateClinic) -> str:

        return self.build_image_url(obj.image)





class DentistrySerializer(serializers.ModelSerializer, ImageUrlMixin):

    image_url = serializers.SerializerMethodField()



    class Meta:

        model = Dentistry

        fields = [

            "id", "name", "name_link", "working_hours", "address", "address_link", "contacts", "image_url", "order"

        ]



    def get_image_url(self, obj: Dentistry) -> str:

        return self.build_image_url(obj.image)





class VetClinicSerializer(serializers.ModelSerializer, ImageUrlMixin):

    image_url = serializers.SerializerMethodField()



    class Meta:

        model = VetClinic

        fields = [

            "id", "name", "name_link", "working_hours", "address", "address_link", "contacts", "image_url", "order"

        ]



    def get_image_url(self, obj: VetClinic) -> str:

        return self.build_image_url(obj.image)





class DoctorsGroupSerializer(serializers.ModelSerializer):

    doctors = serializers.SerializerMethodField()

    class Meta:

        model = DoctorsGroup

        fields = ["id", "hospital_name", "doctors", "order"]



    def get_doctors(self, obj: DoctorsGroup) -> list[str]:

        raw = obj.doctors_raw or ""

        return [line.strip() for line in raw.splitlines() if line.strip()]





class YourDoctorPageSerializer(serializers.ModelSerializer):

    hospitals = HospitalSerializer(many=True, read_only=True)

    private_clinics = PrivateClinicSerializer(many=True, read_only=True)

    dentistries = DentistrySerializer(many=True, read_only=True)

    vet_clinics = VetClinicSerializer(many=True, read_only=True)

    doctors_groups = DoctorsGroupSerializer(many=True, read_only=True)

    logo_image_url = serializers.SerializerMethodField()

    hospitals_hero_image_url = serializers.SerializerMethodField()



    class Meta:

        model = YourDoctorPage

        fields = [

            "id", "main_title", "logo_image_url", "hospitals_hero_image_url", "seo_title", "seo_description", "seo_keywords", "canonical_url",

            "og_title", "og_description", "og_image", "twitter_title",

            "twitter_description", "twitter_image", "robots_index", "robots_follow",

            "hospitals", "private_clinics", "dentistries", "vet_clinics", "doctors_groups"

        ]



    def get_logo_image_url(self, obj: YourDoctorPage) -> str:

        return obj.logo_image.url.replace('/media/', '') if getattr(obj, 'logo_image', None) else ""



    def get_hospitals_hero_image_url(self, obj: YourDoctorPage) -> str:

        return obj.hospitals_hero_image.url.replace('/media/', '') if getattr(obj, 'hospitals_hero_image', None) else ""





