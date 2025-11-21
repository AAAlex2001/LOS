import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import config from '@/config';
import { extractPhoneNumber } from '../phoneUtils';

interface Repair {
  id: number;
  city: number;
  name: string;
  name_link: string;
  address: string;
  address_link: string;
  working_hours: string;
  contacts: string;
  description: string;
  services: string;
  image_url: string;
  order: number;
}

interface City {
  id: number;
  name: string;
  title?: string;
  order: number;
}

interface ClothingRepairPageData {
  title: string;
  city?: City;
  repairs: Repair[];
}

const API_BASE = config.API_BASE;

const toImageUrl = (url: string) => {
  if (!url) return undefined;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `${API_BASE}/media/${url}`;
};

export default function ClothingRepairGudautaScreen({ visible, onClose }: { visible: boolean, onClose: () => void }) {
  const [pageData, setPageData] = useState<ClothingRepairPageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!visible) return;
    
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/clothing-repair/page/city_page/${encodeURIComponent('Гудаута')}/`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load clothing repair');
        const json = await res.json() as ClothingRepairPageData;
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

  const repairs = (pageData?.repairs || []).slice().sort((a, b) => a.order - b.order);

  return (
    <Modal visible={visible} animationType="slide" transparent={false} presentationStyle="fullScreen" statusBarTranslucent>
      <View style={styles.container}>
        <View style={styles.headerBar}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <View style={styles.headerTitleWrap}>
            <Text style={styles.headerTitle}>{pageData?.title ? pageData.title.toUpperCase() : 'РЕМОНТ ОДЕЖДЫ'}</Text>
          </View>
          <View style={{ width: 36 }} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Загрузка...</Text>
            </View>
          ) : (
            repairs.map((repair) => (
              <View key={repair.id} style={styles.card}>
                {repair.image_url && (
                  <View style={styles.imageContainer}>
                    <Image source={{ uri: toImageUrl(repair.image_url) }} style={styles.cardImage} contentFit="cover" />
                  </View>
                )}
                
                <View style={styles.infoContainer}>
                  {repair.name && (repair.name_link ? (
                    <TouchableOpacity onPress={() => openLink(repair.name_link)}>
                      <Text style={[styles.repairName, styles.underline]}>{repair.name}</Text>
                    </TouchableOpacity>
                  ) : (
                    <Text style={styles.repairName}>{repair.name}</Text>
                  ))}
                  
                  {repair.address && (
                    <View style={styles.infoBlock}>
                      <Text style={styles.infoLabel}>Адрес:</Text>
                      {repair.address_link ? (
                        <TouchableOpacity onPress={() => openLink(repair.address_link)}>
                          <Text style={[styles.infoValue, styles.underline]}>{repair.address}</Text>
                        </TouchableOpacity>
                      ) : (
                        <Text style={styles.infoValue}>{repair.address}</Text>
                      )}
                    </View>
                  )}
                  
                  {repair.working_hours && (
                    <View style={styles.infoBlock}>
                      <Text style={styles.infoLabel}>Режим работы:</Text>
                      <Text style={styles.infoValue}>{repair.working_hours}</Text>
                    </View>
                  )}
                  
                  {repair.contacts && (
                    <View style={styles.infoBlock}>
                      <Text style={styles.infoLabel}>Контакты:</Text>
                      {extractPhoneNumber(repair.contacts) ? (
                        <TouchableOpacity onPress={() => {
                          const phone = extractPhoneNumber(repair.contacts);
                          if (phone) {
                            Linking.openURL(`tel:${phone}`);
                          }
                        }}>
                          <Text style={[styles.infoValue, styles.underline]}>{repair.contacts}</Text>
                        </TouchableOpacity>
                      ) : (
                        <Text style={styles.infoValue}>{repair.contacts}</Text>
                      )}
                    </View>
                  )}
                  
                  {repair.description && (
                    <View style={styles.infoBlock}>
                      <Text style={styles.infoLabel}>Описание:</Text>
                      <Text style={styles.infoValue}>{repair.description}</Text>
                    </View>
                  )}
                  
                  {repair.services && (
                    <View style={styles.infoBlock}>
                      <Text style={styles.infoLabel}>Услуги:</Text>
                      <Text style={styles.infoValue}>{repair.services}</Text>
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
  repairName: { fontFamily: 'Inter', fontWeight: '800', fontSize: 14, lineHeight: 17, color: '#1129BD' },
  infoBlock: { flexDirection: 'column', alignItems: 'flex-start', width: '100%', gap: 3 },
  infoLabel: { fontFamily: 'Inter', fontWeight: '700', fontSize: 14, lineHeight: 17, color: '#1129BD' },
  infoValue: { fontFamily: 'Inter', fontWeight: '400', fontSize: 14, lineHeight: 17, color: '#1129BD' },
  underline: { textDecorationLine: 'underline' },
});


