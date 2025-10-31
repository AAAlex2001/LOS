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
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Video, ResizeMode } from 'expo-av';
import ArrowIcon from '../../../assets/images/VectorParties1.svg';
import CalendarIcon from '../../../assets/images/VectorParties2.svg';
import LocationIcon from '../../../assets/images/VectorParties3.svg';
import config from '@/config';

type PartySliderItem = {
  id: number;
  media_type: 'video' | 'image';
  media_file: string;
  order: number;
  city: number;
  city_name: string;
  city_slug: string;
};

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
  slider_items: PartySliderItem[];
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
  const [currentSlide, setCurrentSlide] = useState(0);

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

  const centerIconSize = 60;

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
                      <Text style={styles.tabText}>{c.name}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              {/* Banner */}
              <View style={styles.bannerWrapper}>
                <ImageBackground
                  source={{ uri: data?.background_image ? toImageUrl(data.background_image) : undefined }}
                  style={styles.banner}
                  imageStyle={styles.bannerImage}
                  defaultSource={require('../../../assets/images/IMG_1932.jpg')}
                >
                  {data?.center_icon && (
                    <View style={styles.centerIcon}>
                      <Image
                        source={{ uri: toImageUrl(data.center_icon) }}
                        style={{ width: centerIconSize, height: centerIconSize }}
                        resizeMode="contain"
                      />
                    </View>
                  )}
                  <View style={styles.bannerOverlay}>
                    {data?.intro_text && (
                      <Text style={styles.bannerText}>{data.intro_text}</Text>
                    )}
                  </View>
                </ImageBackground>

                {/* Decorative images */}
                {data?.decor_image_1 && (
                  <Image source={{ uri: toImageUrl(data.decor_image_1) }} style={[styles.decorImage, styles.decor1]} />
                )}
                {data?.decor_image_2 && (
                  <Image source={{ uri: toImageUrl(data.decor_image_2) }} style={[styles.decorImage, styles.decor2]} />
                )}
                {data?.decor_image_3 && (
                  <Image source={{ uri: toImageUrl(data.decor_image_3) }} style={[styles.decorImage, styles.decor3]} />
                )}
                {data?.decor_image_4 && (
                  <Image source={{ uri: toImageUrl(data.decor_image_4) }} style={[styles.decorImage, styles.decor4]} />
                )}
                {data?.decor_image_5 && (
                  <Image source={{ uri: toImageUrl(data.decor_image_5) }} style={[styles.decorImage, styles.decor5]} />
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
                  style={styles.card}
                >
                  <ImageBackground
                    source={{ uri: city.city_image ? toImageUrl(city.city_image) : undefined }}
                    style={styles.cityImage}
                    imageStyle={styles.cityImageInner}
                    defaultSource={require('../../../assets/images/city_sukhum.jpg')}
                  />
                  <Text style={styles.cityTitle}>{city.name}</Text>

                  <View style={styles.eventsContainer}>
                    {city.events && city.events.length > 0 ? (
                      city.events.map((event) => (
                        <View key={event.id} style={styles.eventItem}>
                          <View style={styles.eventHeader}>
                            <View style={styles.eventIconWrap}>
                              <ArrowIcon width={32} height={64} />
                            </View>
                            <Text style={styles.eventTitle} numberOfLines={1}>
                              {event.title}
                            </Text>
                          </View>
                          {event.date_info && (
                            <View style={styles.eventRow}>
                              <View style={styles.eventIconWrap}>
                                <CalendarIcon width={30} height={30} />
                              </View>
                              <Text style={styles.eventRowText}>{event.date_info}</Text>
                            </View>
                          )}
                          {event.location && (
                            <View style={styles.eventRow}>
                              <View style={styles.eventIconWrap}>
                                <LocationIcon width={32} height={32} />
                              </View>
                              <Text style={styles.eventRowText} numberOfLines={1}>{event.location}</Text>
                            </View>
                          )}
                          {event.description && (
                            <View style={styles.eventDescription}>
                              <Text style={styles.descriptionTitle}>О событии</Text>
                              <Text style={styles.descriptionText}>{parseBoldText(event.description)}</Text>
                              {event.event_url && (
                                <Text style={styles.linkText}>
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

                    {/* Ad Slider - after events */}
                    {city.slider_items && city.slider_items.length > 0 && (
                      <View style={styles.adBlock}>
                        <FlatList
                          data={city.slider_items.sort((a, b) => a.order - b.order)}
                          keyExtractor={(item) => `${city.id}-${item.id}`}
                          renderItem={({ item }) => (
                            <View style={styles.adSlide}>
                              {item.media_type === 'video' ? (
                                <Video
                                  source={{ uri: toImageUrl(item.media_file) }}
                                  style={styles.adImage}
                                  shouldPlay
                                  isLooping
                                  isMuted
                                  useNativeControls={false}
                                />
                              ) : (
                                <Image source={{ uri: toImageUrl(item.media_file) }} style={styles.adImage} resizeMode="cover" />
                              )}
                            </View>
                          )}
                          horizontal
                          pagingEnabled
                          showsHorizontalScrollIndicator={false}
                          snapToInterval={350}
                          decelerationRate="fast"
                        />
                      </View>
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
    width: 349,
    minHeight: 132,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 32,
    borderRadius: 15,
  },
  bannerWrapper: {
    marginTop: 50,
    alignSelf: 'center',
    borderRadius: 15,
    overflow: 'visible',
  },
  bannerImage: {
    borderRadius: 15,
  },
  bannerOverlay: {
    width: 309,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerText: {
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 17,
    color: 'rgba(0, 0, 0, 0.85)',
    textAlign: 'center',
  },
  decorImage: {
    position: 'absolute',
    width: 44,
    height: 44,
    borderRadius: 8,
    shadowColor: '#D5DAEF',
    shadowOpacity: 1,
    shadowRadius: 15.4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 8,
  },
  decor1: {
    left: 10,
    top: -10,
    transform: [{ rotate: '-10deg' }],
  },
  decor2: {
    left: 20,
    top: 210,
    transform: [{ rotate: '-8deg' }],
  },
  decor3: {
    left: 160,
    top: 230,
    transform: [{ rotate: '8deg' }],
  },
  decor4: {
    right: 20,
    top: 210,
    transform: [{ rotate: '-8deg' }],
  },
  decor5: {
    right: 10,
    top: -10,
    transform: [{ rotate: '15deg' }],
  },
  centerIcon: {
    position: 'absolute',
    top: -30,
    alignSelf: 'center',
    width: 60,
    height: 60,
    zIndex: 10,
  },
  tabsBar: {
    height: 46,
    backgroundColor: '#FFFFFF',
    shadowColor: 'rgba(0, 0, 0, 0.05)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 11,
    elevation: 2,
  },
  tabsStickyWrap: {
    marginBottom: 50,
    marginHorizontal: -20,
  },
  tabsContent: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingVertical: 0,
    alignItems: 'center',
    gap: 10,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 4,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabText: {
    fontFamily: 'Roboto',
    fontWeight: '700',
    fontSize: 12,
    lineHeight: 14,
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
    width: '100%',
    alignSelf: 'center',
    marginBottom: 40,
  },
  cityImage: {
    width: '100%',
    height: 281,
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
    fontSize: 14,
    lineHeight: 17,
    color: '#1129BD',
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    textAlign: 'center',
    textTransform: 'uppercase',
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
    gap: 8,
    width: 350,
    height: 64,
  },
  eventIconWrap: {
    width: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eventTitle: {
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 17,
    color: 'rgba(0, 0, 0, 0.85)',
    flexShrink: 1,
  },
  eventRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  eventRowText: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 17,
    color: '#000',
    flexShrink: 1,
  },
  eventDescription: {
    gap: 14,
  },
  descriptionTitle: {
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 17,
    color: '#000',
  },
  descriptionText: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 17,
    color: '#000',
  },
  boldText: {
    fontFamily: 'Inter',
    fontWeight: '700',
    color: '#000',
  },
  linkText: {
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 17,
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

  adBlock: {
    width: '100%',
    height: 200,
    backgroundColor: '#D5DAEF',
    borderRadius: 15,
    overflow: 'hidden',
    position: 'relative',
    marginTop: 20,
  },
  adSlide: {
    width: 350,
    height: 200,
  },
  adImage: {
    width: '100%',
    height: '100%',
  },
});
