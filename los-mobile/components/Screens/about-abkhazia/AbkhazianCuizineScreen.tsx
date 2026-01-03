import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import config from '@/config';
import {useTranslation, addLangParam} from '@/i18n';

const { width: screenWidth } = Dimensions.get('window');

type CuisineSection = {
  id: number;
  title: string;
  text: string;
  order: number;
};

type MainDish = {
  id: number;
  name: string;
  description: string;
  order: number;
};

type CuisinePageData = {
  main_title: string;
  hero_image_url: string;
  sections: CuisineSection[];
  main_dishes: MainDish[];
};

const API_BASE = config.API_BASE;

export default function AbkhazianCuizineScreen({ visible, onClose }: { visible: boolean, onClose: () => void }) {
  const { t } = useTranslation();
  const [data, setData] = useState<CuisinePageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!visible) return;
    
    const loadData = async () => {
      try {
        const res = await fetch(addLangParam(`${API_BASE}/api/abkhazian-cuisine/page/content/`), { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load');
        const json = await res.json();
        setData(json);
      } catch (e) {
        console.error('Error loading cuisine data:', e);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [visible]);

  const heroImageSrc = data?.hero_image_url ? `${API_BASE}/media/${data.hero_image_url}` : '';

  return (
    <Modal visible={visible} animationType="slide" transparent={false} presentationStyle="fullScreen" statusBarTranslucent>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerBar}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <View style={styles.headerTitleWrap}>
            <Text style={styles.headerTitle}>{t('about.cuisine')}</Text>
          </View>
          <View style={{ width: 36 }} />
        </View>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>{t('common.loading')}</Text>
            </View>
          ) : (
            <>
              {heroImageSrc && (
                <Image source={{ uri: heroImageSrc }} style={styles.heroImage} resizeMode="cover" />
              )}
              {data?.sections && data.sections.map((section) => (
                <View key={section.id} style={styles.textBlock}>
                  <Text style={styles.sectionTitle}>{section.title}</Text>
                  <Text style={styles.sectionText}>{section.text}</Text>
                </View>
              ))}
              <View style={styles.textBlock}>
                <Text style={styles.sectionTitleBlue}>{t('about.cuisine_details')}</Text>
                <View style={styles.dishList}>
                  {data?.main_dishes && data.main_dishes.length > 0 ? (
                    data.main_dishes.map((dish) => (
                      <Text key={dish.id} style={styles.dishItem}>
                        <Text style={styles.dishName}>{dish.name}</Text> — {dish.description}
                      </Text>
                    ))
                  ) : (
                    <Text style={styles.dishItem}>{t('about.no_dishes')}</Text>
                  )}
                </View>
              </View>
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
  backButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
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
    alignItems: 'flex-start',
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
    width: '100%',
    alignSelf: 'stretch',
    flexShrink: 1,
    flexWrap: 'wrap',
  },
  sectionText: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 17,
    color: '#000',
    marginBottom: 0,
  },
  sectionTitleBlue: {
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 17,
    color: '#1129BD',
    marginBottom: 8,
    textTransform: 'uppercase',
    width: '100%',
    alignSelf: 'stretch',
    flexShrink: 1,
    flexWrap: 'wrap',
  },
  dishList: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 8,
    marginTop: 8,
  },
  dishItem: {
    fontSize: 14,
    lineHeight: 17,
    color: '#000',
    fontWeight: '400',
    marginBottom: 0,
  },
  dishName: {
    fontWeight: '700',
    color: '#000',
    fontSize: 14,
    lineHeight: 17,
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
