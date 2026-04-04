"""
Django modeltranslation configuration for all CMS models.
This file registers all translatable fields for Russian and English.
"""

from modeltranslation.translator import translator, TranslationOptions



                   

from cms.homepage.models import (

    HomePage, HomeSliderItem, HomeCity, HomeActivity,

    HomeActionButton, HomePopupItem, HomeTab, MobileHomeTab,

    AboutAbkhaziaCategory, EntertainmentCategory, PlanTripCategory, ImportantTripCategory

)

from cms.cities.models import CitiesPage, City, CityCategory

from cms.banks.models import BanksPage, Bank

from cms.taxi.models import TaxiPage, TaxiService

from cms.parties.models import PartiesPage, PartyCity, PartyEvent

from cms.excursions.models import ExcursionsPage, ExcursionService

from cms.history_and_culture.models import HistoryAndCulturePage, HistorySection, CultureSection

from cms.mobile_communication.models import MobileCommunicationPage, MobileProvider, InternetProvider

from cms.important.models import ImportantPage, ImportantSection, ImportantRule, ImportantImage

from cms.your_doctor.models import YourDoctorPage, Hospital, PrivateClinic, Dentistry, VetClinic, DoctorsGroup

from cms.footer.models import Footer, FooterLink

from cms.welcome.models import WelcomePage

from cms.elementary_dictionary.models import ElementaryDictionaryPage, DictionaryCategory, DictionaryWord

from cms.abkhazian_cuisine.models import AbkhazianCuisinePage, CuisineSection, MainDish

from cms.restaurants.models import RestaurantsPage, RestaurantCity, Restaurant

from cms.beaches.models import BeachesPage, BeachCity, Beach

from cms.hotels.models import HotelsPage, HotelCity, Hotel

from cms.abkhazian_customs.models import AbkhazianCustomsPage, CustomSection

from cms.cultural_attractions.models import CulturalAttractionsPage, CulturalAttractionCity, CulturalAttraction

from cms.mountain_routes.models import MountainRoutesPage, MountainRoute

from cms.hot_springs.models import HotSpringsPage, HotSpring

from cms.wineries.models import WineriesPage, WineryCity, Winery

from cms.churches.models import ChurchesPage, ChurchCity, Church

from cms.music.models import MusicPage, MusicTrack

from cms.shops_and_markets.models import ShopsAndMarketsPage, ShopCity, ShopOrMarket

from cms.pharmacy.models import PharmacyPage, PharmacyCity, PharmacyItem

from cms.beauty_salons.models import BeautySalonsPage, BeautySalonCity, BeautySalon

from cms.sports_gyms.models import SportsGymsPage, SportsGym

from cms.car_washes.models import CarWashesPage, CarWashCity, CarWash

from cms.gas_stations.models import GasStationsPage, GasStationCity, GasStation

from cms.parking_lots.models import ParkingLotsPage, ParkingLotCity, ParkingLot

from cms.clothing_repair.models import ClothingRepairPage, ClothingRepairCity, ClothingRepair

from cms.administrative_buildings.models import AdministrativeBuildingsPage, AdministrativeBuildingCity, AdministrativeBuilding

from cms.government_structure.models import GovernmentStructurePage, GovernmentBlock

from cms.transport_communications.models import TransportCommunicationsPage, TransportBlock

from cms.privacy_policy.models import PrivacyPolicyPage, AccessibilityAndTermsPage

from cms.ad_banner.models import AdBanner

from cms.contacts.models import ContactsPage





                                    

class HomePageTranslationOptions(TranslationOptions):

    fields = (

        'hero_text_primary', 'hero_text_secondary',

        'cities_section_title', 'activities_section_title', 'actions_section_title',

        'cta_title', 'cta_hero_text', 'cta_card_title', 'cta_card_description', 'cta_button_label',

        'seo_title', 'seo_description', 'seo_keywords',

        'og_title', 'og_description', 'twitter_title', 'twitter_description',

    )



class HomeSliderItemTranslationOptions(TranslationOptions):

    fields = ('alt',)



