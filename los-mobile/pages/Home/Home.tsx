import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  NativeSyntheticEvent,
  NativeScrollEvent,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { VideoView, useVideoPlayer } from 'expo-video';
import Svg, { Path } from 'react-native-svg';
import AboutAbkhaziaModal from '../../components/Screens/AboutAbkhaziaModal';
import EntertainmentScreen from '../../components/Screens/EntertainmentScreen';
import PlanTripScreen from '../../components/Screens/PlanTripScreen';
import ImportantTripScreen from '../../components/Screens/ImportantTripScreen';
import SidebarScreen from '../../components/Screens/SidebarScreen';
import { MaterialCommunityIcons, FontAwesome5, MaterialIcons, Entypo } from '@expo/vector-icons';
import config from '@/config';
const API_BASE = config.API_BASE;

interface SliderItem {
  type: 'video' | 'image';
  src: string | any;
}

interface TabItem {
  title: string;
  icon: React.ReactNode;
  action?: () => void;
}

interface HomeData {
  slider_items: { media_type: 'video' | 'image'; url: string; mobile_video_url?: string; alt: string; order: number }[];
  mobile_tabs: { group: 'about' | 'activities' | 'booking' | 'essentials'; label: string; order: number }[];
  about_categories: { id: number; title: string; slug: string; is_active: boolean; order: number }[];
  entertainment_categories: { id: number; title: string; slug: string; is_active: boolean; order: number }[];
  plan_trip_categories: { id: number; title: string; slug: string; is_active: boolean; order: number }[];
  important_trip_categories: { id: number; title: string; slug: string; is_active: boolean; order: number }[];
}

const toMedia = (url: string) => `${API_BASE}/media/${url}`;

const getIconForTab = (label: string) => {
  if (label === 'Об Абхазии' || label === 'Абхазия') return <MaterialCommunityIcons name="map" size={40} color="#fff" />;
  if (label === 'Развлечения' || label.includes('Развлечения') || label.includes('заняться')) return <MaterialCommunityIcons name="party-popper" size={40} color="#fff" />;
  if (label.includes('Запланируйте') || label.includes('поездку')) return <MaterialIcons name="event-available" size={40} color="#fff" />;
  if (label.includes('Необходимо') || label.includes('поездке')) return <Entypo name="suitcase" size={40} color="#fff" />;
  return <FontAwesome5 name="city" size={40} color="#fff" />;
};

const SliderVideo = ({ src, active }: { src: string; active: boolean }) => {
  const player = useVideoPlayer(encodeURI(String(src)), (p) => {
    p.loop = true;
    p.muted = true;
  });
  useEffect(() => {
    try {
      if (active) {
        player.play();
      } else {
        player.pause();
      }
    } catch {}
  }, [active, player]);
  return (
    <View style={styles.slideImage} pointerEvents="none">
      <VideoView
        player={player}
        style={StyleSheet.absoluteFillObject}
        contentFit="cover"
        nativeControls={false}
        pointerEvents="none"
        fullscreenOptions={{ enabled: false }}
      />
    </View>
  );
};

const TopCurve: React.FC<{ width: number }> = ({ width }) => (
  <Svg
    pointerEvents="none"
    width={width}
    height={80}
    viewBox={`0 0 ${width} 80`}
    style={styles.topCurve}
  >
    <Path d={`M0,0 H${width} V40 Q ${width / 2},80 0,40 Z`} fill="#FFFFFF" />
  </Svg>
);

const BottomCurve: React.FC<{ width: number }> = ({ width }) => (
  <Svg
    pointerEvents="none"
    width={width}
    height={110}
    viewBox={`0 0 ${width} 110`}
    style={styles.bottomCurve}
  >
    <Path d={`M0,110 H${width} V60 Q ${width / 2},0 0,60 Z`} fill="#FFFFFF" />
  </Svg>
);

