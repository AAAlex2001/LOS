import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import config from '@/config';

const { width: screenWidth } = Dimensions.get('window');

interface TransportBlock {
  id: number;
  title: string;
  image_1?: string;
  image_2?: string;
  order: number;
}

interface TransportCommunicationsPageData {
  id: number;
  main_title: string;
  transport_blocks: TransportBlock[];
}

const API_BASE = config.API_BASE;

export default function TransportCommunicationsScreen({ visible, onClose }: { visible: boolean, onClose: () => void }) {
  const [data, setData] = useState<TransportCommunicationsPageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!visible) return;
    
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/transport-communications/page/content/`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load transport communications');
        const json = await res.json() as TransportCommunicationsPageData;
        setData(json);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [visible]);

  const transportBlocks = (data?.transport_blocks || []).slice().sort((a, b) => a.order - b.order);
  const toImageUrl = (p?: string) => (p ? (p.startsWith('http') ? p : `${API_BASE}${p}`) : '');

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerBar}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <View style={styles.headerTitleWrap}>
            <Text style={styles.headerTitle}>ТРАНСПОРТНОЕ СООБЩЕНИЕ</Text>
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
              {data?.main_title && (
                <Text style={styles.mainTitle}>{data.main_title}</Text>
              )}
              {transportBlocks.map((block) => (
                <View key={block.id} style={styles.transportBlock}>
                  <Text style={styles.blockTitle}>{block.title}</Text>
                  <View style={styles.imagesContainer}>
                    {block.image_1 && (
                      <Image
                        source={{ uri: toImageUrl(block.image_1) }}
                        style={styles.image}
                        resizeMode="cover"
                      />
                    )}
                    {block.image_2 && (
                      <Image
                        source={{ uri: toImageUrl(block.image_2) }}
                        style={styles.image}
                        resizeMode="cover"
                      />
                    )}
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
    borderRadius: 16,
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
    marginLeft: 0,
  },
  scrollContent: {
    paddingBottom: 40,
    alignItems: 'center',
    paddingTop: 0,
  },
  mainTitle: {
    fontFamily: 'Inter',
    fontWeight: '800',
    fontSize: 28,
    lineHeight: 34,
    textAlign: 'center',
    color: '#1129BD',
    marginBottom: 40,
    marginTop: 10,
  },
  transportBlock: {
    width: screenWidth - 40,
    marginBottom: 60,
    alignSelf: 'center',
  },
  blockTitle: {
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 24,
    textAlign: 'center',
    textDecorationLine: 'underline',
    color: '#1129BD',
    textTransform: 'uppercase',
    marginBottom: 24,
    marginTop: 16,
  },
  imagesContainer: {
    flexDirection: screenWidth > 768 ? 'row' : 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  image: {
    width: screenWidth > 700 ? 320 : screenWidth - 60,
    height: 180,
    borderRadius: 15,
    marginBottom: screenWidth > 768 ? 0 : 20,
    marginHorizontal: 10,
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
