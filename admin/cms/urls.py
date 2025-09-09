from django.urls import path, include

urlpatterns = [
    path("", include("cms.homepage.urls")),
    path("banks/", include("cms.banks.urls")),
    path("history-and-culture/", include("cms.history_and_culture.urls")),
    path("abkhazian-cuisine/", include("cms.abkhazian_cuisine.urls")),
    path("abkhazian-customs/", include("cms.abkhazian_customs.urls")),
    path("taxi/", include("cms.taxi.urls")),
    path("your-doctor/", include("cms.your_doctor.urls")),
    path("administrative-buildings/", include("cms.administrative_buildings.urls")),
    path("beaches/", include("cms.beaches.urls")),
    path("beauty-salons/", include("cms.beauty_salons.urls")),
    path("car-washes/", include("cms.car_washes.urls")),
]


