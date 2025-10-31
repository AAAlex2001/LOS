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
          <ScrollView style={styles.scrollContent}>
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
                          <View key={category.id} style={styles.categoryItem}>
                            <Text style={styles.categoryArrow}>›</Text>
                            <Text style={styles.categoryName}>{category.name}</Text>
                          </View>
                        ))}
                      </View>
                    )}
                  </View>
                )}
              </View>
            ))}
          </ScrollView>
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
    paddingBottom: 40,
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
});