class HomeCityTranslationOptions(TranslationOptions):

    fields = ('title', 'description')



class HomeActivityTranslationOptions(TranslationOptions):

    fields = ('title',)



class HomeActionButtonTranslationOptions(TranslationOptions):

    fields = ('label',)



class HomePopupItemTranslationOptions(TranslationOptions):

    fields = ('label',)



class HomeTabTranslationOptions(TranslationOptions):

    fields = ('label',)



class MobileHomeTabTranslationOptions(TranslationOptions):

    fields = ('label',)



class AboutAbkhaziaCategoryTranslationOptions(TranslationOptions):

    fields = ('title',)



class EntertainmentCategoryTranslationOptions(TranslationOptions):

    fields = ('title',)



class PlanTripCategoryTranslationOptions(TranslationOptions):

    fields = ('title',)



class ImportantTripCategoryTranslationOptions(TranslationOptions):

    fields = ('title',)





                                  

class CitiesPageTranslationOptions(TranslationOptions):

    fields = (

        'seo_title', 'seo_description', 'seo_keywords',

        'og_title', 'og_description', 'twitter_title', 'twitter_description',

    )



class CityTranslationOptions(TranslationOptions):

    fields = ('name', 'title', 'description', 'administrative_buildings')



class CityCategoryTranslationOptions(TranslationOptions):

    fields = ('name',)





                                 

class BanksPageTranslationOptions(TranslationOptions):

    fields = (

        'seo_title', 'seo_description', 'seo_keywords',

        'og_title', 'og_description', 'twitter_title', 'twitter_description',

    )



class BankTranslationOptions(TranslationOptions):

    fields = ('name', 'working_hours', 'address', 'contacts')





                                

class TaxiPageTranslationOptions(TranslationOptions):

    fields = (

        'main_title', 'intro_text',

        'seo_title', 'seo_description', 'seo_keywords',

        'og_title', 'og_description', 'twitter_title', 'twitter_description',

    )



class TaxiServiceTranslationOptions(TranslationOptions):

    fields = ('name', 'working_hours', 'phones_raw')





                                   

class PartiesPageTranslationOptions(TranslationOptions):

    fields = (

        'main_title', 'intro_text',

        'seo_title', 'seo_description', 'seo_keywords',

        'og_title', 'og_description', 'twitter_title', 'twitter_description',

    )



class PartyCityTranslationOptions(TranslationOptions):

    fields = ('name',)



class PartyEventTranslationOptions(TranslationOptions):

    fields = ('title', 'date_info', 'location', 'description')





                                      

class ExcursionsPageTranslationOptions(TranslationOptions):

    fields = (

        'seo_title', 'seo_description', 'seo_keywords',

        'og_title', 'og_description', 'twitter_title', 'twitter_description',

    )



class ExcursionServiceTranslationOptions(TranslationOptions):

    fields = ('contacts',)





                                               

class HistoryAndCulturePageTranslationOptions(TranslationOptions):

    fields = (

        'seo_title', 'seo_description', 'seo_keywords',

        'og_title', 'og_description', 'twitter_title', 'twitter_description',

    )



class HistorySectionTranslationOptions(TranslationOptions):

    fields = ('title', 'content')



class CultureSectionTranslationOptions(TranslationOptions):

    fields = ('title', 'content')





                                                

class MobileCommunicationPageTranslationOptions(TranslationOptions):

    fields = (

        'main_title', 'intro_text', 'mobile_section_title', 'internet_section_title',

        'seo_title', 'seo_description', 'seo_keywords',

        'og_title', 'og_description', 'twitter_title', 'twitter_description',

    )



class MobileProviderTranslationOptions(TranslationOptions):

    fields = ('name', 'description')



class InternetProviderTranslationOptions(TranslationOptions):

    fields = ('name', 'description')





                                     

class ImportantPageTranslationOptions(TranslationOptions):

    fields = (

        'title',

        'seo_title', 'seo_description', 'seo_keywords',

        'og_title', 'og_description', 'twitter_title', 'twitter_description',

    )



