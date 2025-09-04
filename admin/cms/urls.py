from django.urls import path, include

urlpatterns = [
    path("", include("cms.homepage.urls")),
    path("banks/", include("cms.banks.urls")),
    path("history-and-culture/", include("cms.history_and_culture.urls")),
]


