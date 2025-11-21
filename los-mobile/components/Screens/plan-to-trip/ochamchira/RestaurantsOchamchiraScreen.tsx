import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import config from '@/config';
import { extractPhoneNumber } from '../phoneUtils';

interface Restaurant {
  id: number;
  city: number;
  name: string;
  name_link: string;
  website: string;
  address: string;
  address_link: string;
  phone: string;
  working_hours: string;
  image_url: string;
  order: number;
}

interface City {
  id: number;
  name: string;
  title?: string;
  order: number;
}

interface RestaurantsPageData {
  title: string;
  city?: City;
  restaurants: Restaurant[];
}

const API_BASE = config.API_BASE;

const toImageUrl = (url: string) => {
  if (!url) return undefined;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `${API_BASE}/media/${url}`;
};

export default function RestaurantsOchamchiraScreen({ visible, onClose }: { visible: boolean, onClose: () => void }) {
  const [pageData, setPageData] = useState<RestaurantsPageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!visible) return;
    
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/restaurants/page/city_page/${encodeURIComponent('Очамчыра')}/`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load restaurants');
        const json = await res.json() as RestaurantsPageData;
        setPageData(json);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [visible]);

  const openLink = async (url: string) => {
    if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      }
    }
  };

  const restaurants = (pageData?.restaurants || []).slice().sort((a, b) => a.order - b.order);

  return (
    <Modal visible={visible} animationType="slide" transparent={false} presentationStyle="fullScreen" statusBarTranslucent>
      <View style={styles.container}>
        <View style={styles.headerBar}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <View style={styles.headerTitleWrap}>
            <Text style={styles.headerTitle}>{pageData?.title ? pageData.title.toUpperCase() : 'РЕСТОРАНЫ'}</Text>
          </View>
          <View style={{ width: 36 }} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Загрузка...</Text>
            </View>
          ) : (
            restaurants.map((restaurant) => (
              <View key={restaurant.id} style={styles.card}>
                {restaurant.image_url && (
                  <View style={styles.imageContainer}>
                    <Image source={{ uri: toImageUrl(restaurant.image_url) }} style={styles.cardImage} contentFit="cover" />
                  </View>
                )}
                
                <View style={styles.infoContainer}>
                  {restaurant.name && (restaurant.name_link ? (
                    <TouchableOpacity onPress={() => openLink(restaurant.name_link)}>
                      <Text style={[styles.restaurantName, styles.underline]}>{restaurant.name}</Text>
                    </TouchableOpacity>
                  ) : (
                    <Text style={styles.restaurantName}>{restaurant.name}</Text>
                  ))}
                  
                  {restaurant.address && (
                    <View style={styles.infoBlock}>
                      <Text style={styles.infoLabel}>Адрес:</Text>
                      {restaurant.address_link ? (
                        <TouchableOpacity onPress={() => openLink(restaurant.address_link)}>
                          <Text style={[styles.infoValue, styles.underline]}>{restaurant.address}</Text>
                        </TouchableOpacity>
                      ) : (
                        <Text style={styles.infoValue}>{restaurant.address}</Text>
                      )}
                    </View>
                  )}
                  
                  {restaurant.working_hours && (
                    <View style={styles.infoBlock}>
                      <Text style={styles.infoLabel}>Часы работы:</Text>
                      <Text style={styles.infoValue}>{restaurant.working_hours}</Text>
                    </View>
                  )}
                  
                  {restaurant.phone && (
                    <View style={styles.infoBlock}>
                      <Text style={styles.infoLabel}>Телефон:</Text>
                      {extractPhoneNumber(restaurant.phone) ? (
                        <TouchableOpacity onPress={() => {
                          const phone = extractPhoneNumber(restaurant.phone);
                          if (phone) {
                            Linking.openURL(`tel:${phone}`);
                          }
                        }}>
                          <Text style={[styles.infoValue, styles.underline]}>{restaurant.phone}</Text>
                        </TouchableOpacity>
                      ) : (
                        <Text style={styles.infoValue}>{restaurant.phone}</Text>
                      )}
                    </View>
                  )}
                  
                  {restaurant.website && (
                    <View style={styles.infoBlock}>
                      <Text style={styles.infoLabel}>Сайт:</Text>
                      <TouchableOpacity onPress={() => openLink(restaurant.website)}>
                        <Text style={[styles.infoValue, styles.underline]}>{restaurant.website}</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>
            ))
          )}
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  headerBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#fff', minHeight: 96, paddingTop: 44, paddingBottom: 10, paddingHorizontal: 12 },
  backButton: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center', marginTop: 24 },
  headerTitleWrap: { flex: 1, flexDirection: 'row', alignItems: 'center', marginLeft: 20 },
  headerTitle: { fontFamily: 'Inter', fontWeight: '700', fontSize: 16, color: '#000', textTransform: 'uppercase', letterSpacing: 0.2, marginTop: 24 },
  scrollContent: { padding: 20, paddingBottom: 40 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 100 },
  loadingText: { fontSize: 18, color: '#666' },
  card: { flexDirection: 'column', alignItems: 'flex-start', marginBottom: 20, backgroundColor: '#fff', gap: 8, width: '100%' },
  imageContainer: { width: '100%', height: 226, borderRadius: 15, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(185, 185, 185, 0.85)', backgroundColor: '#fff' },
  cardImage: { width: '100%', height: '100%' },
  infoContainer: { flexDirection: 'column', alignItems: 'flex-start', padding: 10, gap: 8, width: '100%', backgroundColor: 'rgba(17, 41, 189, 0.1)', borderWidth: 1, borderColor: '#D5DAEF', borderRadius: 15 },
  restaurantName: { fontFamily: 'Inter', fontWeight: '800', fontSize: 14, lineHeight: 17, color: '#1129BD' },
  infoBlock: { flexDirection: 'column', alignItems: 'flex-start', width: '100%', gap: 3 },
  infoLabel: { fontFamily: 'Inter', fontWeight: '700', fontSize: 14, lineHeight: 17, color: '#1129BD' },
  infoValue: { fontFamily: 'Inter', fontWeight: '400', fontSize: 14, lineHeight: 17, color: '#1129BD' },
  underline: { textDecorationLine: 'underline' },
});