class ImportantSectionTranslationOptions(TranslationOptions):

    fields = (

        'title', 'subtitle', 'content',

        'passenger_intro_text', 'passenger_conclusion_text',

        'driver_intro_text', 'driver_description_text', 'driver_conclusion_text',

    )



class ImportantRuleTranslationOptions(TranslationOptions):

    fields = ('title', 'description')



class ImportantImageTranslationOptions(TranslationOptions):

    fields = ('title', 'description', 'alt_text')





                                       

class YourDoctorPageTranslationOptions(TranslationOptions):

    fields = (

        'main_title',

        'seo_title', 'seo_description', 'seo_keywords',

        'og_title', 'og_description', 'twitter_title', 'twitter_description',

    )



class HospitalTranslationOptions(TranslationOptions):

    fields = ('name', 'working_hours', 'address', 'contacts')



class PrivateClinicTranslationOptions(TranslationOptions):

    fields = ('name', 'working_hours', 'address', 'contacts')



class DentistryTranslationOptions(TranslationOptions):

    fields = ('name', 'working_hours', 'address', 'contacts')



class VetClinicTranslationOptions(TranslationOptions):

    fields = ('name', 'working_hours', 'address', 'contacts')



class DoctorsGroupTranslationOptions(TranslationOptions):

    fields = ('hospital_name', 'doctors_raw')





                                  

class FooterTranslationOptions(TranslationOptions):

    fields = ('description', 'contact_info', 'copyright_text')



class FooterLinkTranslationOptions(TranslationOptions):

    fields = ('label',)





                                   

class WelcomePageTranslationOptions(TranslationOptions):

    fields = ('title', 'subtitle', 'description')





                                                 

class ElementaryDictionaryPageTranslationOptions(TranslationOptions):

    fields = (

        'seo_title', 'seo_description', 'seo_keywords',

        'og_title', 'og_description', 'twitter_title', 'twitter_description',

    )



class DictionaryCategoryTranslationOptions(TranslationOptions):

    fields = ('title',)



class DictionaryWordTranslationOptions(TranslationOptions):

    fields = ('russian', 'abkhazian')





                                             

class AbkhazianCuisinePageTranslationOptions(TranslationOptions):

    fields = (

        'main_title',

        'seo_title', 'seo_description', 'seo_keywords',

        'og_title', 'og_description', 'twitter_title', 'twitter_description',

    )



class CuisineSectionTranslationOptions(TranslationOptions):

    fields = ('title', 'text')



class MainDishTranslationOptions(TranslationOptions):

    fields = ('name', 'description')





                                       

class RestaurantsPageTranslationOptions(TranslationOptions):

    fields = (

        'seo_title', 'seo_description', 'seo_keywords',

        'og_title', 'og_description', 'twitter_title', 'twitter_description',

    )



class RestaurantCityTranslationOptions(TranslationOptions):

    fields = ('name', 'title')



class RestaurantTranslationOptions(TranslationOptions):

    fields = ('name', 'address', 'working_hours')





                                   

class BeachesPageTranslationOptions(TranslationOptions):

    fields = (

        'seo_title', 'seo_description', 'seo_keywords',

        'og_title', 'og_description', 'twitter_title', 'twitter_description',

    )



class BeachCityTranslationOptions(TranslationOptions):

    fields = ('name', 'title')



class BeachTranslationOptions(TranslationOptions):

    fields = ('name', 'address', 'description')





                                  

class HotelsPageTranslationOptions(TranslationOptions):

    fields = (

        'seo_title', 'seo_description', 'seo_keywords',

        'og_title', 'og_description', 'twitter_title', 'twitter_description',

    )



class HotelCityTranslationOptions(TranslationOptions):

    fields = ('name', 'title')



class HotelTranslationOptions(TranslationOptions):

    fields = ('name', 'address', 'contacts', 'price')





                                             

