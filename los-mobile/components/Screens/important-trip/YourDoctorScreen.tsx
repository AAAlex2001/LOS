import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import config from '@/config';
import { parseContactString } from '../plan-to-trip/phoneUtils';
import { useTranslation } from '@/i18n';

type CardItem = {
  id: number;
  name: string;
  name_link?: string;
  working_hours?: string;
  address: string;
  address_link?: string;
  contacts?: string;
  image_url?: string;
  order: number;
};

type DoctorsGroup = {
  id: number;
  hospital_name: string;
  doctors: string[];
  order: number;
};

type YourDoctorPage = {
  main_title: string;
  logo_image_url?: string;
  hospitals_hero_image_url?: string;
  hospitals: CardItem[];
  private_clinics: CardItem[];
  dentistries: CardItem[];
  vet_clinics: CardItem[];
  doctors_groups: DoctorsGroup[];
};

const API_BASE = config.API_BASE;
const toMedia = (p?: string) => (p ? (p.startsWith('http') ? p : `${API_BASE}/media/${p}`) : undefined);

export default function YourDoctorScreen({
  const { t } = useTranslation(); visible, onClose }: { visible: boolean; onClose: () => void }) {
  const [data, setData] = useState<YourDoctorPage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!visible) return;
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/your-doctor/page/content/`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load your doctor');
        const json = (await res.json()) as YourDoctorPage;
        setData(json);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [visible]);

  const sections = useMemo(() => {
    const arr: { key: string; label: string; has: boolean }[] = [
      { key: 'hospitals', label: 'Больницы', has: (data?.hospitals?.length || 0) > 0 },
      { key: 'private_clinics', label: t('important.clinics'), has: (data?.private_clinics?.length || 0) > 0 },
      { key: 'dentistries', label: 'Стоматологии', has: (data?.dentistries?.length || 0) > 0 },
      { key: 'vet_clinics', label: 'Ветклиники', has: (data?.vet_clinics?.length || 0) > 0 },
      { key: 'doctors', label: 'Врачи', has: (data?.doctors_groups?.length || 0) > 0 },
    ];
    return arr.filter(s => s.has);
  }, [data]);

  const scrollRef = useRef<ScrollView | null>(null);
  const anchors = useMemo(() => {
    return Object.fromEntries(sections.map(s => [s.key, React.createRef<View>()]));
  }, [sections]) as Record<string, React.RefObject<View>>;
  const positionsRef = useRef<Record<string, number>>({});
  const scrollTo = (key: string) => {
    const y = positionsRef.current[key];
    if (!scrollRef.current || typeof y !== 'number') return;
    scrollRef.current.scrollTo({ y: Math.max(0, y - 12), animated: true });
  };

  const openLink = async (url?: string) => {
    if (!url) return;
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) await Linking.openURL(url);
    } catch {}
  };

  const renderCard = (item: CardItem) => (
    <View key={item.id} style={styles.card}>
      {!!item.image_url && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: toMedia(item.image_url) }} style={styles.cardImage} contentFit="cover" />
        </View>
      )}
      <View style={styles.infoContainer}>
        {!!item.name && (
          item.name_link ? (
            <TouchableOpacity onPress={() => openLink(item.name_link)}>
              <Text style={[styles.itemName, styles.underline]}>{item.name}</Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.itemName}>{item.name}</Text>
          )
        )}
        {!!item.working_hours && (
          <View style={styles.infoBlock}>
            <Text style={styles.infoLabel}>{t('common.hours')}</Text>
            <Text style={styles.infoValue}>{item.working_hours}</Text>
          </View>
        )}
        {!!item.address && (
          <View style={styles.infoBlock}>
            <Text style={styles.infoLabel}>{t('common.address')}</Text>
            {item.address_link ? (
              <TouchableOpacity onPress={() => openLink(item.address_link)}>
                <Text style={[styles.infoValue, styles.underline]}>{item.address}</Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.infoValue}>{item.address}</Text>
            )}
          </View>
        )}
        {!!item.contacts && (
          <View style={styles.infoBlock}>
            <Text style={styles.infoLabel}>{t('common.contacts')}</Text>
            <Text style={styles.infoValue}>
              {parseContactString(item.contacts).map((segment, index) => {
                if (segment.type === 'phone' || segment.type === 'email') {
                  return (
                    <Text
                      key={index}
                      style={[styles.infoValue, styles.underline]}
                      onPress={() => segment.url && Linking.openURL(segment.url)}
                    >
                      {segment.value}
                    </Text>
                  );
                }
                return <Text key={index}>{segment.value}</Text>;
              })}
            </Text>
          </View>
        )}
      </View>
    </View>
  );

  const headerIcon = toMedia(data?.logo_image_url);

  return (
    <Modal visible={visible} animationType="slide" transparent={false} presentationStyle="fullScreen" statusBarTranslucent>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerBar}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <View style={styles.headerTitleWrap}>
            {!!headerIcon && (
              <View style={styles.headerLogoWrapper}>
                <Image source={{ uri: headerIcon }} style={styles.headerLogo} contentFit="cover" />
              </View>
            )}
            <Text style={styles.headerTitle}>{(data?.main_title || t('important.your_doctor')).toUpperCase()}</Text>
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
              <Text style={styles.loadingText}>{t('common.loading')}</Text>
            </View>
          ) : (
            <>
              {/* Tabs like Parties */}
              <View style={styles.tabsStickyWrap}>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={styles.tabsBar}
                  contentContainerStyle={styles.tabsContent}
                >
                  {sections.map((t) => (
                    <TouchableOpacity key={t.key} style={styles.tab} onPress={() => scrollTo(t.key)}>
                      <Text style={styles.tabText}>{t.label}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              {/* Hospitals hero */}
              {!!data?.hospitals_hero_image_url && (
                <View style={{ width: '100%', marginBottom: 20 }}>
                  <Image source={{ uri: toMedia(data.hospitals_hero_image_url) }} style={styles.heroImage} contentFit="cover" />
                </View>
              )}

              {/* Hospitals */}
              {sections.find(s => s.key === 'hospitals') && (
                <View
                  ref={anchors['hospitals']}
                  onLayout={e => { positionsRef.current['hospitals'] = e.nativeEvent.layout.y; }}
                  style={{ width: '100%' }}
                >
                  <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>{t('important.hospitals')}</Text></View>
                  {(data?.hospitals || []).slice().sort((a,b)=>a.order-b.order).map(renderCard)}
                </View>
              )}

              {/* Private clinics */}
              {sections.find(s => s.key === 'private_clinics') && (
                <View
                  ref={anchors['private_clinics']}
                  onLayout={e => { positionsRef.current['private_clinics'] = e.nativeEvent.layout.y; }}
                  style={{ width: '100%' }}
                >
                  <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>ЧАСТНЫЕ КЛИНИКИ</Text></View>
                  {(data?.private_clinics || []).slice().sort((a,b)=>a.order-b.order).map(renderCard)}
                </View>
              )}

              {/* Dentistries */}
              {sections.find(s => s.key === 'dentistries') && (
                <View
                  ref={anchors['dentistries']}
                  onLayout={e => { positionsRef.current['dentistries'] = e.nativeEvent.layout.y; }}
                  style={{ width: '100%' }}
                >
                  <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>{t('important.dentists')}</Text></View>
                  {(data?.dentistries || []).slice().sort((a,b)=>a.order-b.order).map(renderCard)}
                </View>
              )}

              {/* Vet clinics */}
              {sections.find(s => s.key === 'vet_clinics') && (
                <View
                  ref={anchors['vet_clinics']}
                  onLayout={e => { positionsRef.current['vet_clinics'] = e.nativeEvent.layout.y; }}
                  style={{ width: '100%' }}
                >
                  <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>{t('important.vets')}</Text></View>
                  {(data?.vet_clinics || []).slice().sort((a,b)=>a.order-b.order).map(renderCard)}
                </View>
              )}

              {/* Doctors groups */}
              {sections.find(s => s.key === 'doctors') && (
                <View
                  ref={anchors['doctors']}
                  onLayout={e => { positionsRef.current['doctors'] = e.nativeEvent.layout.y; }}
                  style={{ width: '100%', marginTop: 20 }}
                >
                  <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>{t('important.doctors')}</Text></View>
                  <View style={styles.doctorsWrap}>
                    {(data?.doctors_groups || []).slice().sort((a,b)=>a.order-b.order).map((group, idx) => (
                      <View key={group.id} style={styles.hospitalBlock}>
                        <View style={styles.hospitalHeader}><Text style={styles.hospitalTitle}> {group.hospital_name}</Text></View>
                        <Text style={styles.hospitalDoctors}>{group.doctors.map((d,i)=>`${i+1}. ${d}`).join('\n')}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}
            </>
          )}
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  headerBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#fff', minHeight: 96, paddingTop: 44, paddingBottom: 10, paddingHorizontal: 12 },
  backButton: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center', marginTop: 24 },
  headerTitleWrap: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 20, marginLeft: 10, marginTop: 24 },
  headerTitle: { fontFamily: 'Inter', fontWeight: '700', fontSize: 16, color: '#000', textTransform: 'uppercase' },
  headerLogoWrapper: { shadowColor: 'rgba(0, 0, 0, 0.25)', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 1, shadowRadius: 4, elevation: 4 },
  headerLogo: { width: 59, height: 59, borderRadius: 8 },

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
      marginBottom: 30,
  },
  tabsStickyWrap: { marginHorizontal: -20 },
  tabsContent: { paddingLeft: 20, paddingRight: 20, alignItems: 'center', gap: 10 },
  tab: { justifyContent: 'center', alignItems: 'center', height: 30 },
  tabText: { fontFamily: 'Inter', fontWeight: '700', fontSize: 12, lineHeight: 15, color: '#000', textAlign: 'center' },

  // Card (like administrative buildings)
  card: { flexDirection: 'column', alignItems: 'flex-start', marginBottom: 20, backgroundColor: '#fff', gap: 8, width: '100%' },
  imageContainer: { width: '100%', height: 226, borderRadius: 15, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(185, 185, 185, 0.85)', backgroundColor: '#fff' },
  cardImage: { width: '100%', height: '100%' },
  infoContainer: { flexDirection: 'column', alignItems: 'flex-start', padding: 10, gap: 8, width: '100%', backgroundColor: 'rgba(17, 41, 189, 0.1)', borderWidth: 1, borderColor: '#D5DAEF', borderRadius: 15 },
  itemName: { fontFamily: 'Inter', fontWeight: '800', fontSize: 14, lineHeight: 17, color: '#1129BD' },
  infoBlock: { flexDirection: 'column', alignItems: 'flex-start', width: '100%', gap: 3 },
  infoLabel: { fontFamily: 'Inter', fontWeight: '700', fontSize: 14, lineHeight: 17, color: '#1129BD' },
  infoValue: { fontFamily: 'Inter', fontWeight: '400', fontSize: 14, lineHeight: 17, color: '#1129BD' },
  underline: { textDecorationLine: 'underline' },

  // Section headers
  sectionHeader: { width: '100%', marginBottom: 20, marginTop: 10, alignItems: 'center' },
  sectionTitle: { fontFamily: 'Inter', fontWeight: '700', fontSize: 14, lineHeight: 17, color: '#1129BD', textAlign: 'center' },

  // Doctors block
  doctorsWrap: { width: '100%', alignItems: 'flex-start', gap: 40 },
  hospitalBlock: { width: '100%', gap: 8, flexDirection: 'column' },
  hospitalHeader: { width: '100%', alignItems: 'flex-start', justifyContent: 'flex-start', marginBottom: 8},
  hospitalTitle: { width: '100%', fontFamily: 'Inter', fontWeight: '700', fontSize: 14, lineHeight: 17, color: '#1129BD' },
  hospitalDoctors: { width: '100%', fontFamily: 'Inter', fontWeight: '400', fontSize: 14, lineHeight: 17, color: '#000' },

  heroImage: { width: '100%', height: 226, borderRadius: 15 },
});


