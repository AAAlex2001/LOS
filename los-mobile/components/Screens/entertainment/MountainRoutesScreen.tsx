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

  const openLink = (url?: string) => {
    if (!url) return;
    const clean = url.startsWith('http') ? url : url.replace('САЙТ: ', '');
    Linking.openURL(clean).catch(() => {});
  };

  const toImageUrl = (p?: string) => {
    if (!p) return '';
    if (p.startsWith('http')) return p;
    if (p.startsWith('/media/')) return `${API_BASE}${p}`;
    return `${API_BASE}/media/${p}`;
  };

  const renderCard = (route: RouteItem) => {
    return (
      <View key={route.id} style={styles.card}>
        {route.image && (
          <Image source={{ uri: toImageUrl(route.image) }} style={styles.cardImg} resizeMode="contain" />
        )}
        <View style={styles.cardBody}>
          {route.title && <Text style={styles.cardTitle}>{route.title}</Text>}
          {route.name && <Text style={styles.cardName}>{route.name}</Text>}
          {route.phone && <Text style={styles.cardPhone}>{route.phone}</Text>}
          {route.site_url && (
            <Text onPress={() => openLink(route.site_url)} style={styles.link}>САЙТ: {route.site_url}</Text>
          )}
        </View>
      </View>
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
            routes.map(renderCard)
          )}
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  headerBar: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: '#fff', minHeight: 96, paddingTop: 44, paddingBottom: 10, paddingHorizontal: 12,
  },
  backButton: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center', marginTop: 24 },
  headerTitleWrap: { flex: 1, flexDirection: 'row', alignItems: 'center', marginLeft: 20 },
  headerTitle: { fontFamily: 'Inter', fontWeight: '700', fontSize: 16, color: '#000', textTransform: 'uppercase', letterSpacing: 0.2, marginTop: 24, textAlign: 'center' },
  scrollContent: { padding: 20, paddingBottom: 40, gap: 20 },
  card: { flexDirection: 'column', alignItems: 'center', padding: 20, gap: 20, minHeight: 180, backgroundColor: 'rgba(17, 41, 189, 0.1)', borderWidth: 1, borderColor: '#D5DAEF', borderRadius: 15 },
  cardImg: { width: '100%', height: 178, borderRadius: 15 },
  cardBody: { flexDirection: 'column', alignItems: 'center', gap: 10 },
  cardTitle: { fontFamily: 'Inter', fontWeight: '700', fontSize: 14, lineHeight: 17, textTransform: 'uppercase', textAlign: 'center', color: '#1129BD' },
  cardName: { fontFamily: 'Inter', fontWeight: '400', fontSize: 14, lineHeight: 17, textAlign: 'center', color: '#1129BD' },
  cardPhone: { fontFamily: 'Inter', fontWeight: '400', fontSize: 14, lineHeight: 17, textAlign: 'center', color: '#1129BD' },
  link: { fontFamily: 'Inter', fontWeight: '400', fontSize: 14, lineHeight: 17, textAlign: 'center', color: '#1129BD', textDecorationLine: 'underline' },
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
