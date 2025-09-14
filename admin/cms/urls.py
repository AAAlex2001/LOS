from django.urls import path, include

urlpatterns = [
    path("home/", include("cms.homepage.urls")),
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
    path("churches/", include("cms.churches.urls")),
    path("clothing-repair/", include("cms.clothing_repair.urls")),
    path("cultural-attractions/", include("cms.cultural_attractions.urls")),
    path("gas-stations/", include("cms.gas_stations.urls")),
    path("hotels/", include("cms.hotels.urls")),
    path("parking-lots/", include("cms.parking_lots.urls")),
    path("pharmacy/", include("cms.pharmacy.urls")),
    path("restaurants/", include("cms.restaurants.urls")),
    path("shops-and-markets/", include("cms.shops_and_markets.urls")),
    path("wineries/", include("cms.wineries.urls")),
    path("cities/", include("cms.cities.urls")),
    path("elementary-dictionary/", include("cms.elementary_dictionary.urls")),
    path("excursions/", include("cms.excursions.urls")),
]


