import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
  LayoutAnimation,
  UIManager,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import config from '@/config';
import AdministrativeBuildingsSukhumScreen from './sukhum/AdministrativeBuildingsSukhumScreen';
import ChurchesSukhumScreen from './sukhum/ChurchesSukhumScreen';
import BeautySalonsSukhumScreen from './sukhum/BeautySalonsSukhumScreen';
import PharmacySukhumScreen from './sukhum/PharmacySukhumScreen';
import WineriesSukhumScreen from './sukhum/WineriesSukhumScreen';
import GasStationsSukhumScreen from './sukhum/GasStationsSukhumScreen';
import CulturalAttractionsSukhumScreen from './sukhum/CulturalAttractionsSukhumScreen';
import ShopsAndMarketsSukhumScreen from './sukhum/ShopsAndMarketsSukhumScreen';
import CarWashesSukhumScreen from './sukhum/CarWashesSukhumScreen';
import HotelsSukhumScreen from './sukhum/HotelsSukhumScreen';
import ParkingLotsSukhumScreen from './sukhum/ParkingLotsSukhumScreen';
import BeachesSukhumScreen from './sukhum/BeachesSukhumScreen';
import ClothingRepairSukhumScreen from './sukhum/ClothingRepairSukhumScreen';
import RestaurantsSukhumScreen from './sukhum/RestaurantsSukhumScreen';
import AdministrativeBuildingsGagraScreen from './gagra/AdministrativeBuildingsGagraScreen';
import ChurchesGagraScreen from './gagra/ChurchesGagraScreen';
import BeautySalonsGagraScreen from './gagra/BeautySalonsGagraScreen';
import PharmacyGagraScreen from './gagra/PharmacyGagraScreen';
import WineriesGagraScreen from './gagra/WineriesGagraScreen';
import GasStationsGagraScreen from './gagra/GasStationsGagraScreen';
import CulturalAttractionsGagraScreen from './gagra/CulturalAttractionsGagraScreen';
import ShopsAndMarketsGagraScreen from './gagra/ShopsAndMarketsGagraScreen';
import CarWashesGagraScreen from './gagra/CarWashesGagraScreen';
import HotelsGagraScreen from './gagra/HotelsGagraScreen';
import ParkingLotsGagraScreen from './gagra/ParkingLotsGagraScreen';
import BeachesGagraScreen from './gagra/BeachesGagraScreen';
import ClothingRepairGagraScreen from './gagra/ClothingRepairGagraScreen';
import RestaurantsGagraScreen from './gagra/RestaurantsGagraScreen';
import AdministrativeBuildingsGalScreen from './gal/AdministrativeBuildingsGalScreen';
import ChurchesGalScreen from './gal/ChurchesGalScreen';
import BeautySalonsGalScreen from './gal/BeautySalonsGalScreen';
import PharmacyGalScreen from './gal/PharmacyGalScreen';
import WineriesGalScreen from './gal/WineriesGalScreen';
import GasStationsGalScreen from './gal/GasStationsGalScreen';
import CulturalAttractionsGalScreen from './gal/CulturalAttractionsGalScreen';
import ShopsAndMarketsGalScreen from './gal/ShopsAndMarketsGalScreen';
import CarWashesGalScreen from './gal/CarWashesGalScreen';
import HotelsGalScreen from './gal/HotelsGalScreen';
import ParkingLotsGalScreen from './gal/ParkingLotsGalScreen';
import BeachesGalScreen from './gal/BeachesGalScreen';
import ClothingRepairGalScreen from './gal/ClothingRepairGalScreen';
import RestaurantsGalScreen from './gal/RestaurantsGalScreen';
import AdministrativeBuildingsGudautaScreen from './gudauta/AdministrativeBuildingsGudautaScreen';
import ChurchesGudautaScreen from './gudauta/ChurchesGudautaScreen';
import BeautySalonsGudautaScreen from './gudauta/BeautySalonsGudautaScreen';
import PharmacyGudautaScreen from './gudauta/PharmacyGudautaScreen';
import WineriesGudautaScreen from './gudauta/WineriesGudautaScreen';
import GasStationsGudautaScreen from './gudauta/GasStationsGudautaScreen';
import CulturalAttractionsGudautaScreen from './gudauta/CulturalAttractionsGudautaScreen';
import ShopsAndMarketsGudautaScreen from './gudauta/ShopsAndMarketsGudautaScreen';
import CarWashesGudautaScreen from './gudauta/CarWashesGudautaScreen';
import HotelsGudautaScreen from './gudauta/HotelsGudautaScreen';
import ParkingLotsGudautaScreen from './gudauta/ParkingLotsGudautaScreen';
import BeachesGudautaScreen from './gudauta/BeachesGudautaScreen';
import ClothingRepairGudautaScreen from './gudauta/ClothingRepairGudautaScreen';
import RestaurantsGudautaScreen from './gudauta/RestaurantsGudautaScreen';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type CityCategory = {
  id: number;
  name: string;
  url: string;
  is_active: boolean;
  order: number;
};

