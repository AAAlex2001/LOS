import React, { useMemo, useRef, useEffect, useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Image,
  ImageBackground,
  useWindowDimensions,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ArrowIcon from '../../../assets/images/VectorParties1.svg';
import CalendarIcon from '../../../assets/images/VectorParties2.svg';
import LocationIcon from '../../../assets/images/VectorParties3.svg';
import config from '@/config';

const { width: screenWidth } = Dimensions.get('window');

type PartyEvent = {
  id: number;
  title: string;
  date_info?: string;
  location?: string;
  description?: string;
  event_url?: string;
  order: number;
  city: number;
  city_name: string;
  city_slug: string;
};

type PartyCity = {
  id: number;
  name: string;
  slug: string;
  city_image?: string;
  events: PartyEvent[];
  order: number;
};

type PartiesPageData = {
  id: number;
  main_title: string;
  background_image?: string;
  center_icon?: string;
  decor_image_1?: string;
  decor_image_2?: string;
  decor_image_3?: string;
  decor_image_4?: string;
  decor_image_5?: string;
  intro_text?: string;
  cities: PartyCity[];
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

export default function PartiesScreen({ visible, onClose }: { visible: boolean, onClose: () => void }) {
  const { width } = useWindowDimensions();
  const [data, setData] = useState<PartiesPageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!visible) return;
    
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/parties/page/content/`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load parties page');
        const json = await res.json() as PartiesPageData;
        setData(json);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [visible]);

  const scaleForWidth = (base: number) => {
    const k = width / 390;
    const scaled = base * k;
    return Math.max(base * 0.6, Math.min(scaled, base * 1.6));
  };

  const bannerMinHeight = Math.round(scaleForWidth(240));
  const centerIconSize = Math.round(scaleForWidth(80));
  const decorSize = Math.round(scaleForWidth(64));
  const cityImageHeight = Math.round(scaleForWidth(220));
  const bannerTitleSize = Math.round(scaleForWidth(22));
  const bannerTextSize = Math.round(scaleForWidth(16));
  const eventTextSize = bannerTextSize;
  const eventIconSize = Math.max(12, Math.round(bannerTextSize));
  const tabTextSize = Math.max(12, Math.round(scaleForWidth(14)));
  const cityTitleSize = Math.max(16, Math.round(scaleForWidth(18)));
  const sectionTitleSize = Math.max(14, Math.round(scaleForWidth(16)));

  const scrollRef = useRef<ScrollView | null>(null);
  const sectionRefs = useMemo(() => {
    const cities = data?.cities || [];
    return Object.fromEntries(cities.map((c) => [c.slug, React.createRef<View>()]));
  }, [data]) as Record<string, React.RefObject<View>>;
  
  const cityPositionsRef = useRef<Record<string, number>>({});

  const scrollToCity = (citySlug: string) => {
    const y = cityPositionsRef.current[citySlug];
    if (!scrollRef.current || typeof y !== 'number') return;
    scrollRef.current.scrollTo({ y: Math.max(0, y - 12), animated: true });
  };

  const onScroll = (_e: NativeSyntheticEvent<NativeScrollEvent>) => {};

  const cities = (data?.cities || []).slice().sort((a, b) => a.order - b.order);
  const toImageUrl = (p?: string) => (p ? (p.startsWith('http') ? p : `${API_BASE}${p}`) : '');

  const openLink = (url: string) => Linking.openURL(url).catch(() => {});

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View style={styles.container}>
        <View style={styles.headerBar}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <View style={styles.headerTitleWrap}>
            <Text style={styles.headerTitle}>ВЕЧЕРИНКИ И ЯРКИЕ ВПЕЧАТЛЕНИЯ</Text>
          </View>
          <View style={{ width: 36 }} />
        </View>

        <ScrollView
          ref={scrollRef}
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          onScroll={onScroll}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
        >
          {loading ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Загрузка...</Text>
            </View>
          ) : (
            <>
              {/* Tabs */}
              <View style={styles.tabsStickyWrap}> 
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={styles.tabsBar}
                  contentContainerStyle={styles.tabsContent}
                >
                  {cities.map((c, idx) => (
                    <TouchableOpacity
                      key={c.id}
                      style={styles.tab}
                      onPress={() => scrollToCity(c.slug)}
                      activeOpacity={0.8}
                    >
                      <Text style={[styles.tabText, { fontSize: tabTextSize }]}>{c.name}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              {/* Banner */}
              <View style={styles.bannerWrapper}>
                <ImageBackground
                  source={{ uri: data?.background_image ? toImageUrl(data.background_image) : undefined }}
                  style={[styles.banner, { minHeight: bannerMinHeight }]}
                  imageStyle={styles.bannerImage}
                  defaultSource={require('../../../assets/images/IMG_1932.jpg')}
                >
                  {data?.center_icon && (
                    <View style={[
                      styles.centerIcon,
                      { width: centerIconSize, height: centerIconSize, top: -Math.round(centerIconSize * 0.6) - 7 }
                    ]}>
                      <Image
                        source={{ uri: toImageUrl(data.center_icon) }}
                        style={{ width: centerIconSize, height: centerIconSize }}
                        resizeMode="contain"
                      />
                    </View>
                  )}
                  <View style={styles.bannerOverlay}>
                    {data?.intro_text && (
                      <Text style={[styles.bannerText, { fontSize: bannerTextSize }]}>{data.intro_text}</Text>
                    )}
                  </View>
                </ImageBackground>

                {/* Decorative images */}
                {data?.decor_image_1 && (
                  <Image source={{ uri: toImageUrl(data.decor_image_1) }} style={[styles.decorImage, { width: decorSize, height: decorSize, left: -16, top: -Math.round(decorSize * 0.55) - 10, transform: [{ rotate: '-10deg' }] }]} />
                )}
                {data?.decor_image_2 && (
                  <Image source={{ uri: toImageUrl(data.decor_image_2) }} style={[styles.decorImage, { width: decorSize, height: decorSize, left: -16, bottom: -Math.round(decorSize * 0.7), transform: [{ rotate: '-8deg' }] }]} />
                )}
                {data?.decor_image_3 && (
                  <Image source={{ uri: toImageUrl(data.decor_image_3) }} style={[styles.decorImage, { width: decorSize, height: decorSize, left: Math.max(8, Math.round(width / 2 - decorSize / 2) - 26), bottom: -Math.round(decorSize * 0.75), transform: [{ rotate: '8deg' }] }]} />
                )}
                {data?.decor_image_4 && (
                  <Image source={{ uri: toImageUrl(data.decor_image_4) }} style={[styles.decorImage, { width: decorSize, height: decorSize, right: -16, top: -Math.round(decorSize * 0.55) - 10, transform: [{ rotate: '15deg' }] }]} />
                )}
                {data?.decor_image_5 && (
                  <Image source={{ uri: toImageUrl(data.decor_image_5) }} style={[styles.decorImage, { width: decorSize, height: decorSize, right: -16, bottom: -Math.round(decorSize * 0.7), transform: [{ rotate: '-8deg' }] }]} />
                )}
              </View>

              {/* City cards */}
              <View style={{ marginTop: 90 }}>
              {cities.map((city) => (
                <View
                  key={city.id}
                  ref={sectionRefs[city.slug]}
                  onLayout={(e) => {
                    cityPositionsRef.current[city.slug] = e.nativeEvent.layout.y;
                  }}
                  style={[styles.card, { width: width - 40 }]}
                >
                  <ImageBackground
                    source={{ uri: city.city_image ? toImageUrl(city.city_image) : undefined }}
                    style={[styles.cityImage, { height: cityImageHeight }]}
                    imageStyle={styles.cityImageInner}
                    defaultSource={require('../../../assets/images/city_sukhum.jpg')}
                  />
                  <Text style={[styles.cityTitle, { fontSize: cityTitleSize }]}>{city.name}</Text>
                  <View style={styles.eventsContainer}>
                    {city.events && city.events.length > 0 ? (
                      city.events.map((event) => (
                        <View key={event.id} style={styles.eventItem}>
                          <View style={styles.eventHeader}>
                            <View style={styles.eventIconWrap}>
                              <ArrowIcon width={eventIconSize} height={eventIconSize} />
                            </View>
                            <Text style={[styles.eventTitle, { fontSize: eventTextSize }]} numberOfLines={1}>
                              {event.title}
                            </Text>
                          </View>
                          {event.date_info && (
                            <View style={styles.eventRow}>
                              <View style={styles.eventIconWrap}>
                                <CalendarIcon width={eventIconSize} height={eventIconSize} />
                              </View>
                              <Text style={[styles.eventRowText, { fontSize: eventTextSize }]}>{event.date_info}</Text>
                            </View>
                          )}
                          {event.location && (
                            <View style={styles.eventRow}>
                              <View style={styles.eventIconWrap}>
                                <LocationIcon width={eventIconSize} height={eventIconSize} />
                              </View>
                              <Text style={[styles.eventRowText, { fontSize: eventTextSize }]} numberOfLines={1}>{event.location}</Text>
                            </View>
                          )}
                          {event.description && (
                            <View style={styles.eventDescription}>
                              <Text style={[styles.descriptionTitle, { fontSize: eventTextSize }]}>О событии</Text>
                              <Text style={[styles.descriptionText, { fontSize: eventTextSize }]}>{parseBoldText(event.description)}</Text>
                              {event.event_url && (
                                <Text style={[styles.linkText, { fontSize: eventTextSize }]}>
                                  <Text style={styles.linkLabel}>Ссылка на мероприятие: </Text>
                                  <Text style={styles.linkUrl} onPress={() => openLink(event.event_url!)}>{event.event_url}</Text>
                                </Text>
                              )}
                            </View>
                          )}
                        </View>
                      ))
                    ) : (
                      <Text style={styles.emptyText}>Нет событий в этом городе</Text>
                    )}
                  </View>
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    borderBottomWidth: 1,
    borderBottomColor: '#E2E4E6',
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
    textAlign: 'center',
  },
  banner: {
    width: '100%',
    minHeight: 240,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerWrapper: {
    marginTop: 50,
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: 'visible',
  },
  bannerImage: {
    borderRadius: 12,
  },
  bannerOverlay: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 24,
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  bannerText: {
    fontFamily: 'Inter',
    fontWeight: '500',
    fontSize: 16,
    color: 'rgba(0,0,0,0.85)',
    textAlign: 'center',
  },
  centerIcon: {
    position: 'absolute',
    top: -30,
    alignSelf: 'center',
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  decorImage: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 12,
    shadowColor: '#1129BD',
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  tabsBar: {
    marginTop: 0,
    minHeight: 64,
    paddingVertical: 8,
    backgroundColor: 'transparent',
    marginBottom: 0,
  },
  tabsStickyWrap: {
    backgroundColor: '#0000000D',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    marginBottom: 50,
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  tabsContent: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingVertical: 0,
    alignItems: 'center',
  },
  tab: {
    paddingVertical: 12,
    borderRadius: 18,
    borderWidth: 0,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'transparent',
    shadowOpacity: 0,
    shadowRadius: 0,
    shadowOffset: { width: 0, height: 0 },
    elevation: 0,
  },
  tabText: {
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    paddingHorizontal: 4,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 0,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  card: {
    width: screenWidth - 40,
    alignSelf: 'center',
    marginBottom: 40,
  },
  cityImage: {
    width: '100%',
    height: 240,
    backgroundColor: '#EEF1FA',
    borderRadius: 15,
    overflow: 'hidden',
  },
  cityImageInner: {
    resizeMode: 'cover',
    borderRadius: 15,
  },
  cityTitle: {
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: 22,
    color: '#1129BD',
    marginTop: 10,
    textAlign: 'center',
  },
  eventsContainer: {
    width: '100%',
    marginTop: 10,
    gap: 10,
  },
  eventItem: {
    width: '100%',
    gap: 8,
  },
  eventHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    minHeight: 60,
  },
  eventIconWrap: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eventTitle: {
    fontFamily: 'Inter',
    fontWeight: '700',
    color: 'rgba(0,0,0,0.85)',
    flexShrink: 1,
  },
  eventRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    minHeight: 40,
  },
  eventRowText: {
    fontFamily: 'Inter',
    fontWeight: '400',
    color: '#000',
    flexShrink: 1,
  },
  eventDescription: {
    gap: 10,
  },
  descriptionTitle: {
    fontFamily: 'Inter',
    fontWeight: '700',
    color: '#000',
  },
  descriptionText: {
    fontFamily: 'Inter',
    fontWeight: '400',
    color: '#000',
  },
  boldText: {
    fontFamily: 'Inter',
    fontWeight: '700',
    color: '#000',
  },
  linkText: {
    fontFamily: 'Inter',
    fontWeight: '400',
    color: '#000',
  },
  linkLabel: {
    fontWeight: '700',
  },
  linkUrl: {
    textDecorationLine: 'underline',
    color: '#1129BD',
  },
  emptyText: {
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
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
