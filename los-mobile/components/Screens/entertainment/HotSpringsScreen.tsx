import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import config from '@/config';

const { width: screenWidth } = Dimensions.get('window');

type Props = { visible: boolean; onClose: () => void };

type Spring = {
  id: number;
  title: string;
  description: string;
  image_url: string;
  order: number;
};

type SpringsPage = {
  springs: Spring[];
  hero_text?: string;
  hero_background_url?: string;
};

const API_BASE = config.API_BASE;

const parseBoldText = (text: string) => {
  if (!text) return '';
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <Text key={index} style={styles.boldText}>
          {part.slice(2, -2)}
        </Text>
      );
    }
    return part;
  });
};

export default function HotSpringsScreen({ visible, onClose }: Props) {
  const [data, setData] = useState<SpringsPage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!visible) return;
    
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/hot-springs/page/content/`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load hot springs');
        const json = await res.json() as SpringsPage;
        setData(json);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [visible]);

  const springs = (data?.springs || []).slice().sort((a, b) => a.order - b.order);

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View style={styles.container}>
        <View style={styles.headerBar}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <View style={styles.headerTitleWrap}>
            <Text style={styles.headerTitle}>ГОРЯЧИЕ ИСТОЧНИКИ</Text>
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
              <Text style={styles.pageTitle}>Горячие источники</Text>
              {data?.hero_text && (
                <View style={styles.banner}>
                  <Text style={styles.bannerText}>{data.hero_text}</Text>
                </View>
              )}

              <View style={styles.cardsContainer}>
                {springs.map((s) => (
                  <View key={s.id} style={styles.card}>
                    <Image
                      source={{ uri: `${API_BASE}/media/${s.image_url}` }}
                      style={styles.cardImg}
                      resizeMode="cover"
                    />
                    <Text style={styles.cardTitle}>{s.title}</Text>
                    {s.description && (
                      <Text style={styles.cardDescription}>{parseBoldText(s.description)}</Text>
                    )}
                  </View>
                ))}
              </View>
            </>
          )}
        </ScrollView>
      </View>
    </Modal>
  );
}

const CARD_WIDTH = screenWidth - 40;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  headerBar: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: '#fff', minHeight: 96, paddingTop: 44, paddingBottom: 10, paddingHorizontal: 12,
    borderBottomWidth: 1, borderBottomColor: '#E2E4E6',
  },
  backButton: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center', marginTop: 24 },
  headerTitleWrap: { flex: 1, flexDirection: 'row', alignItems: 'center', marginLeft: 20 },
  headerTitle: { fontFamily: 'Inter', fontWeight: '700', fontSize: 16, color: '#000', textTransform: 'uppercase', letterSpacing: 0.2, marginTop: 24, textAlign: 'center' },
  scrollContent: { padding: 20, paddingBottom: 40 },
  pageTitle: { fontFamily: 'Inter', fontWeight: '800', fontSize: 22, color: '#1129BD', marginBottom: 12, textAlign: 'center' },
  banner: { backgroundColor: '#EFF3FF', borderRadius: 12, padding: 12, marginBottom: 16 },
  bannerText: { fontFamily: 'Inter', fontWeight: '600', fontSize: 14, lineHeight: 17, color: 'rgba(0,0,0,0.85)', textAlign: 'center' },
  cardsContainer: { gap: 77 },
  card: { width: CARD_WIDTH, alignSelf: 'center' },
  cardImg: { width: '100%', height: 220, borderRadius: 15, backgroundColor: '#F5F7FF' },
  cardTitle: { 
    fontFamily: 'Inter', 
    fontWeight: '700', 
    fontSize: 18, 
    color: '#1129BD', 
    marginTop: 27, 
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  cardDescription: { 
    fontFamily: 'Inter', 
    fontWeight: '400', 
    fontSize: 16, 
    color: '#000', 
    marginTop: 27,
    textAlign: 'left',
  },
  boldText: {
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: 16,
    color: '#000',
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
});