class AbkhazianCustomsPageTranslationOptions(TranslationOptions):

    fields = (

        'main_title', 'intro_text',

        'seo_title', 'seo_description', 'seo_keywords',

        'og_title', 'og_description', 'twitter_title', 'twitter_description',

    )



class CustomSectionTranslationOptions(TranslationOptions):

    fields = ('title', 'text')





                                                

class CulturalAttractionsPageTranslationOptions(TranslationOptions):

    fields = (

        'seo_title', 'seo_description', 'seo_keywords',

        'og_title', 'og_description', 'twitter_title', 'twitter_description',

    )



class CulturalAttractionCityTranslationOptions(TranslationOptions):

    fields = ('name', 'title')



class CulturalAttractionTranslationOptions(TranslationOptions):

    fields = ('name', 'description', 'address', 'working_hours')





                                           

class MountainRoutesPageTranslationOptions(TranslationOptions):

    fields = (

        'main_title', 'section_title',

        'seo_title', 'seo_description', 'seo_keywords',

        'og_title', 'og_description', 'twitter_title', 'twitter_description',

    )



class MountainRouteTranslationOptions(TranslationOptions):

    fields = ('title', 'name')





                                       

class HotSpringsPageTranslationOptions(TranslationOptions):

    fields = (

        'hero_text',

        'seo_title', 'seo_description', 'seo_keywords',

        'og_title', 'og_description', 'twitter_title', 'twitter_description',

    )



class HotSpringTranslationOptions(TranslationOptions):

    fields = ('title', 'description')





                                    

class WineriesPageTranslationOptions(TranslationOptions):

    fields = (

        'seo_title', 'seo_description', 'seo_keywords',

        'og_title', 'og_description', 'twitter_title', 'twitter_description',

    )



class WineryCityTranslationOptions(TranslationOptions):

    fields = ('name', 'title')



class WineryTranslationOptions(TranslationOptions):

    fields = ('name', 'working_hours', 'address', 'contacts')





                                    

class ChurchesPageTranslationOptions(TranslationOptions):

    fields = (

        'seo_title', 'seo_description', 'seo_keywords',

        'og_title', 'og_description', 'twitter_title', 'twitter_description',

    )



class ChurchCityTranslationOptions(TranslationOptions):

    fields = ('name', 'title')



class ChurchTranslationOptions(TranslationOptions):

    fields = ('name', 'address', 'working_hours', 'description', 'services')





                                 

class MusicPageTranslationOptions(TranslationOptions):

    fields = (

        'intro_text',

        'seo_title', 'seo_description', 'seo_keywords',

        'og_title', 'og_description', 'twitter_title', 'twitter_description',

    )



class MusicTrackTranslationOptions(TranslationOptions):

    fields = ('title', 'artist')





                                             

class ShopsAndMarketsPageTranslationOptions(TranslationOptions):

    fields = (

        'seo_title', 'seo_description', 'seo_keywords',

        'og_title', 'og_description', 'twitter_title', 'twitter_description',

    )



class ShopCityTranslationOptions(TranslationOptions):

    fields = ('name', 'title')



class ShopOrMarketTranslationOptions(TranslationOptions):

    fields = ('name', 'working_hours', 'address', 'contacts')





                                    

class PharmacyPageTranslationOptions(TranslationOptions):

    fields = (

        'seo_title', 'seo_description', 'seo_keywords',

        'og_title', 'og_description', 'twitter_title', 'twitter_description',

    )



class PharmacyCityTranslationOptions(TranslationOptions):

    fields = ('name', 'title')



class PharmacyItemTranslationOptions(TranslationOptions):

    fields = ('name', 'working_hours', 'address', 'contacts')





                                         

class BeautySalonsPageTranslationOptions(TranslationOptions):

    fields = (

        'seo_title', 'seo_description', 'seo_keywords',

        'og_title', 'og_description', 'twitter_title', 'twitter_description',

    )



class BeautySalonCityTranslationOptions(TranslationOptions):

    fields = ('name', 'title')



class BeautySalonTranslationOptions(TranslationOptions):

    fields = ('name', 'address', 'working_hours', 'services')





                                       

