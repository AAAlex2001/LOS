import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Image, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import config from '@/config';

const { width: screenWidth } = Dimensions.get('window');

type CustomSection = {
  id: number;
  title: string;
  text: string;
  order: number;
};

type CustomsPageData = {
  main_title: string;
  intro_text: string;
  hero_image_url: string;
  sections: CustomSection[];
};

const API_BASE = config.API_BASE;

// Hardcoded background image
const backgroundImage = require('../../../assets/images/IMG_1932.jpg');

export default function AbkhazianCustomsScreen({ visible, onClose }: { visible: boolean, onClose: () => void }) {
  const [data, setData] = useState<CustomsPageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!visible) return;
    
    const loadData = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/abkhazian-customs/page/content/`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load');
        const json = await res.json();
        setData(json);
      } catch (e) {
        console.error('Error loading customs data:', e);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [visible]);

  const heroImageSrc = data?.hero_image_url ? `${API_BASE}/media/${data.hero_image_url}` : '';

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerBar}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <View style={styles.headerTitleWrap}>
            <Text style={styles.headerTitle}>АБХАЗСКИЕ ОБЫЧАИ</Text>
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
              {/* Основное изображение */}
              {heroImageSrc && (
                <Image source={{ uri: heroImageSrc }} style={styles.heroImage} resizeMode="cover" />
              )}
              {/* Баннер-интро */}
              {data?.intro_text && (
                <View style={styles.bannerImgWrap}>
                  <ImageBackground 
                    source={backgroundImage} 
                    style={styles.bannerImage}
                    resizeMode="cover"
                  >
                    <View style={styles.bannerOverlayAbs}>
                      <Text style={styles.bannerText}>
                        {data.intro_text}
                      </Text>
                    </View>
                  </ImageBackground>
                </View>
              )}
              {data?.sections && data.sections.map((section) => (
                <View key={section.id} style={styles.textBlock}>
                  <Text style={styles.sectionTitle}>{section.title}</Text>
                  <Text style={styles.sectionText}>{section.text}</Text>
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
  backButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  heroImage: {
    width: '100%',
    minHeight: 278,
    borderRadius: 15,
    marginTop: 0,
    marginBottom: 20,
    alignSelf: 'center',
  },
  textBlock: {
    width: '100%',
    alignSelf: 'center',
    marginBottom: 20,
    gap: 8,
    alignItems: 'flex-start',
  },
  sectionTitle: {
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 17,
    color: '#1129BD',
    marginBottom: 8,
  },
  sectionText: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 17,
    color: '#000',
    marginBottom: 0,
  },
  bannerImgWrap: {
    width: '100%',
    minHeight: 150,
    alignSelf: 'center',
    marginBottom: 20,
    borderRadius: 15,
    overflow: 'hidden',
    marginTop: 0,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
      minHeight: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerOverlayAbs: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  bannerText: {
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 17,
    color: 'rgba(0,0,0,0.85)',
    textAlign: 'center',
      width: '100%',
      height: '100%'
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
