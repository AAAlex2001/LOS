from django.urls import path, include

urlpatterns = [
    path("", include("cms.homepage.urls")),
    path("banks/", include("cms.banks.urls")),
]


