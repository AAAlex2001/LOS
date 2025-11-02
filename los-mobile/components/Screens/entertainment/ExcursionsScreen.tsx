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
            services.map(renderCard)
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
  cardImg: { width: '100%', maxWidth: 240, aspectRatio: 240/145 },
  cardBody: { width: '100%', flexDirection: 'column', alignItems: 'center', gap: 10 },
  cardContacts: { fontFamily: 'Inter', fontWeight: '400', fontSize: 14, lineHeight: 17, textAlign: 'center', color: '#1129BD' },
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
