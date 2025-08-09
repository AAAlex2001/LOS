import React, { useMemo, useRef } from 'react';
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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ArrowIcon from '../../assets/images/VectorParties1.svg';
import CalendarIcon from '../../assets/images/VectorParties2.svg';
import LocationIcon from '../../assets/images/VectorParties3.svg';

const { width: screenWidth } = Dimensions.get('window');

type PartiesScreenProps = {
  visible: boolean;
  onClose: () => void;
};

type City = {
  id: string;
  title: string;
};

const cities: City[] = [
  { id: 'suhum', title: 'Сухум' },
  { id: 'gagra', title: 'Гагра' },
  { id: 'pitsunda', title: 'Пицунда' },
  { id: 'gudauta', title: 'Гудаута' },
  { id: 'newafon', title: 'Новый Афон' },
  { id: 'gulripsh', title: 'Гулрыпш' },
  { id: 'ochamchira', title: 'Очамчыра' },
  { id: 'tkuarchal', title: 'Ткуарчал' },
  { id: 'gal', title: 'Гал' },
];

const cityIdToImage: Record<string, any> = {
  suhum: require('../../assets/images/city_sukhum.jpg'),
  gagra: require('../../assets/images/city_gagra.jpg'),
  pitsunda: require('../../assets/images/city_pitsunda.jpg'),
  gudauta: require('../../assets/images/city_gudauta.jpg'),
  newafon: require('../../assets/images/city_newafon.jpg'),
  gulripsh: require('../../assets/images/city_gulripsh.jpg'),
  ochamchira: require('../../assets/images/city_ochamchira.jpg'),
  tkuarchal: require('../../assets/images/city_tkuarchal.jpg'),
  gal: require('../../assets/images/city_sukhum.jpg'),
};

