import React, { useRef, useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import config from '@/config';
import { useTranslation } from '@/i18n';

const { width: screenWidth } = Dimensions.get('window');

type HistorySection = {
  id: number;
  title: string;
  content: string;
  image_url: string;
  order: number;
};

type CultureSection = {
  id: number;
  title: string;
  content: string;
  image_url: string;
  order: number;
};

const API_BASE = config.API_BASE;

export default function HistoryAndCultureScreen({
  const { t } = useTranslation(); visible, onClose }: { visible: boolean, onClose: () => void }) {
  const scrollRef = useRef<ScrollView>(null);
  const historyRef = useRef<View>(null);
  const cultureRef = useRef<View>(null);

  const [historySections, setHistorySections] = useState<HistorySection[]>([]);
  const [cultureSections, setCultureSections] = useState<CultureSection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!visible) return;

    const loadData = async () => {
      try {
        const historyRes = await fetch(`${API_BASE}/api/history-and-culture/history-sections/`, { cache: 'no-store' });
        if (historyRes.ok) {
          const historyData = await historyRes.json();
          setHistorySections(historyData);
        }

        const cultureRes = await fetch(`${API_BASE}/api/history-and-culture/culture-sections/`, { cache: 'no-store' });
        if (cultureRes.ok) {
          const cultureData = await cultureRes.json();
          setCultureSections(cultureData);
        }
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [visible]);

  const scrollToSection = (key: 'history' | 'culture') => {
    const ref = key === 'history' ? historyRef : cultureRef;
    if (ref.current && scrollRef.current) {
      ref.current.measureLayout(
        scrollRef.current,
        (x, y) => {
          scrollRef.current?.scrollTo({ y, animated: true });
        },
        () => {}
      );
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={false} presentationStyle="fullScreen" statusBarTranslucent>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerBar}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <View style={styles.headerTitleWrap}>
            <Text style={styles.headerTitle}>{t('about.history')}</Text>
          </View>
          <View style={{ width: 36 }} />
        </View>
        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity style={styles.tabItem} onPress={() => scrollToSection('history')}>
            <Text style={styles.tabText}>{t('about.history_title')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => scrollToSection('culture')}>
            <Text style={styles.tabText}>{t('about.culture_title')}</Text>
          </TouchableOpacity>
        </View>
        <ScrollView ref={scrollRef} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>{t('common.loading')}</Text>
            </View>
          ) : (
            <>
          {/* История */}
              <View ref={historyRef}>
            <Text style={styles.contentTitle}>История Абхазии</Text>
          </View>
              {historySections.length === 0 ? (
                <View style={styles.noDataContainer}>
                  <Text style={styles.noDataText}>{t('about.no_history')}</Text>
            </View>
              ) : (
                historySections.map((section) => (
                  <View key={section.id}>
                    {section.image_url && (
                      <Image
                        source={{ uri: `${API_BASE}/media/${section.image_url}` }}
                        style={styles.image}
                        resizeMode="cover"
                      />
                    )}
                    <View style={styles.textBlock}>
                      <Text style={styles.sectionTitle}>{section.title}</Text>
                      <Text style={styles.sectionText}>{section.content}</Text>
            </View>
            </View>
                ))
              )}

          {/* Культура */}
              <View ref={cultureRef}>
            <Text style={[styles.contentTitle, styles.spacedTitle]}>Культура Абхазии</Text>
          </View>
              {cultureSections.length === 0 ? (
                <View style={styles.noDataContainer}>
                  <Text style={styles.noDataText}>{t('about.no_culture')}</Text>
                </View>
              ) : (
                cultureSections.map((section) => (
                  <View key={section.id}>
                    {section.image_url && (
                      <Image
                        source={{ uri: `${API_BASE}/media/${section.image_url}` }}
                        style={styles.image}
                        resizeMode="cover"
                      />
                    )}
                    <View style={styles.textBlock}>
                      <Text style={styles.sectionTitle}>{section.title}</Text>
                      <Text style={styles.sectionText}>{section.content}</Text>
            </View>
            </View>
                ))
              )}
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
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
  },
  tabItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  tabText: {
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 16,
  },
  scrollContent: {
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  contentTitle: {
    fontFamily: 'Inter',
    fontWeight: '800',
    fontSize: 14,
    lineHeight: 17,
    color: '#1129BD',
    marginHorizontal: 0,
    marginTop: 40,
    marginBottom: 20,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  spacedTitle: {
    marginTop: 60,
  },
  image: {
    width: '100%',
    minHeight: 278,
    borderRadius: 15,
    marginHorizontal: 0,
    marginBottom: 20,
  },
  textBlock: {
    width: '100%',
    alignItems: 'flex-start',
    marginBottom: 40,
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
    paddingTop: 100,
  },
  loadingText: {
    fontSize: 18,
    color: '#666',
  },
  noDataContainer: {
    padding: 40,
    alignItems: 'center',
  },
  noDataText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
}); 
