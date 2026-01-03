import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import config from '@/config';
import { parseContactString } from '../phoneUtils';
import {useTranslation, addLangParam} from '@/i18n';

interface Building {
  id: number;
  city: number;
  name: string;
  name_link: string;
  working_hours: string;
  address: string;
  address_link: string;
  contacts: string;
  image_url: string;
  order: number;
}

interface City {
  id: number;
  name: string;
  title?: string;
  order: number;
}

interface AdministrativeBuildingsPageData {
  title: string;
  city?: City;
  buildings: Building[];
}

const API_BASE = config.API_BASE;

const toImageUrl = (url: string) => {
  if (!url) return undefined;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `${API_BASE}/media/${url}`;
};

export default function AdministrativeBuildingsPitsundaScreen({ visible, onClose }: { visible: boolean, onClose: () => void }) {
  const { t } = useTranslation();
  const [pageData, setPageData] = useState<AdministrativeBuildingsPageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!visible) return;
    
    const load = async () => {
      try {
        const res = await fetch(addLangParam(`${API_BASE}/api/administrative-buildings/page/city_page/${encodeURIComponent(t('cities.pitsunda'))}/`), { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load administrative buildings');
        const json = await res.json() as AdministrativeBuildingsPageData;
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

  const buildings = (pageData?.buildings || []).slice().sort((a, b) => a.order - b.order);

  return (
    <Modal visible={visible} animationType="slide" transparent={false} presentationStyle="fullScreen" statusBarTranslucent>
      <View style={styles.container}>
        <View style={styles.headerBar}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <View style={styles.headerTitleWrap}>
            <Text style={styles.headerTitle}>{pageData?.title ? pageData.title.toUpperCase() : t('categories.administrative')}</Text>
          </View>
          <View style={{ width: 36 }} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>{t('common.loading')}</Text>
            </View>
          ) : (
            buildings.map((building) => (
              <View key={building.id} style={styles.card}>
                {building.image_url && (
                  <View style={styles.imageContainer}>
                    <Image source={{ uri: toImageUrl(building.image_url) }} style={styles.cardImage} contentFit="cover" />
                  </View>
                )}
                
                <View style={styles.infoContainer}>
                  {building.name && (building.name_link ? (
                    <TouchableOpacity onPress={() => openLink(building.name_link)}>
                      <Text style={[styles.buildingName, styles.underline]}>{building.name}</Text>
                    </TouchableOpacity>
                  ) : (
                    <Text style={styles.buildingName}>{building.name}</Text>
                  ))}
                  
                  {building.working_hours && (
                    <View style={styles.infoBlock}>
                      <Text style={styles.infoLabel}>{t('common.hours')}</Text>
                      <Text style={styles.infoValue}>{building.working_hours}</Text>
                    </View>
                  )}
                  
                  {building.address && (
                    <View style={styles.infoBlock}>
                      <Text style={styles.infoLabel}>{t('common.address')}</Text>
                      {building.address_link ? (
                        <TouchableOpacity onPress={() => openLink(building.address_link)}>
                          <Text style={[styles.infoValue, styles.underline]}>{building.address}</Text>
                        </TouchableOpacity>
                      ) : (
                        <Text style={styles.infoValue}>{building.address}</Text>
                      )}
                    </View>
                  )}
                  
                  {building.contacts && (
                    <View style={styles.infoBlock}>
                      <Text style={styles.infoLabel}>{t('common.contacts')}</Text>
                      <Text style={styles.infoValue}>
                        {parseContactString(building.contacts).map((segment, index) => {
                          if (segment.type === 'phone' || segment.type === 'email') {
                            return (
                              <Text
                                key={index}
                                style={[styles.infoValue, styles.underline]}
                                onPress={() => segment.url && Linking.openURL(segment.url)}
                              >
                                {segment.value}
                              </Text>
                            );
                          }
                          return <Text key={index}>{segment.value}</Text>;
                        })}
                      </Text>
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
  buildingName: { fontFamily: 'Inter', fontWeight: '800', fontSize: 14, lineHeight: 17, color: '#1129BD' },
  infoBlock: { flexDirection: 'column', alignItems: 'flex-start', width: '100%', gap: 3 },
  infoLabel: { fontFamily: 'Inter', fontWeight: '700', fontSize: 14, lineHeight: 17, color: '#1129BD' },
  infoValue: { fontFamily: 'Inter', fontWeight: '400', fontSize: 14, lineHeight: 17, color: '#1129BD' },
  underline: { textDecorationLine: 'underline' },
});


