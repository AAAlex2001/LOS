import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Dimensions, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import config from '@/config';

const { width: screenWidth } = Dimensions.get('window');

type Props = { visible: boolean; onClose: () => void };

type RouteItem = {
  id: number;
  title?: string;
  name?: string;
  image?: string;
  site_url?: string;
  phone?: string;
  order: number;
};

type MountainRoutesPageData = {
  id: number;
  main_title: string;
  section_title: string;
  routes: RouteItem[];
};

const API_BASE = config.API_BASE;

export default function MountainRoutesScreen({ visible, onClose }: Props) {
  const [data, setData] = useState<MountainRoutesPageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!visible) return;
    
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/mountain-routes/page/content/`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load mountain routes');
        const json = await res.json() as MountainRoutesPageData;
        setData(json);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [visible]);

  const routes = (data?.routes || []).slice().sort((a, b) => a.order - b.order);
  const topRow = routes.slice(0, 3);
  const bottomRow = routes.slice(3);

  const openLink = (url?: string) => {
    if (!url) return;
    const clean = url.startsWith('http') ? url : url.replace('САЙТ: ', '');
    Linking.openURL(clean).catch(() => {});
  };

  const toImageUrl = (p?: string) => (p ? (p.startsWith('http') ? p : `${API_BASE}${p}`) : '');

  const renderCard = (route: RouteItem) => (
    <View key={route.id} style={styles.card}>
      {route.image && (
        <Image source={{ uri: toImageUrl(route.image) }} style={styles.cardImg} resizeMode="contain" />
      )}
      <View style={styles.cardBody}>
        {route.title && <Text style={styles.cardTitle}>{route.title}</Text>}
        {route.name && <Text style={styles.cardName}>{route.name}</Text>}
        {route.phone && !route.image && <Text style={styles.cardPhone}>Тел.: {route.phone}</Text>}
        {route.phone && route.image && <Text style={styles.phone}>Контакты: {route.phone}</Text>}
        {route.site_url && (
          <Text onPress={() => openLink(route.site_url)} style={styles.link}>САЙТ: {route.site_url}</Text>
        )}
      </View>
    </View>
  );

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View style={styles.container}>
        <View style={styles.headerBar}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <View style={styles.headerTitleWrap}>
            <Text style={styles.headerTitle}>ГОРНЫЕ МАРШРУТЫ</Text>
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
              <Text style={styles.pageTitle}>{data?.main_title || 'Горные маршруты'}</Text>
              <View style={styles.row}>{topRow.map(renderCard)}</View>
              <View style={styles.row}>{bottomRow.map(renderCard)}</View>
            </>
          )}
        </ScrollView>
      </View>
    </Modal>
  );
}

const CARD_WIDTH = screenWidth - 32;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  headerBar: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: '#fff', height: 96, paddingTop: 44, paddingHorizontal: 12,
    borderBottomWidth: 1, borderBottomColor: '#E2E4E6',
  },
  backButton: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center', marginTop: 24 },
  headerTitleWrap: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  headerTitle: { fontFamily: 'Inter', fontWeight: '700', fontSize: 16, color: '#000', textTransform: 'uppercase', letterSpacing: 0.2, marginTop: 24, textAlign: 'center' },
  scrollContent: { padding: 16, paddingBottom: 40 },
  pageTitle: { fontFamily: 'Inter', fontWeight: '800', fontSize: 22, color: '#1129BD', marginBottom: 12, textAlign: 'center' },
  row: { gap: 16, marginBottom: 16 },
  card: { width: CARD_WIDTH, borderRadius: 12, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E2E4E6', overflow: 'hidden' },
  cardImg: { width: '100%', height: 160, backgroundColor: '#F5F7FF' },
  cardBody: { padding: 12, gap: 6 },
  cardTitle: { fontFamily: 'Inter', fontWeight: '700', fontSize: 18, color: '#000' },
  cardName: { fontFamily: 'Inter', fontWeight: '600', fontSize: 16, color: '#000' },
  cardPhone: { fontFamily: 'Inter', fontWeight: '400', fontSize: 16, color: '#000' },
  phone: { fontFamily: 'Inter', fontWeight: '400', fontSize: 16, color: '#000' },
  link: { fontFamily: 'Inter', fontWeight: '600', fontSize: 16, color: '#1129BD', textDecorationLine: 'underline' },
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
});
