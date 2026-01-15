import React, { useState, useEffect, useMemo } from 'react';
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
import { screensRegistry } from './screensRegistry';
import { slugify } from './helpers/slug';
import { useTranslation, addLangParam } from '@/i18n';

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
  const { t } = useTranslation();
  const [data, setData] = useState<CitiesPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedCity, setExpandedCity] = useState<number[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeCity, setActiveCity] = useState<string | null>(null);

  useEffect(() => {
    if (!visible) return;

    const load = async () => {
      try {
        const url = addLangParam(`${API_BASE}/api/cities/page/content/`);
        const res = await fetch(url, { cache: 'no-store' });
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

    const cityAlias: Record<string, string> = {
      'сухум': 'sukhum',
      'гагра': 'gagra',
      'гал': 'gal',
      'гудаута': 'gudauta',
      'гулрыпш': 'gulripsh',
      'новый-афон': 'new-afon',
      'пицунда': 'pitsunda',
      'ткуарчал': 'tkuarchal',
      'очамчыра': 'ochamchira',
    };

    let citySlug = slugify(cityName);
    citySlug = cityAlias[citySlug] || citySlug;
    let categorySlug = slugify(category.url.split('/')[0] || '');
    if (!screensRegistry[citySlug]?.[categorySlug]) {
      const nameSlug = slugify(category.name);
      const alias: Record<string, string> = {
        'административные-здания': 'administrative-buildings',
        'церкви': 'churches',
        'салоны-красоты': 'beauty-salons',
        'аптеки': 'pharmacy',
        'винодельни': 'wineries',
        'азс': 'gas-stations',
        'достопримечательности': 'cultural-attractions',
        'магазины': 'shops-and-markets',
        'магазины-и-рынки': 'shops-and-markets',
        'автомойки': 'car-washes',
        'гостиницы': 'hotels',
        'парковки': 'parking-lots',
        'пляжи': 'beaches',
        'ремонт-одежды': 'clothing-repair',
        'рестораны': 'restaurants',
      };
      categorySlug = alias[nameSlug] || nameSlug;
    }

    if (!screensRegistry[citySlug]?.[categorySlug]) {
      return;
    }

    setActiveCategory(categorySlug);
    setActiveCity(citySlug);
  };

  const closeModal = () => {
    setActiveCategory(null);
    setActiveCity(null);
  };

  const ActiveScreen = useMemo(() => {
    if (!activeCity || !activeCategory) return null;
    return screensRegistry[activeCity]?.[activeCategory] ?? null;
  }, [activeCity, activeCategory]);

  return (
    <Modal visible={visible} animationType="slide" transparent={false} presentationStyle="fullScreen" statusBarTranslucent>
      <View style={styles.container}>
        <View style={styles.headerBar}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <View style={styles.headerTitleWrap}>
            <Text style={styles.headerTitle}>{t('plan_trip.cities')}</Text>
          </View>
          <View style={{ width: 36 }} />
        </View>

        {loading ? (
          <View style={styles.centerContent}>
            <Text style={styles.loadingText}>{t('common.loading')}</Text>
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
                  <View style={styles.imageContainer}>
                    <ImageBackground
                      source={{ uri: toImageUrl(city.image_url) }}
                      style={styles.cityImage}
                      imageStyle={styles.cityImageInner}
                    >
                      {!expandedCity.includes(city.id) && <View style={styles.darkOverlay} />}
                      {!expandedCity.includes(city.id) && (
                        <View style={styles.bottomTextContainer}>
                          <Text style={styles.bottomText}>{t('common.see_more')}</Text>
                        </View>
                      )}
                    </ImageBackground>
                  </View>
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
        
        {/* Render active screen from registry */}
        {ActiveScreen && <ActiveScreen visible={true} onClose={closeModal} />}
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
    height: 250,
    marginTop: 0,
    borderRadius: 15,
  },
  cityImageInner: {
    borderRadius: 15,
  },
  imageContainer: {
    width: '100%',
    height: 250,
    borderRadius: 15,
    overflow: 'hidden',
  },
  darkOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
  bottomTextContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 16,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  bottomText: {
    fontFamily: 'Inter',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 17,
    color: '#FFFFFF',
    textAlign: 'center',
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