export default function PartiesScreen({ visible, onClose }: PartiesScreenProps) {
  const { width } = useWindowDimensions();

  const scaleForWidth = (base: number) => {
    const k = width / 390; // 390 ~ iPhone 12 baseline
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
  const tabsBarHeight = Math.max(48, Math.round(scaleForWidth(64)));
  const cityTitleSize = Math.max(16, Math.round(scaleForWidth(18)));
  const sectionTitleSize = Math.max(14, Math.round(scaleForWidth(16)));
  const emptyTextSize = Math.max(14, Math.round(scaleForWidth(16)));
  const adTextSize = Math.max(12, Math.round(scaleForWidth(14)));
  const adBlockHeight = Math.round(scaleForWidth(220));

  // SCSS-like breakpoints can be added if we need discrete jumps

  const scrollRef = useRef<ScrollView | null>(null);
  const sectionRefs = useMemo(
    () => Object.fromEntries(cities.map((c) => [c.id, React.createRef<View>()])),
    []
  ) as Record<string, React.RefObject<View>>;
  const cityPositionsRef = useRef<Record<string, number>>({});

  const scrollToCity = (cityId: string) => {
    const y = cityPositionsRef.current[cityId];
    if (!scrollRef.current || typeof y !== 'number') {
      return;
    }
    scrollRef.current.scrollTo({ y: Math.max(0, y - 12), animated: true });
  };

  const onScroll = (_e: NativeSyntheticEvent<NativeScrollEvent>) => {
    // Reserved for future features (e.g., updating active tab on scroll)
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerBar}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <View style={styles.headerTitleWrap}>
            <Text style={styles.headerTitle}>ВЕЧЕРИНКИ И ЯРКИЕ ВПЕЧАТЛЕНИЯ</Text>
          </View>
          <View style={{ width: 36 }} />
        </View>

        {/* Scrollable content (banner + tabs + city cards) */}
        <ScrollView
          ref={scrollRef}
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          onScroll={onScroll}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
        >
          {/* Banner with background and decor */}
          <View style={styles.bannerWrapper}>
            <ImageBackground
              source={require('../../assets/images/IMG_1932.jpg')}
              style={[styles.banner, { minHeight: bannerMinHeight }]}
              imageStyle={styles.bannerImage}
            >
              <View style={[
                styles.centerIcon,
                { width: centerIconSize, height: centerIconSize, top: -Math.round(centerIconSize * 0.6) }
              ]}>
                <Image
                  source={require('../../assets/images/parties1.png')}
                  style={{ width: centerIconSize, height: centerIconSize }}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.bannerOverlay}>
                <Text style={[styles.bannerTitle, { fontSize: bannerTitleSize }]}>Абхазия зажигает огни!</Text>
                <Text style={[styles.bannerText, { fontSize: bannerTextSize }]}>
                  От атмосферных винодельческих вечеров с дегустациями местных вин до зажигательных пляжных вечеринок под открытым небом — здесь каждый найдёт свой идеальный вечер.
                </Text>
                <Text style={[styles.bannerText, { fontSize: bannerTextSize }]}>
                  Готовы окунуться в атмосферу беззаботного отдыха? Выбирайте событие по настроению — и вперёд за впечатлениями!
                </Text>
              </View>
            </ImageBackground>

            {/* Decorative images */}
            <Image source={require('../../assets/images/parties2.jpg')} style={[styles.decorImage, { width: decorSize, height: decorSize, left: -16, top: -Math.round(decorSize * 0.55) - 3, transform: [{ rotate: '-10deg' }] }]} />
            <Image source={require('../../assets/images/parties3.jpg')} style={[styles.decorImage, { width: decorSize, height: decorSize, left: -16, bottom: -Math.round(decorSize * 0.7), transform: [{ rotate: '-8deg' }] }]} />
            <Image source={require('../../assets/images/parties4.jpg')} style={[styles.decorImage, { width: decorSize, height: decorSize, left: Math.max(8, Math.round(width / 2 - decorSize / 2) - 26), bottom: -Math.round(decorSize * 0.75), transform: [{ rotate: '8deg' }] }]} />
            <Image source={require('../../assets/images/parties5.png')} style={[styles.decorImage, { width: decorSize, height: decorSize, right: -16, top: -Math.round(decorSize * 0.55), transform: [{ rotate: '15deg' }] }]} />
            <Image source={require('../../assets/images/parties6.jpg')} style={[styles.decorImage, { width: decorSize, height: decorSize, right: -16, bottom: -Math.round(decorSize * 0.7), transform: [{ rotate: '-8deg' }] }]} />
          </View>

          {/* Tabs (sticky under the title) */}
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
                  style={[
                    styles.tab,
                    idx === cities.length - 1 ? { marginRight: 5 } : { marginRight: 12 },
                  ]}
                  onPress={() => scrollToCity(c.id)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.tabText, { fontSize: tabTextSize }]}>{c.title}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* City cards */}
          {cities.map((c) => (
            <View
              key={c.id}
              ref={sectionRefs[c.id]}
              onLayout={(e) => {
                cityPositionsRef.current[c.id] = e.nativeEvent.layout.y;
              }}
              style={[styles.card, { width: width - 32 }]}
            >
              <View style={styles.cityHeader}>
                <Text style={[styles.cityTitle, { fontSize: cityTitleSize }]}>{c.title}</Text>
              </View>
              <ImageBackground
                source={cityIdToImage[c.id]}
                style={[styles.cityImage, { height: cityImageHeight }]}
                imageStyle={styles.cityImageInner}
              />
              <View style={styles.cardBody}>
                {/* Events list placeholder */}
                <Text style={[styles.sectionTitle, { fontSize: sectionTitleSize }]}>События</Text>
                <View style={styles.eventsContainer}>
                  <View style={styles.eventItem}>
                    <View style={styles.eventHeader}>
                      <View style={styles.eventIconWrap}>
                        <ArrowIcon width={eventIconSize} height={eventIconSize} />
                      </View>
                      <Text style={[styles.eventTitle, { fontSize: eventTextSize }]} numberOfLines={1}>
                        Название события
                      </Text>
                    </View>
                    <View style={styles.eventRow}>
                      <View style={styles.eventIconWrap}>
                        <CalendarIcon width={eventIconSize} height={eventIconSize} />
                      </View>
                      <Text style={[styles.eventRowText, { fontSize: eventTextSize }]}>дд месяц гггг — чч:мм</Text>
                    </View>
                    <View style={styles.eventRow}>
                      <View style={styles.eventIconWrap}>
                        <LocationIcon width={eventIconSize} height={eventIconSize} />
                      </View>
                      <Text style={[styles.eventRowText, { fontSize: eventTextSize }]} numberOfLines={1}>Адрес места проведения</Text>
                    </View>
                    <View style={styles.eventDescription}>
                      <Text style={[styles.descriptionTitle, { fontSize: eventTextSize }]}>
                        О событии
                      </Text>
                      <Text style={[styles.descriptionText, { fontSize: eventTextSize }]}>
                        Описание события будет загружаться из админки.
                      </Text>
                      <Text style={[styles.linkText, { fontSize: eventTextSize }]}>
                        <Text style={styles.linkLabel}>Ссылка на мероприятие: </Text>
                        <Text style={styles.linkUrl}>будет добавлена</Text>
                      </Text>
                    </View>
                  </View>
                </View>
                {/* Ad block placeholder */}
                <View style={[styles.adBlock, { height: adBlockHeight }]}>
                  <Text style={[styles.adText, { fontSize: adTextSize }]}>Рекламный блок</Text>
                </View>
              </View>
            </View>
          ))}
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
    height: 96,
    paddingTop: 44,
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
    marginTop: 40,
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
  bannerTitle: {
    fontFamily: 'Inter',
    fontWeight: '800',
    fontSize: 22,
    color: '#1129BD',
    marginBottom: 8,
  },
  bannerText: {
    fontFamily: 'Inter',
    fontWeight: '500',
    fontSize: 16,
    color: 'rgba(0,0,0,0.85)',
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
  centerIconImage: {
    width: 90,
    height: 90,
  },
  decorImage: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 12,
    // mimic box-shadow from web
    shadowColor: '#1129BD',
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  decorTopLeft: { left: 8, top: -40 },
  decorTopRight: { right: 8, top: -40 },
  decorBottomLeft: { left: 8, bottom: -40 },
  decorBottomCenter: { left: (screenWidth - 80) / 2 - 16, bottom: -50 },
  decorBottomRight: { right: 8, bottom: -40 },
  tabsBar: {
    marginTop: 58,
    minHeight: 64,
    paddingVertical: 8,
    backgroundColor: 'transparent',
  },
  tabsStickyWrap: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  tabsContent: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingVertical: 0,
    alignItems: 'center',
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#1129BD',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    // remove any bluish shadow behind tabs
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
    color: '#1129BD',
    textAlign: 'center',
    paddingHorizontal: 4,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  card: {
    width: screenWidth - 32,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E4E6',
    marginBottom: 16,
    overflow: 'hidden',
  },
  cityHeader: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  cityTitle: {
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: 22,
    color: '#1129BD',
  },
  cityImage: {
    width: '100%',
    height: 240,
    backgroundColor: '#EEF1FA',
  },
  cityImageInner: {
    resizeMode: 'cover',
  },
  cardBody: {
    paddingHorizontal: 16,
    paddingVertical: 18,
  },
  sectionTitle: {
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: 16,
    color: '#000',
    marginBottom: 8,
  },
  eventsContainer: {
    width: '100%',
    gap: 10,
    marginBottom: 16,
  },
  eventItem: {
    width: '100%',
    gap: 8,
  },
  eventHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    height: 60,
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
    height: 40,
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
  },
  adBlock: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    backgroundColor: 'rgba(17, 41, 189, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  adText: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 14,
    color: 'rgba(0,0,0,0.6)',
  },
  emptyText: {
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
});