type City = {
  id: number;
  name: string;
  title?: string;
  description?: string;
  image_url?: string;
  order: number;
  categories?: CityCategory[];
};

type CitiesPageData = {
  id: number;
  cities: City[];
};

const API_BASE = config.API_BASE;

export default function CitiesScreen({ visible, onClose }: { visible: boolean, onClose: () => void }) {
  const [data, setData] = useState<CitiesPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedCity, setExpandedCity] = useState<number[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeCity, setActiveCity] = useState<string | null>(null);

  useEffect(() => {
    if (!visible) return;
    
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/cities/page/content/`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load cities page');
        const json = await res.json() as CitiesPageData;
        setData(json);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [visible]);

  const cities = (data?.cities || []).slice().sort((a, b) => a.order - b.order);
  const toImageUrl = (p?: string) => {
    if (!p) return '';
    if (p.startsWith('http://') || p.startsWith('https://')) return p;
    return `${API_BASE}/media/${p}`;
  };

  const toggleExpand = (cityId: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedCity((prev) =>
    prev.includes(cityId)
        ? prev.filter((id) => id !== cityId)
        : [...prev, cityId]
    );
  };

  const handleCategoryClick = (category: CityCategory, cityName: string) => {
    if (!category.is_active || !category.url) return;
    
    const url = category.url.toLowerCase();
    const city = cityName.toLowerCase();
    
    setActiveCategory(url);
    setActiveCity(city);
  };

  const closeModal = () => {
    setActiveCategory(null);
    setActiveCity(null);
  };

  const isSukhum = activeCity?.includes('сухум');
  const isGagra = activeCity?.includes('гагра');
  const isGal = activeCity?.includes('гал');
  const isGudauta = activeCity?.includes('гудаут');
  const isAdminBuildings = activeCategory?.includes('administrative-buildings');
  const isChurches = activeCategory?.includes('churches');
  const isBeautySalons = activeCategory?.includes('beauty-salo');
  const isPharmacy = activeCategory?.includes('pharmacy');
  const isWineries = activeCategory?.includes('winer');
  const isGasStations = activeCategory?.includes('gas-station');
  const isCulturalAttractions = activeCategory?.includes('cultural-attraction');
  const isShopsAndMarkets = activeCategory?.includes('shop');
  const isCarWashes = activeCategory?.includes('car-wash');
  const isHotels = activeCategory?.includes('hotel');
  const isParkingLots = activeCategory?.includes('parking');
  const isBeaches = activeCategory?.includes('beach');
  const isClothingRepair = activeCategory?.includes('repair');
  const isRestaurants = activeCategory?.includes('restaurant');

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View style={styles.container}>
        <View style={styles.headerBar}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <View style={styles.headerTitleWrap}>
            <Text style={styles.headerTitle}>ГОРОДА АБХАЗИИ</Text>
          </View>
          <View style={{ width: 36 }} />
        </View>

        {loading ? (
          <View style={styles.centerContent}>
            <Text style={styles.loadingText}>Загрузка...</Text>
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.scrollContent}>
            {cities.map((city) => (
              <View key={city.id} style={styles.cityCard}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => toggleExpand(city.id)}
                  style={styles.preview}
                >
                  <Text style={styles.cityName}>{city.name}</Text>
                  <ImageBackground
                    source={{ uri: toImageUrl(city.image_url) }}
                    style={styles.cityImage}
                    imageStyle={styles.cityImageInner}
                  />
                </TouchableOpacity>
                
                {expandedCity.includes(city.id) && (
                  <View style={styles.expandedContent}>
                    <Text style={styles.description}>{city.description}</Text>
                    
                    {city.categories && city.categories.length > 0 && (
                      <View style={styles.categoriesContainer}>
                        {city.categories.map((category) => (
                          <TouchableOpacity
                            key={category.id}
                            style={styles.categoryItem}
                            onPress={() => handleCategoryClick(category, city.name)}
                            disabled={!category.is_active}
                            activeOpacity={category.is_active ? 0.7 : 1}
                          >
                            <Text style={styles.categoryArrow}>›</Text>
                            <Text style={[styles.categoryName, !category.is_active && styles.categoryDisabled]}>
                              {category.name}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    )}
                  </View>
                )}
              </View>
            ))}
          </ScrollView>
        )}
        
        {/* Administrative Buildings */}
        {isAdminBuildings && isSukhum && (
          <AdministrativeBuildingsSukhumScreen visible={true} onClose={closeModal} />
        )}
        {isAdminBuildings && isGagra && (
          <AdministrativeBuildingsGagraScreen visible={true} onClose={closeModal} />
        )}
        
        {/* Churches */}
        {isChurches && isSukhum && (
          <ChurchesSukhumScreen visible={true} onClose={closeModal} />
        )}
        {isChurches && isGagra && (
          <ChurchesGagraScreen visible={true} onClose={closeModal} />
        )}
        
        {/* Beauty Salons */}
        {isBeautySalons && isSukhum && (
          <BeautySalonsSukhumScreen visible={true} onClose={closeModal} />
        )}
        {isBeautySalons && isGagra && (
          <BeautySalonsGagraScreen visible={true} onClose={closeModal} />
        )}
        
        {/* Pharmacy */}
        {isPharmacy && isSukhum && (
          <PharmacySukhumScreen visible={true} onClose={closeModal} />
        )}
        {isPharmacy && isGagra && (
          <PharmacyGagraScreen visible={true} onClose={closeModal} />
        )}
        
        {/* Wineries */}
        {isWineries && isSukhum && (
          <WineriesSukhumScreen visible={true} onClose={closeModal} />
        )}
        {isWineries && isGagra && (
          <WineriesGagraScreen visible={true} onClose={closeModal} />
        )}
        
        {/* Gas Stations */}
        {isGasStations && isSukhum && (
          <GasStationsSukhumScreen visible={true} onClose={closeModal} />
        )}
        {isGasStations && isGagra && (
          <GasStationsGagraScreen visible={true} onClose={closeModal} />
        )}
        
        {/* Cultural Attractions */}
        {isCulturalAttractions && isSukhum && (
          <CulturalAttractionsSukhumScreen visible={true} onClose={closeModal} />
        )}
        {isCulturalAttractions && isGagra && (
          <CulturalAttractionsGagraScreen visible={true} onClose={closeModal} />
        )}
        
        {/* Shops and Markets */}
        {isShopsAndMarkets && isSukhum && (
          <ShopsAndMarketsSukhumScreen visible={true} onClose={closeModal} />
        )}
        {isShopsAndMarkets && isGagra && (
          <ShopsAndMarketsGagraScreen visible={true} onClose={closeModal} />
        )}
        
        {/* Car Washes */}
        {isCarWashes && isSukhum && (
          <CarWashesSukhumScreen visible={true} onClose={closeModal} />
        )}
        {isCarWashes && isGagra && (
          <CarWashesGagraScreen visible={true} onClose={closeModal} />
        )}
        
        {/* Hotels */}
        {isHotels && isSukhum && (
          <HotelsSukhumScreen visible={true} onClose={closeModal} />
        )}
        {isHotels && isGagra && (
          <HotelsGagraScreen visible={true} onClose={closeModal} />
        )}
        
        {/* Parking Lots */}
        {isParkingLots && isSukhum && (
          <ParkingLotsSukhumScreen visible={true} onClose={closeModal} />
        )}
        {isParkingLots && isGagra && (
          <ParkingLotsGagraScreen visible={true} onClose={closeModal} />
        )}
        
        {/* Beaches */}
        {isBeaches && isSukhum && (
          <BeachesSukhumScreen visible={true} onClose={closeModal} />
        )}
        {isBeaches && isGagra && (
          <BeachesGagraScreen visible={true} onClose={closeModal} />
        )}
        
        {/* Clothing Repair */}
        {isClothingRepair && isSukhum && (
          <ClothingRepairSukhumScreen visible={true} onClose={closeModal} />
        )}
        {isClothingRepair && isGagra && (
          <ClothingRepairGagraScreen visible={true} onClose={closeModal} />
        )}
        
        {/* Restaurants */}
        {isRestaurants && isSukhum && (
          <RestaurantsSukhumScreen visible={true} onClose={closeModal} />
        )}
        {isRestaurants && isGagra && (
          <RestaurantsGagraScreen visible={true} onClose={closeModal} />
        )}
        
        {/* Gal Administrative Buildings */}
        {isAdminBuildings && isGal && (
          <AdministrativeBuildingsGalScreen visible={true} onClose={closeModal} />
        )}
        
        {/* Gal Churches */}
        {isChurches && isGal && (
          <ChurchesGalScreen visible={true} onClose={closeModal} />
        )}
        
        {/* Gal Beauty Salons */}
        {isBeautySalons && isGal && (
          <BeautySalonsGalScreen visible={true} onClose={closeModal} />
        )}
        
        {/* Gal Pharmacy */}
        {isPharmacy && isGal && (
          <PharmacyGalScreen visible={true} onClose={closeModal} />
        )}
        
        {/* Gal Wineries */}
        {isWineries && isGal && (
          <WineriesGalScreen visible={true} onClose={closeModal} />
        )}
        
        {/* Gal Gas Stations */}
        {isGasStations && isGal && (
          <GasStationsGalScreen visible={true} onClose={closeModal} />
        )}
        
        {/* Gal Cultural Attractions */}
        {isCulturalAttractions && isGal && (
          <CulturalAttractionsGalScreen visible={true} onClose={closeModal} />
        )}
        
        {/* Gal Shops and Markets */}
        {isShopsAndMarkets && isGal && (
          <ShopsAndMarketsGalScreen visible={true} onClose={closeModal} />
        )}
        
        {/* Gal Car Washes */}
        {isCarWashes && isGal && (
          <CarWashesGalScreen visible={true} onClose={closeModal} />
        )}
        
        {/* Gal Hotels */}
        {isHotels && isGal && (
          <HotelsGalScreen visible={true} onClose={closeModal} />
        )}
        
        {/* Gal Parking Lots */}
        {isParkingLots && isGal && (
          <ParkingLotsGalScreen visible={true} onClose={closeModal} />
        )}
        
        {/* Gal Beaches */}
        {isBeaches && isGal && (
          <BeachesGalScreen visible={true} onClose={closeModal} />
        )}
        
        {/* Gal Clothing Repair */}
        {isClothingRepair && isGal && (
          <ClothingRepairGalScreen visible={true} onClose={closeModal} />
        )}
        
        {/* Gal Restaurants */}
        {isRestaurants && isGal && (
          <RestaurantsGalScreen visible={true} onClose={closeModal} />
        )}
        
        {/* Gudauta Administrative Buildings */}
        {isAdminBuildings && isGudauta && (
          <AdministrativeBuildingsGudautaScreen visible={true} onClose={closeModal} />
        )}
        
        {/* Gudauta Churches */}
        {isChurches && isGudauta && (
          <ChurchesGudautaScreen visible={true} onClose={closeModal} />
        )}
        
        {/* Gudauta Beauty Salons */}
        {isBeautySalons && isGudauta && (
          <BeautySalonsGudautaScreen visible={true} onClose={closeModal} />
        )}
        
        {/* Gudauta Pharmacy */}
        {isPharmacy && isGudauta && (
          <PharmacyGudautaScreen visible={true} onClose={closeModal} />
        )}
        
        {/* Gudauta Wineries */}
        {isWineries && isGudauta && (
          <WineriesGudautaScreen visible={true} onClose={closeModal} />
        )}
        
        {/* Gudauta Gas Stations */}
        {isGasStations && isGudauta && (
          <GasStationsGudautaScreen visible={true} onClose={closeModal} />
        )}
        
        {/* Gudauta Cultural Attractions */}
        {isCulturalAttractions && isGudauta && (
          <CulturalAttractionsGudautaScreen visible={true} onClose={closeModal} />
        )}
        
        {/* Gudauta Shops and Markets */}
        {isShopsAndMarkets && isGudauta && (
          <ShopsAndMarketsGudautaScreen visible={true} onClose={closeModal} />
        )}
        
        {/* Gudauta Car Washes */}
        {isCarWashes && isGudauta && (
          <CarWashesGudautaScreen visible={true} onClose={closeModal} />
        )}
        
        {/* Gudauta Hotels */}
        {isHotels && isGudauta && (
          <HotelsGudautaScreen visible={true} onClose={closeModal} />
        )}
        
        {/* Gudauta Parking Lots */}
        {isParkingLots && isGudauta && (
          <ParkingLotsGudautaScreen visible={true} onClose={closeModal} />
        )}
        
        {/* Gudauta Beaches */}
        {isBeaches && isGudauta && (
          <BeachesGudautaScreen visible={true} onClose={closeModal} />
        )}
        
        {/* Gudauta Clothing Repair */}
        {isClothingRepair && isGudauta && (
          <ClothingRepairGudautaScreen visible={true} onClose={closeModal} />
        )}
        
        {/* Gudauta Restaurants */}
        {isRestaurants && isGudauta && (
          <RestaurantsGudautaScreen visible={true} onClose={closeModal} />
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    minHeight: 96,
    paddingTop: 44,
    paddingBottom: 10,
    paddingHorizontal: 12,
  },
  backButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  headerTitleWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  headerTitle: {
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: 16,
    color: '#000',
    textTransform: 'uppercase',
    letterSpacing: 0.2,
    marginTop: 24,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 60,
  },
  cityCard: {
    width: '100%',
    marginBottom: 8,
  },
  preview: {
    width: '100%',
  },
  cityName: {
    width: '100%',
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 17,
    textAlign: 'center',
    textTransform: 'uppercase',
    color: '#1129BD',
    paddingTop: 10,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  cityImage: {
    width: '100%',
    height: 215,
    marginTop: 0,
    borderRadius: 15,
  },
  cityImageInner: {
    borderRadius: 15,
  },
  expandedContent: {
    width: '100%',
    marginTop: 10,
    gap: 10,
  },
  description: {
    width: '100%',
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 17,
    color: '#000000',
    textAlign: 'left',
  },
  categoriesContainer: {
    width: '100%',
    marginTop: 10,
    gap: 20,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    gap: 15,
  },
  categoryArrow: {
    width: 11,
    height: 22,
    fontSize: 16,
    color: '#000',
  },
  categoryName: {
    flex: 1,
    fontFamily: 'Inter',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 17,
    color: '#000000',
  },
  categoryDisabled: {
    opacity: 0.5,
  },
});
