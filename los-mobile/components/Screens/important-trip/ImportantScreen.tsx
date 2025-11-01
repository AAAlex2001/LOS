import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import config from '@/config';

type ImportantRule = {
  id: number;
  rule_type: 'passenger' | 'driver';
  title: string;
  description: string;
  order: number;
};

type ImportantImage = {
  id: number;
  image_url: string;
  title?: string;
  description?: string;
  alt_text?: string;
  order: number;
};

type ImportantSection = {
  id: number;
  section_type: 'tourist-pharmacy' | 'emergency-phones' | 'public-behavior' | 'taxi-etiquette';
  title: string;
  subtitle?: string;
  content?: string;
  image_url?: string;
  order: number;
  rules: ImportantRule[];
  images: ImportantImage[];
  passenger_intro_text?: string;
  passenger_background_url?: string;
  passenger_conclusion_text?: string;
  driver_intro_text?: string;
  driver_background_url?: string;
  driver_description_text?: string;
  driver_conclusion_text?: string;
};

type ImportantPage = {
  id: number;
  title: string;
  sections: ImportantSection[];
};

const API_BASE = config.API_BASE;

const toImageUrl = (url?: string) => {
  if (!url) return undefined;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `${API_BASE}/media/${url}`;
};

export default function ImportantScreen({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const [page, setPage] = useState<ImportantPage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!visible) return;
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/important/page/content/`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load important page');
        const json = (await res.json()) as ImportantPage;
        setPage(json);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [visible]);

  const sections = useMemo(
    () => (page?.sections || []).slice().sort((a, b) => a.order - b.order),
    [page]
  );

  const scrollRef = useRef<ScrollView | null>(null);
  const sectionRefs = useMemo(() => {
    return Object.fromEntries(sections.map((s) => [s.section_type, React.createRef<View>()]));
  }, [sections]) as Record<string, React.RefObject<View>>;

  const sectionPositionsRef = useRef<Record<string, number>>({});
  const scrollToSection = (key: string) => {
    const y = sectionPositionsRef.current[key];
    if (!scrollRef.current || typeof y !== 'number') return;
    scrollRef.current.scrollTo({ y: Math.max(0, y - 12), animated: true });
  };

  const renderPharmacy = (s: ImportantSection) => (
    <View style={styles.sectionWrap}>
      <View style={styles.h2Wrap}><Text style={styles.h2}>{s.title}</Text></View>
      {!!s.content && (
        <View style={styles.pharmacyTextWrap}>
          <Text style={styles.pharmacyText}>{s.content}</Text>
        </View>
      )}
    </View>
  );

  const renderEmergency = (s: ImportantSection) => {
    const lines = (s.content || '').split('\n').filter(Boolean);
    return (
      <View style={styles.sectionWrap}>
        <View style={styles.h2Wrap}><Text style={styles.h2}>{s.title}</Text></View>
        {!!s.subtitle && (
          <View style={styles.centerNoteWrap}><Text style={styles.centerNote}>{s.subtitle}</Text></View>
        )}
        <View style={styles.listWrap}>
          {lines.map((line, i) => (
            <Text key={i} style={styles.listItem}>{line}</Text>
          ))}
        </View>
      </View>
    );
  };

  const renderBehavior = (s: ImportantSection) => (
    <View style={styles.sectionWrap}>
      <View style={styles.h2Wrap}><Text style={styles.h2}>{s.title}</Text></View>
      {s.image_url ? (
        <Image source={{ uri: toImageUrl(s.image_url) }} style={styles.heroImage} contentFit="cover" />
      ) : null}
      {!!s.content && (
        <View style={styles.paragraphWrap}><Text style={styles.paragraph}>{s.content}</Text></View>
      )}
    </View>
  );

  const renderTaxiEtiquette = (s: ImportantSection) => {
    const passengerRules = (s.rules || []).filter((r) => r.rule_type === 'passenger').sort((a, b) => a.order - b.order);
    const driverRules = (s.rules || []).filter((r) => r.rule_type === 'driver').sort((a, b) => a.order - b.order);
    return (
      <View style={styles.sectionWrap}>
        <View style={styles.h2Wrap}><Text style={styles.h2}>{s.title}</Text></View>

        {(s.passenger_intro_text || s.passenger_background_url) && (
          <View style={styles.bannerContainer}>
            <ImageBackground
              source={{ uri: toImageUrl(s.passenger_background_url) }}
              style={styles.banner}
              imageStyle={styles.bannerImage}
            >
              {!!s.passenger_intro_text && (
                <Text style={styles.bannerText}>{s.passenger_intro_text}</Text>
              )}
            </ImageBackground>
          </View>
        )}
        {passengerRules.map((r) => (
          <View key={r.id} style={styles.ruleBlock}>
            <Text style={styles.ruleTitle}>{r.title}</Text>
            <Text style={styles.ruleText}>{r.description}</Text>
          </View>
        ))}
        {!!s.passenger_conclusion_text && (
          <View style={styles.centerTextSmallWrap}><Text style={styles.centerTextSmall}>{s.passenger_conclusion_text}</Text></View>
        )}

        {(s.driver_intro_text || s.driver_background_url) && (
          <View style={[styles.bannerContainer, { marginTop: 24 }]}>
            <ImageBackground
              source={{ uri: toImageUrl(s.driver_background_url) }}
              style={styles.banner}
              imageStyle={styles.bannerImage}
            >
              {!!s.driver_intro_text && (
                <Text style={styles.bannerText}>{s.driver_intro_text}</Text>
              )}
            </ImageBackground>
          </View>
        )}
        {!!s.driver_description_text && (
          <View style={styles.paragraphWrap}><Text style={styles.paragraph}>{s.driver_description_text}</Text></View>
        )}
        {driverRules.map((r) => (
          <View key={r.id} style={styles.ruleBlock}>
            <Text style={styles.ruleTitle}>{r.title}</Text>
            <Text style={styles.ruleText}>{r.description}</Text>
          </View>
        ))}
        {!!s.driver_conclusion_text && (
          <View style={styles.centerTextSmallWrap}><Text style={styles.centerTextSmall}>{s.driver_conclusion_text}</Text></View>
        )}
      </View>
    );
  };

  const renderSection = (s: ImportantSection) => {
    if (s.section_type === 'tourist-pharmacy') return renderPharmacy(s);
    if (s.section_type === 'emergency-phones') return renderEmergency(s);
    if (s.section_type === 'public-behavior') return renderBehavior(s);
    if (s.section_type === 'taxi-etiquette') return renderTaxiEtiquette(s);
    return null;
  };

  const tabs = sections.map((s) => ({ key: s.section_type, label: s.title }));

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View style={styles.container}>
        <View style={styles.headerBar}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <View style={styles.headerTitleWrap}>
            <Text style={styles.headerTitle}>{(page?.title || 'ВАЖНО ЗНАТЬ').toUpperCase()}</Text>
          </View>
          <View style={{ width: 36 }} />
        </View>

        <ScrollView
          ref={scrollRef}
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {loading ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Загрузка...</Text>
            </View>
          ) : (
            <>
              <View style={styles.tabsStickyWrap}>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={styles.tabsBar}
                  contentContainerStyle={styles.tabsContent}
                >
                  {tabs.map((tab) => (
                    <TouchableOpacity key={tab.key} style={styles.tab} onPress={() => scrollToSection(tab.key)}>
                      <Text style={styles.tabText}>{tab.label}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              <View style={{ marginTop: 10 }}>
                {sections.map((s) => (
                  <View
                    key={s.id}
                    ref={sectionRefs[s.section_type]}
                    onLayout={(e) => {
                      sectionPositionsRef.current[s.section_type] = e.nativeEvent.layout.y;
                    }}
                  >
                    {renderSection(s)}
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
  headerTitle: { fontFamily: 'Inter', fontWeight: '700', fontSize: 16, color: '#000', textTransform: 'uppercase', letterSpacing: 0.2, marginTop: 24 },

  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 40 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 100 },
  loadingText: { fontSize: 18, color: '#666' },

  tabsBar: {
    height: 46,
    backgroundColor: '#FFFFFF',
    shadowColor: 'rgba(0, 0, 0, 0.05)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 11,
    elevation: 2,
  },
  tabsStickyWrap: {  marginHorizontal: -20 },
  tabsContent: { paddingLeft: 20, paddingRight: 20, alignItems: 'center', gap: 10 },
  tab: { height: 30, justifyContent: 'center', alignItems: 'center', width: '100%', maxWidth: 90 },
  tabText: { fontFamily: 'Roboto', fontWeight: '700', fontSize: 12, lineHeight: 14, color: '#000', textAlign: 'center' },

  sectionWrap: { width: '100%', alignSelf: 'flex-start', marginBottom: 40, justifyContent: 'flex-start' },

  h2Wrap: { padding: 5, marginTop: 10, marginBottom: 20 },
  h2: { fontFamily: 'Inter', fontWeight: '800', fontSize: 14, lineHeight: 14, color: '#1129BD', textAlign: 'center', textTransform: 'uppercase' },
  pharmacyTextWrap: { alignItems: 'flex-start' },
  pharmacyText: { width: '100%', fontFamily: 'Inter', fontWeight: '400', fontSize: 14, lineHeight: 17, textAlign: 'left', color: '#000' },
  centerNoteWrap: { width: '100%', marginBottom: 20 },
  centerNote: { fontFamily: 'Inter', fontWeight: '500', fontSize: 14, lineHeight: 17, color: '#000', textAlign: 'center' },
  listWrap: {  paddingVertical: 10 },
  listItem: { fontFamily: 'Inter', fontWeight: '400', fontSize: 14, lineHeight: 17, color: '#000' },
  paragraphWrap: { marginTop: 8, marginBottom: 8 },
  paragraph: { fontFamily: 'Inter', fontWeight: '300', fontSize: 14, lineHeight: 17, color: '#000' },
  heroImage: { width: '100%', height: 233, borderRadius: 15, marginTop: 8, marginBottom: 8 },

  bannerContainer: { width: '100%', minHeight: 83, borderRadius: 15, overflow: 'hidden', marginTop: 8, marginBottom: 12 },
  banner: { width: '100%', minHeight: 83, justifyContent: 'center', alignItems: 'center' },
  bannerImage: { borderRadius: 15 },
  bannerText: { fontFamily: 'Inter', fontWeight: '600', fontSize: 14, lineHeight: 17, textAlign: 'center', color: 'rgba(0, 0, 0, 0.85)', padding: 15 },
  ruleBlock: { width: '100%', gap: 8, marginBottom: 10, paddingLeft: 21 },
  ruleTitle: { fontFamily: 'Inter', fontWeight: '700', fontSize: 14, lineHeight: 17, color: '#1129BD', textAlign: 'left' },
  ruleText: { fontFamily: 'Inter', fontWeight: '300', fontSize: 14, lineHeight: 17, color: '#000', textAlign: 'left' },
});