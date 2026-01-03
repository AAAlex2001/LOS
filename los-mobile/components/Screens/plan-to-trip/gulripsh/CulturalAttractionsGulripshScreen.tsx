import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import config from '@/config';
import {useTranslation, addLangParam} from '@/i18n';

interface CulturalAttraction {
  id: number;
  city: number;
  name: string;
  name_link: string;
  description: string;
  address: string;
  address_link: string;
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

interface CulturalAttractionsPageData {
  title: string;
  city?: City;
  attractions: CulturalAttraction[];
}

const API_BASE = config.API_BASE;

const toImageUrl = (url: string) => {
  if (!url) return undefined;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `${API_BASE}/media/${url}`;
};

export default function CulturalAttractionsGulripshScreen({ visible, onClose }: { visible: boolean, onClose: () => void }) {
  const { t } = useTranslation();
  const [pageData, setPageData] = useState<CulturalAttractionsPageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!visible) return;
    
    const load = async () => {
      try {
        const res = await fetch(addLangParam(`${API_BASE}/api/cultural-attractions/page/city_page/${encodeURIComponent(t('cities.gulripsh'))}/`), { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load cultural attractions');
        const json = await res.json() as CulturalAttractionsPageData;
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

  const attractions = (pageData?.attractions || []).slice().sort((a, b) => a.order - b.order);

  return (
    <Modal visible={visible} animationType="slide" transparent={false} presentationStyle="fullScreen" statusBarTranslucent>
      <View style={styles.container}>
        <View style={styles.headerBar}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <View style={styles.headerTitleWrap}>
            <Text style={styles.headerTitle}>{pageData?.title ? pageData.title.toUpperCase() : t('categories.attractions')}</Text>
          </View>
          <View style={{ width: 36 }} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>{t('common.loading')}</Text>
            </View>
          ) : (
            attractions.map((attraction) => (
              <View key={attraction.id} style={styles.card}>
                {attraction.image_url && (
                  <View style={styles.imageContainer}>
                    <Image source={{ uri: toImageUrl(attraction.image_url) }} style={styles.cardImage} contentFit="cover" />
                  </View>
                )}
                
                <View style={styles.textContainer}>
                  {attraction.name && (
                    <View style={styles.titleContainer}>
                      {attraction.name_link ? (
                        <TouchableOpacity onPress={() => openLink(attraction.name_link)} style={styles.titleTextContainer}>
                          <Text style={[styles.titleText, styles.underline]}>{attraction.name}</Text>
                        </TouchableOpacity>
                      ) : (
                        <Text style={styles.titleText}>{attraction.name}</Text>
                      )}
                    </View>
                  )}
                  
                  {attraction.description && (
                    <View style={styles.descriptionContainer}>
                      <Text style={styles.descriptionText}>{attraction.description}</Text>
                    </View>
                  )}
                  
                  {attraction.address && (
                    <View style={styles.infoBlock}>
                      {attraction.address_link ? (
                        <TouchableOpacity onPress={() => openLink(attraction.address_link)}>
                          <Text style={[styles.infoValue, styles.underline]}>Адрес: {attraction.address}</Text>
                        </TouchableOpacity>
                      ) : (
                        <Text style={styles.infoValue}>Адрес: {attraction.address}</Text>
                      )}
                    </View>
                  )}
                  
                  {attraction.working_hours && (
                    <View style={styles.infoBlock}>
                      <Text style={styles.infoValue}>Режим работы: {attraction.working_hours}</Text>
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
  card: { flexDirection: 'column', alignItems: 'flex-start', marginBottom: 40, backgroundColor: '#fff', gap: 8, width: '100%' },
  imageContainer: { width: '100%', height: 287, borderRadius: 15, overflow: 'hidden' },
  cardImage: { width: '100%', height: '100%' },
  textContainer: { flexDirection: 'column', alignItems: 'center', width: '100%', gap: 10 },
  titleContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10, paddingTop: 8, width: '100%' },
  titleTextContainer: { width: '100%', alignItems: 'center' },
  titleText: { fontFamily: 'Inter', fontWeight: '700', fontSize: 14, lineHeight: 17, textAlign: 'center', color: '#1129BD' },
  descriptionContainer: { paddingHorizontal: 10, paddingBottom: 10, width: '100%' },
  descriptionText: { fontFamily: 'Inter', fontWeight: '400', fontSize: 14, lineHeight: 17, color: '#000000' },
  infoBlock: { paddingHorizontal: 10, width: '100%' },
  infoValue: { fontFamily: 'Inter', fontWeight: '400', fontSize: 14, lineHeight: 17, color: '#000000' },
  underline: { textDecorationLine: 'underline' },
});


