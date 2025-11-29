import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Image as ExpoImage } from 'expo-image';
import config from '@/config';

type GovernmentBlock = {
  id: number;
  title: string;
  content: string;
  image_url: string;
  order: number;
};

type GovernmentPageData = {
  blocks: GovernmentBlock[];
};

const API_BASE = config.API_BASE;

export default function GovernmentStructureScreen({ visible, onClose }: { visible: boolean, onClose: () => void }) {
  const [pageData, setPageData] = useState<GovernmentPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (!visible) return;
    
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/government-structure/page/content/`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load government structure');
        const json = await res.json() as GovernmentPageData;
        setPageData(json);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [visible]);

  const blocks = (pageData?.blocks || []).slice().sort((a, b) => a.order - b.order);
  return (
    <Modal visible={visible} animationType="slide" transparent={false} presentationStyle="fullScreen" statusBarTranslucent>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerBar}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <View style={styles.headerTitleWrap}>
            <Text style={styles.headerTitle}>ГОСУДАРСТВЕННОЕ УСТРОЙСТВО</Text>
          </View>
          <View style={{ width: 36 }} />
        </View>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Загрузка...</Text>
            </View>
          ) : (
            blocks.map((b) => (
              <View key={b.id} style={styles.textBlock}>
                {b.image_url ? (
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => setSelectedImage(`${API_BASE}/media/${b.image_url}`)}
                    style={styles.imageContainer}
                  >
                    <ExpoImage
                      source={{ uri: `${API_BASE}/media/${b.image_url}` }}
                      style={styles.mapImage}
                      contentFit="contain"
                    />
                  </TouchableOpacity>
                ) : null}
                <Text style={styles.sectionTitle}>{b.title}</Text>
                {b.content ? (
                  b.content.split('\n\n').map((para, idx) => (
                    <Text key={idx} style={styles.sectionText}>{para}</Text>
                  ))
                ) : null}
              </View>
            ))
          )}
        </ScrollView>
        
        {/* Full Screen Image Modal */}
        <Modal
          visible={selectedImage !== null}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setSelectedImage(null)}
        >
          <View style={styles.fullScreenImageContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setSelectedImage(null)}
              activeOpacity={0.7}
            >
              <Ionicons name="close" size={32} color="#fff" />
            </TouchableOpacity>
            {selectedImage && (
              <ScrollView
                style={{ flex: 1, width: '100%', height: '100%' }}
                contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}
                maximumZoomScale={3}
                minimumZoomScale={1}
                centerContent={true}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
              >
                <TouchableWithoutFeedback onPress={() => setSelectedImage(null)}>
                  <ExpoImage
                    source={{ uri: selectedImage }}
                    style={styles.fullScreenImage}
                    contentFit="contain"
                  />
                </TouchableWithoutFeedback>
              </ScrollView>
            )}
          </View>
        </Modal>
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
    padding: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    marginBottom: 20,
  },
  mapImage: {
    width: '100%',
    minHeight: 278,
  },
  fullScreenImageContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  textBlock: {
    width: '100%',
    alignItems: 'flex-start',
    paddingTop: 0,
    marginBottom: 20,
    gap: 8,
  },
  sectionTitle: {
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 17,
    color: '#1129BD',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  sectionText: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 17,
    color: '#000',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  loadingText: {
    fontSize: 18,
    color: '#666',
  },
}); 