class SportsGymsPageTranslationOptions(TranslationOptions):

    fields = (

        'seo_title', 'seo_description', 'seo_keywords',

        'og_title', 'og_description', 'twitter_title', 'twitter_description',

    )



class SportsGymTranslationOptions(TranslationOptions):

    fields = ('name', 'working_hours', 'address', 'contacts')





                                      

class CarWashesPageTranslationOptions(TranslationOptions):

    fields = (

        'seo_title', 'seo_description', 'seo_keywords',

        'og_title', 'og_description', 'twitter_title', 'twitter_description',

    )



class CarWashCityTranslationOptions(TranslationOptions):

    fields = ('name', 'title')



class CarWashTranslationOptions(TranslationOptions):

    fields = ('name', 'address', 'contacts', 'working_hours', 'services')





                                        

class GasStationsPageTranslationOptions(TranslationOptions):

    fields = (

        'seo_title', 'seo_description', 'seo_keywords',

        'og_title', 'og_description', 'twitter_title', 'twitter_description',

    )



class GasStationCityTranslationOptions(TranslationOptions):

    fields = ('name', 'title')



class GasStationTranslationOptions(TranslationOptions):

    fields = ('name', 'address', 'contacts')





                                        

class ParkingLotsPageTranslationOptions(TranslationOptions):

    fields = (

        'seo_title', 'seo_description', 'seo_keywords',

        'og_title', 'og_description', 'twitter_title', 'twitter_description',

    )



class ParkingLotCityTranslationOptions(TranslationOptions):

    fields = ('name', 'title')



class ParkingLotTranslationOptions(TranslationOptions):

    fields = ('name', 'address', 'working_hours', 'contacts')





                                           

class ClothingRepairPageTranslationOptions(TranslationOptions):

    fields = (

        'seo_title', 'seo_description', 'seo_keywords',

        'og_title', 'og_description', 'twitter_title', 'twitter_description',

    )



class ClothingRepairCityTranslationOptions(TranslationOptions):

    fields = ('name', 'title')



class ClothingRepairTranslationOptions(TranslationOptions):

    fields = ('name', 'address', 'working_hours', 'contacts', 'description', 'services')





                                                    

class AdministrativeBuildingsPageTranslationOptions(TranslationOptions):

    fields = (

        'seo_title', 'seo_description', 'seo_keywords',

        'og_title', 'og_description', 'twitter_title', 'twitter_description',

    )



class AdministrativeBuildingCityTranslationOptions(TranslationOptions):

    fields = ('name', 'title')



class AdministrativeBuildingTranslationOptions(TranslationOptions):

    fields = ('name', 'working_hours', 'address', 'contacts')





                                                

class GovernmentStructurePageTranslationOptions(TranslationOptions):

    fields = (

        'seo_title', 'seo_description', 'seo_keywords',

        'og_title', 'og_description', 'twitter_title', 'twitter_description',

    )



class GovernmentBlockTranslationOptions(TranslationOptions):

    fields = ('title', 'content')





                                                    

class TransportCommunicationsPageTranslationOptions(TranslationOptions):

    fields = (

        'main_title',

        'seo_title', 'seo_description', 'seo_keywords',

        'og_title', 'og_description', 'twitter_title', 'twitter_description',

    )



class TransportBlockTranslationOptions(TranslationOptions):

    fields = ('title',)





                                          

class PrivacyPolicyPageTranslationOptions(TranslationOptions):

    fields = ('title', 'content')



class ContactsPageTranslationOptions(TranslationOptions):

    fields = (

        'title',

        'description',

        'panel_title',

        'panel_text',

        'email_role',

        'telegram_role',

        'telegram_display',

        'seo_title',

        'seo_description',

        'seo_keywords',

        'og_title',

        'og_description',

        'twitter_title',

        'twitter_description',

    )



class AccessibilityAndTermsPageTranslationOptions(TranslationOptions):

    fields = ('title', 'content')





                                     

