import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Dimensions, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import config from '@/config';

const { width: screenWidth } = Dimensions.get('window');

type Props = { visible: boolean; onClose: () => void };

type ExcursionCard = {
  id: number;
  img?: string;
  contacts: string;
  site: string;
};

const API_BASE = config.API_BASE;

export default function ExcursionsScreen({ visible, onClose }: Props) {
  const [services, setServices] = useState<ExcursionCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!visible) return;
    
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/excursions/page/content/`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load excursions');
        const json = await res.json();
        const srv = (json?.services || []).map((s: any): ExcursionCard => ({
          id: s.id,
          img: s.image_url ? `${API_BASE}/media/${s.image_url}` : undefined,
          contacts: s.contacts,
          site: s.site,
        }));
        setServices(srv);
      } catch (e) {
        console.error(e);
        setServices([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [visible]);

  const openLink = (url: string) => Linking.openURL(url).catch(() => {});

  const renderCard = (item: ExcursionCard) => (
    <View key={item.id} style={styles.card}>
      {item.img && <Image source={{ uri: item.img }} style={styles.cardImg} resizeMode="contain" />}
      <View style={styles.cardBody}>
        <Text style={styles.cardContacts}>{item.contacts}</Text>
        <Text style={styles.link} onPress={() => openLink(item.site)}>САЙТ: {item.site}</Text>
      </View>
    </View>
  );

  const topRow = services.slice(0, 3);
  const bottomRow = services.slice(3);

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View style={styles.container}>
        <View style={styles.headerBar}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <View style={styles.headerTitleWrap}>
            <Text style={styles.headerTitle}>ЭКСКУРСИИ</Text>
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
              <Text style={styles.pageTitle}>Экскурсии</Text>
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
    backgroundColor: '#fff', minHeight: 96, paddingTop: 44, paddingBottom: 10, paddingHorizontal: 12,
  },
  backButton: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center', marginTop: 24 },
  headerTitleWrap: { flex: 1, flexDirection: 'row', alignItems: 'center', marginLeft: 20 },
  headerTitle: { fontFamily: 'Inter', fontWeight: '700', fontSize: 16, color: '#000', textTransform: 'uppercase', letterSpacing: 0.2, marginTop: 24, textAlign: 'center' },
  scrollContent: { padding: 20, paddingBottom: 40 },
  pageTitle: { fontFamily: 'Inter', fontWeight: '800', fontSize: 22, color: '#1129BD', marginBottom: 12, textAlign: 'center' },
  row: { gap: 16, marginBottom: 16 },
  card: { width: CARD_WIDTH, borderRadius: 12, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E2E4E6', overflow: 'hidden' },
  cardImg: { width: '100%', height: 140, backgroundColor: '#F5F7FF' },
  cardBody: { padding: 12, gap: 6 },
  cardContacts: { fontFamily: 'Inter', fontWeight: '400', fontSize: 16, color: '#000' },
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
