from django.contrib import admin
from django.utils.html import format_html

from .models import ImageAsset

# Регистрируем базовые модели
@admin.register(ImageAsset)
class ImageAssetAdmin(admin.ModelAdmin):
    """
    Базовый админ-класс для управления изображениями
    """
    list_display = ("id", "alt", "order", "updated_at")
    list_editable = ("order",)
    search_fields = ("alt",)
    list_filter = ("updated_at",)
    readonly_fields = ("preview",)

    def preview(self, obj):
        if obj and obj.image:
            return format_html('<img src="{}" style="height:60px;" />', obj.image.url)
        return "—"
    
    preview.short_description = "Предпросмотр"

from .homepage.admin import HomePageAdmin
from .banks.admin import BanksPageAdmin
from .history_and_culture.admin import HistoryAndCulturePageAdmin
from .abkhazian_cuisine.admin import AbkhazianCuisinePageAdmin
from .abkhazian_customs.admin import AbkhazianCustomsPageAdmin
from .taxi.admin import TaxiPageAdmin
from .your_doctor.admin import YourDoctorPageAdmin
from .administrative_buildings.admin import AdministrativeBuildingsPageAdmin
from .beaches.admin import BeachesPageAdmin
from .beauty_salons.admin import BeautySalonsPageAdmin
from .car_washes.admin import CarWashesPageAdmin
from .churches.admin import ChurchesPageAdmin
from .clothing_repair.admin import ClothingRepairPageAdmin
from .cultural_attractions.admin import CulturalAttractionsPageAdmin
from .gas_stations.admin import GasStationsPageAdmin
from .hotels.admin import HotelsPageAdmin
from .parking_lots.admin import ParkingLotsPageAdmin
from .pharmacy.admin import PharmacyPageAdmin
from .restaurants.admin import RestaurantsPageAdmin
from .shops_and_markets.admin import ShopsAndMarketsPageAdmin
from .wineries.admin import WineriesPageAdmin
from .elementary_dictionary.admin import ElementaryDictionaryPageAdmin
from .excursions.admin import ExcursionsPageAdmin
from .government_structure.admin import GovernmentStructurePageAdmin
from .hot_springs.admin import HotSpringsPageAdmin
from .important.admin import ImportantPageAdmin
from .cities.admin import CityAdmin
from .mobile_communication.admin import MobileCommunicationPageAdmin
from .mountain_routes.admin import MountainRoutesPageAdmin
from .transport_communications.admin import TransportCommunicationsPageAdmin