class AdBannerTranslationOptions(TranslationOptions):

    fields = ('title', 'description', 'site')





                                               

translator.register(HomePage, HomePageTranslationOptions)

translator.register(HomeSliderItem, HomeSliderItemTranslationOptions)

translator.register(HomeCity, HomeCityTranslationOptions)

translator.register(HomeActivity, HomeActivityTranslationOptions)

translator.register(HomeActionButton, HomeActionButtonTranslationOptions)

translator.register(HomePopupItem, HomePopupItemTranslationOptions)

translator.register(HomeTab, HomeTabTranslationOptions)

translator.register(MobileHomeTab, MobileHomeTabTranslationOptions)

translator.register(AboutAbkhaziaCategory, AboutAbkhaziaCategoryTranslationOptions)

translator.register(EntertainmentCategory, EntertainmentCategoryTranslationOptions)

translator.register(PlanTripCategory, PlanTripCategoryTranslationOptions)

translator.register(ImportantTripCategory, ImportantTripCategoryTranslationOptions)



translator.register(CitiesPage, CitiesPageTranslationOptions)

translator.register(City, CityTranslationOptions)

translator.register(CityCategory, CityCategoryTranslationOptions)



translator.register(BanksPage, BanksPageTranslationOptions)

translator.register(Bank, BankTranslationOptions)



translator.register(TaxiPage, TaxiPageTranslationOptions)

translator.register(TaxiService, TaxiServiceTranslationOptions)



translator.register(PartiesPage, PartiesPageTranslationOptions)

translator.register(PartyCity, PartyCityTranslationOptions)

translator.register(PartyEvent, PartyEventTranslationOptions)



translator.register(ExcursionsPage, ExcursionsPageTranslationOptions)

translator.register(ExcursionService, ExcursionServiceTranslationOptions)



translator.register(HistoryAndCulturePage, HistoryAndCulturePageTranslationOptions)

translator.register(HistorySection, HistorySectionTranslationOptions)

translator.register(CultureSection, CultureSectionTranslationOptions)



translator.register(MobileCommunicationPage, MobileCommunicationPageTranslationOptions)

translator.register(MobileProvider, MobileProviderTranslationOptions)

translator.register(InternetProvider, InternetProviderTranslationOptions)



translator.register(ImportantPage, ImportantPageTranslationOptions)

translator.register(ImportantSection, ImportantSectionTranslationOptions)

translator.register(ImportantRule, ImportantRuleTranslationOptions)

translator.register(ImportantImage, ImportantImageTranslationOptions)



translator.register(YourDoctorPage, YourDoctorPageTranslationOptions)

translator.register(Hospital, HospitalTranslationOptions)

translator.register(PrivateClinic, PrivateClinicTranslationOptions)

translator.register(Dentistry, DentistryTranslationOptions)

translator.register(VetClinic, VetClinicTranslationOptions)

translator.register(DoctorsGroup, DoctorsGroupTranslationOptions)



translator.register(Footer, FooterTranslationOptions)

translator.register(FooterLink, FooterLinkTranslationOptions)



translator.register(WelcomePage, WelcomePageTranslationOptions)



translator.register(ElementaryDictionaryPage, ElementaryDictionaryPageTranslationOptions)

translator.register(DictionaryCategory, DictionaryCategoryTranslationOptions)

translator.register(DictionaryWord, DictionaryWordTranslationOptions)



translator.register(AbkhazianCuisinePage, AbkhazianCuisinePageTranslationOptions)

translator.register(CuisineSection, CuisineSectionTranslationOptions)

translator.register(MainDish, MainDishTranslationOptions)



translator.register(RestaurantsPage, RestaurantsPageTranslationOptions)

translator.register(RestaurantCity, RestaurantCityTranslationOptions)

translator.register(Restaurant, RestaurantTranslationOptions)



translator.register(BeachesPage, BeachesPageTranslationOptions)

translator.register(BeachCity, BeachCityTranslationOptions)

translator.register(Beach, BeachTranslationOptions)



translator.register(HotelsPage, HotelsPageTranslationOptions)