const mascotImages = [
  require('../../assets/images/Guy11.png'),
  require('../../assets/images/Wink.png'),
  require('../../assets/images/Thinking.png'),
  require('../../assets/images/Oh.png'),
  require('../../assets/images/Aha.png'),
  require('../../assets/images/Wink2.png'),
];

const HomePage = () => {
  const [data, setData] = useState<HomeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [aboutVisible, setAboutVisible] = useState(false);
  const [entertainmentVisible, setEntertainmentVisible] = useState(false);
  const [planTripVisible, setPlanTripVisible] = useState(false);
  const [importantTripVisible, setImportantTripVisible] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const flatListRef = useRef<FlatList<SliderItem>>(null);
  const isOverlayOpen = aboutVisible || entertainmentVisible || planTripVisible || importantTripVisible || sidebarVisible;
  const { width: windowWidth } = useWindowDimensions();
  const [sliderWidth, setSliderWidth] = useState<number>(0);
  const effectiveWidth = sliderWidth || windowWidth;

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/home/page/content/`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load homepage');
        const json = await res.json();
        setData(json);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const sliderItems: SliderItem[] = data?.slider_items
    ?.sort((a, b) => a.order - b.order)
    .map(item => ({
      type: item.media_type,
      src: item.mobile_video_url && item.media_type === 'video' 
        ? toMedia(item.mobile_video_url) 
        : item.url ? toMedia(item.url) : ''
    })) || [];

  const tabs: TabItem[] = data?.mobile_tabs
    ?.sort((a, b) => a.order - b.order)
    .map(tab => ({
      title: tab.label,
      icon: getIconForTab(tab.label),
      action: () => {
        if (tab.label.includes('Абхазия') || tab.label === 'Об Абхазии') setAboutVisible(true);
        if (tab.label.includes('Развлечения') || tab.label.includes('заняться')) setEntertainmentVisible(true);
        if (tab.label.includes('поездку') || tab.label.includes('Запланируйте')) setPlanTripVisible(true);
        if (tab.label.includes('Необходимо') || tab.label.includes('поездке')) setImportantTripVisible(true);
      }
    })) || [];

  const onMomentumEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (isOverlayOpen) return; // freeze index while modal opened
    const pageWidth = effectiveWidth;
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / pageWidth);
    if (slideIndex !== currentSlide) setCurrentSlide(slideIndex);
  };

  const renderSliderItem = ({ item, index }: { item: SliderItem; index: number }) => (
    <View style={[styles.slide, { width: effectiveWidth }]}>
      {item.type === 'video' ? (
        <SliderVideo src={String(item.src)} active={!isOverlayOpen && (currentSlide % (sliderItems.length || 1) === index)} />
      ) : (
        <View style={styles.slideImage} pointerEvents="none">
          <Image source={{ uri: item.src }} style={StyleSheet.absoluteFillObject} contentFit="cover" />
        </View>
      )}
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['bottom']}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Загрузка...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Logo + Mascot + Slider Container */}
        <View style={styles.logoSliderContainer}>
          {/* Logo + Mascot */}
          <View style={styles.logoContainer}>
            <View style={styles.headerRow}>
              <Text style={styles.logoText}>Land of Soul</Text>
              <TouchableOpacity style={styles.menuBar} onPress={() => setSidebarVisible(true)}>
                <View style={styles.menuFrame}>
                  <View style={styles.menuLine} />
                  <View style={styles.menuLine} />
                  <View style={styles.menuLine} />
                </View>
              </TouchableOpacity>
            </View>
            <Image 
              source={mascotImages[currentSlide % mascotImages.length]} 
              style={styles.mascotImage}
              contentFit="contain"
            />
          </View>

          {/* Slider */}
          <View style={styles.sliderContainer} onLayout={(e) => setSliderWidth(Math.round(e.nativeEvent.layout.width))}>
            <FlatList
              ref={flatListRef}
              data={sliderItems}
              renderItem={renderSliderItem}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={onMomentumEnd}
              snapToInterval={effectiveWidth}
              decelerationRate="fast"
              initialNumToRender={1}
              windowSize={2}
              maxToRenderPerBatch={1}
              removeClippedSubviews
              getItemLayout={(_, index) => ({ length: effectiveWidth, offset: effectiveWidth * index, index })}
              scrollEnabled={!isOverlayOpen}
            />
            <TopCurve width={effectiveWidth} />
            <BottomCurve width={effectiveWidth} />
            {/* Dots overlayed on slider (rendered last to be on top) */}
            {sliderItems.length > 0 && (
              <View style={styles.dotsOnSlider} pointerEvents="none">
                <View style={styles.dots}>
                  {sliderItems.map((_, idx) => (
                    <View
                      key={idx}
                      style={[
                        styles.dot,
                        currentSlide % sliderItems.length === idx ? styles.activeDot : {}
                      ]}
                    />
                  ))}
                </View>
              </View>
            )}
          </View>

          {/* Dots moved onto slider */}
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tabsContent}
          >
            {tabs.map((tab, index) => (
              <TouchableOpacity
                key={index}
                style={styles.tabComponent}
                onPress={tab.action}
              >
                <View style={styles.iconCircle}>{tab.icon}</View>
                <Text style={styles.tabText}>{tab.title}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      {/* Modals */}
      <AboutAbkhaziaModal visible={aboutVisible} onClose={() => setAboutVisible(false)} categories={data?.about_categories || []} />
      <EntertainmentScreen visible={entertainmentVisible} onClose={() => setEntertainmentVisible(false)} categories={data?.entertainment_categories || []} />
      <PlanTripScreen visible={planTripVisible} onClose={() => setPlanTripVisible(false)} categories={data?.plan_trip_categories || []} />
      <ImportantTripScreen visible={importantTripVisible} onClose={() => setImportantTripVisible(false)} categories={data?.important_trip_categories || []} />
      <SidebarScreen
        visible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
        onNavigateHome={() => {
          setSidebarVisible(false);
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  menuBar: {
    position: 'absolute',
    left: 20,
    top: 0,
    bottom: 0,
    padding: 8,
    justifyContent: 'center'
  },
  menuFrame: {
    width: 24,
    height: 15,
    justifyContent: 'space-between',
  },
  menuLine: {
    width: 24,
    height: 2,
    backgroundColor: '#000000',
    borderRadius: 1,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  logoSliderContainer: {
    flexDirection: 'column',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: -14,
    position: 'relative',
    zIndex: 50,
  },
  headerRow: {
    width: '100%',
    minHeight: 44,
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 0,
  },
  logoText: {
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 24,
    color: '#000000D9',
  },
  mascotImage: {
    height: 78,
    width: 78,
    marginTop: 0,
  },
  sliderContainer: {
    width: '100%',
    height: 539,
    position: 'relative',
    marginTop: -45,
  },
  slide: {
    height: 540,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
  },
  slideImage: {
    width: '100%',
    height: '100%',
  },
  topCurve: {
    position: 'absolute',
    top: -1,
    left: 0,
    right: 0,
  },
  bottomCurve: {
    position: 'absolute',
    bottom: -1,
    left: 0,
    right: 0,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    position: 'relative',
    zIndex: 20,
  },
  dotsOnSlider: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 84,
    alignItems: 'center',
    zIndex: 60,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(1, 14, 89, 0.3)',
  },
  activeDot: {
    backgroundColor: '#1129BD',
  },
  tabsContainer: {
    marginTop: -12,
    paddingHorizontal: 0,
  },
  tabsContent: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexGrow: 1,
  },
  tabComponent: {
    alignItems: 'center',
    gap: 10,
    justifyContent: 'flex-start',
    width: 110,
    flexShrink: 0,
  },
  iconCircle: {
    width: 73,
    height: 73,
    borderRadius: 36.5,
    backgroundColor: '#1129BD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: 12,
    lineHeight: 15,
    textAlign: 'center',
    color: '#000000',
    maxWidth: 97,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#666',
  },
});

export default HomePage;
