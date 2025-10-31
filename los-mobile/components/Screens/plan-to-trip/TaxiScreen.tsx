import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView, Linking, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import config from '@/config';

interface TaxiService {
  id: number;
  name: string;
  working_hours: string;
  phones: string[];
  site: string;
  image_url: string;
  order: number;
}

interface TaxiPageData {
  services: TaxiService[];
  intro_text: string;
  hero_image_url: string;
}

const API_BASE = config.API_BASE;

const toImageUrl = (url: string) => {
  if (!url) return undefined;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `${API_BASE}/media/${url}`;
};

export default function TaxiScreen({ visible, onClose }: { visible: boolean, onClose: () => void }) {
  const [pageData, setPageData] = useState<TaxiPageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!visible) return;
    
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/taxi/page/content/`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load taxi');
        const json = await res.json() as TaxiPageData;
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
    if (url && (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('tel:'))) {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      }
    }
  };

  const callPhone = async (phone: string) => {
    const cleanPhone = phone.replace(/[^\d+]/g, '');
    await openLink(`tel:${cleanPhone}`);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerBar}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <View style={styles.headerTitleWrap}>
            <Text style={styles.headerTitle}>СЛУЖБЫ ТАКСИ</Text>
          </View>
          <View style={{ width: 36 }} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Загрузка...</Text>
            </View>
          ) : (
            <>
              {/* Banner */}
              {pageData?.hero_image_url && pageData.intro_text && (
                <View style={styles.bannerContainer}>
                  <ImageBackground
                    source={{ uri: toImageUrl(pageData.hero_image_url) }}
                    style={styles.banner}
                    imageStyle={styles.bannerImage}
                  >
                    <Text style={styles.bannerText}>{pageData.intro_text}</Text>
                  </ImageBackground>
                </View>
              )}

              {/* Taxi Cards */}
              {pageData?.services && pageData.services.map((service) => (
                <View key={service.id} style={styles.card}>
                  {/* Logo */}
                  {service.image_url && (
                    <Image 
                      source={{ uri: toImageUrl(service.image_url) }}
                      style={styles.logo}
                      contentFit="contain"
                    />
                  )}
                  
                  {/* Info */}
                  <View style={styles.cardBody}>
                    {service.site ? (
                      <TouchableOpacity onPress={() => openLink(service.site)}>
                        <Text style={styles.cardTitle}>{service.name}</Text>
                      </TouchableOpacity>
                    ) : (
                      <Text style={styles.cardTitle}>{service.name}</Text>
                    )}
                    
                    {service.working_hours && (
                      <Text style={styles.workingHours}>Время работы: {service.working_hours}</Text>
                    )}
                    
                    <Text style={styles.orderLabel}>Заказать такси:</Text>
                    
                    {service.phones && service.phones.map((phone, idx) => (
                      <TouchableOpacity key={idx} onPress={() => callPhone(phone)}>
                        <Text style={styles.phone}>{phone}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              ))}
            </>
          )}
        </ScrollView>
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
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  loadingText: {
    fontSize: 18,
    color: '#666',
  },
  bannerContainer: {
    marginBottom: 20,
    borderRadius: 15,
    overflow: 'hidden',
    width: '100%',
  },
  banner: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 83,
  },
  bannerImage: {
    borderRadius: 15,
      width: '100%'
  },
  bannerText: {
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 17,
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.85)',
    flexShrink: 1,
      padding: 15,
  },
  card: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 16,
    gap: 16,
    backgroundColor: 'rgba(17, 41, 189, 0.1)',
    borderWidth: 1,
    borderColor: '#D5DAEF',
    borderRadius: 15,
    marginBottom: 20,
  },
  logo: {
    width: 140,
    height: 140,
  },
  cardBody: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
    width: '100%',
  },
  cardTitle: {
    fontFamily: 'Inter',
    fontWeight: '800',
    fontSize: 14,
    lineHeight: 17,
    textAlign: 'center',
    textDecorationLine: 'underline',
    color: '#1129BD',
  },
  workingHours: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 17,
    textAlign: 'center',
    color: '#1129BD',
  },
  orderLabel: {
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 17,
    textAlign: 'center',
    color: '#1129BD',
  },
  phone: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 17,
    textAlign: 'center',
    color: '#1129BD',
  },
});
