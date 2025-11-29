import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Dimensions, ImageBackground, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import config from '@/config';

const { width: screenWidth } = Dimensions.get('window');

type Props = { visible: boolean; onClose: () => void };

type Spring = {
  id: number;
  title: string;
  description: string;
  image_url: string;
  location_link?: string;
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
  const heroBgRaw = data?.hero_background_url || '';
  const heroBg = heroBgRaw ? (heroBgRaw.startsWith('http') ? heroBgRaw : `${API_BASE}${heroBgRaw}`) : '';

  const toImageUrl = (url: string) => {
    if (!url) return undefined;
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    return `${API_BASE}/media/${url}`;
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={false} presentationStyle="fullScreen" statusBarTranslucent>
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
              {data?.hero_text && heroBg && (
                <View style={styles.bannerContainer}>
                  <ImageBackground
                    source={{ uri: heroBg }}
                    style={styles.banner}
                    resizeMode="cover"
                    imageStyle={styles.bannerImage}
                  >
                    <Text style={styles.bannerText}>{data.hero_text}</Text>
                  </ImageBackground>
                </View>
              )}

              <View style={styles.cardsContainer}>
                {springs.map((s) => (
                  <View key={s.id} style={styles.card}>
                    <Image
                      source={{ uri: toImageUrl(s.image_url) }}
                      style={styles.cardImg}
                      resizeMode="cover"
                    />
                    {s.location_link ? (
                      <TouchableOpacity onPress={() => Linking.openURL(s.location_link!)}>
                        <Text style={styles.cardTitle}>{s.title}</Text>
                      </TouchableOpacity>
                    ) : (
                      <Text style={styles.cardTitle}>{s.title}</Text>
                    )}
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
  bannerContainer: { marginBottom: 20, borderRadius: 15, width: '100%' },
  banner: { width: '100%', paddingTop: 16,  paddingBottom: 16, justifyContent: 'center', alignItems: 'center', minHeight: 219 },
  bannerImage: { borderRadius: 15 },
  bannerText: { fontFamily: 'Inter', fontWeight: '600', fontSize: 14, lineHeight: 17, color: 'rgba(0, 0, 0, 0.85)', textAlign: 'center', flexShrink: 1, padding: 20, },
  cardsContainer: { gap: 77 },
  card: { flexDirection: 'column', gap: 7 },
  cardImg: { width: '100%', height: 264, borderRadius: 15 },
  cardTitle: { 
    fontFamily: 'Inter', 
    fontWeight: '800', 
    fontSize: 14, 
    lineHeight: 17,
    color: '#1129BD', 
    marginTop: 0, 
    textAlign: 'center',
    textDecorationLine: 'underline',
    paddingHorizontal: 0,
    paddingTop: 30,
    paddingBottom: 30,
  },
  cardDescription: { 
    fontFamily: 'Inter', 
    fontWeight: '400', 
    fontSize: 14,
    lineHeight: 17, 
    color: '#000', 
    marginTop: 0,
    textAlign: 'left',
    paddingHorizontal: 0,
  },
  boldText: {
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 17,
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