translator.register(HotelCity, HotelCityTranslationOptions)

translator.register(Hotel, HotelTranslationOptions)



translator.register(AbkhazianCustomsPage, AbkhazianCustomsPageTranslationOptions)

translator.register(CustomSection, CustomSectionTranslationOptions)



translator.register(CulturalAttractionsPage, CulturalAttractionsPageTranslationOptions)

translator.register(CulturalAttractionCity, CulturalAttractionCityTranslationOptions)

translator.register(CulturalAttraction, CulturalAttractionTranslationOptions)



translator.register(MountainRoutesPage, MountainRoutesPageTranslationOptions)

translator.register(MountainRoute, MountainRouteTranslationOptions)



translator.register(HotSpringsPage, HotSpringsPageTranslationOptions)

translator.register(HotSpring, HotSpringTranslationOptions)



translator.register(WineriesPage, WineriesPageTranslationOptions)

translator.register(WineryCity, WineryCityTranslationOptions)

translator.register(Winery, WineryTranslationOptions)



translator.register(ChurchesPage, ChurchesPageTranslationOptions)

translator.register(ChurchCity, ChurchCityTranslationOptions)

translator.register(Church, ChurchTranslationOptions)



translator.register(MusicPage, MusicPageTranslationOptions)

translator.register(MusicTrack, MusicTrackTranslationOptions)



translator.register(ShopsAndMarketsPage, ShopsAndMarketsPageTranslationOptions)

translator.register(ShopCity, ShopCityTranslationOptions)

translator.register(ShopOrMarket, ShopOrMarketTranslationOptions)



translator.register(PharmacyPage, PharmacyPageTranslationOptions)

translator.register(PharmacyCity, PharmacyCityTranslationOptions)

translator.register(PharmacyItem, PharmacyItemTranslationOptions)



translator.register(BeautySalonsPage, BeautySalonsPageTranslationOptions)

translator.register(BeautySalonCity, BeautySalonCityTranslationOptions)

translator.register(BeautySalon, BeautySalonTranslationOptions)



translator.register(SportsGymsPage, SportsGymsPageTranslationOptions)

translator.register(SportsGym, SportsGymTranslationOptions)



translator.register(CarWashesPage, CarWashesPageTranslationOptions)

translator.register(CarWashCity, CarWashCityTranslationOptions)

translator.register(CarWash, CarWashTranslationOptions)



translator.register(GasStationsPage, GasStationsPageTranslationOptions)

translator.register(GasStationCity, GasStationCityTranslationOptions)

translator.register(GasStation, GasStationTranslationOptions)



translator.register(ParkingLotsPage, ParkingLotsPageTranslationOptions)

translator.register(ParkingLotCity, ParkingLotCityTranslationOptions)

translator.register(ParkingLot, ParkingLotTranslationOptions)



translator.register(ClothingRepairPage, ClothingRepairPageTranslationOptions)

translator.register(ClothingRepairCity, ClothingRepairCityTranslationOptions)

translator.register(ClothingRepair, ClothingRepairTranslationOptions)



translator.register(AdministrativeBuildingsPage, AdministrativeBuildingsPageTranslationOptions)

translator.register(AdministrativeBuildingCity, AdministrativeBuildingCityTranslationOptions)

translator.register(AdministrativeBuilding, AdministrativeBuildingTranslationOptions)



translator.register(GovernmentStructurePage, GovernmentStructurePageTranslationOptions)

translator.register(GovernmentBlock, GovernmentBlockTranslationOptions)



translator.register(TransportCommunicationsPage, TransportCommunicationsPageTranslationOptions)

translator.register(TransportBlock, TransportBlockTranslationOptions)



translator.register(PrivacyPolicyPage, PrivacyPolicyPageTranslationOptions)

translator.register(ContactsPage, ContactsPageTranslationOptions)

translator.register(AccessibilityAndTermsPage, AccessibilityAndTermsPageTranslationOptions)



translator.register(AdBanner, AdBannerTranslationOptions)

