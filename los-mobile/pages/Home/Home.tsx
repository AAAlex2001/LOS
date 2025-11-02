import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { VideoView, useVideoPlayer } from 'expo-video';
import AboutAbkhaziaModal from '../../components/Screens/AboutAbkhaziaModal';
import EntertainmentScreen from '../../components/Screens/EntertainmentScreen';
import PlanTripScreen from '../../components/Screens/PlanTripScreen';
import ImportantTripScreen from '../../components/Screens/ImportantTripScreen';
import SidebarScreen from '../../components/Screens/SidebarScreen';
import { MaterialCommunityIcons, FontAwesome5, MaterialIcons, Entypo } from '@expo/vector-icons';
import config from '@/config';

const { width: screenWidth } = Dimensions.get('window');
const API_BASE = config.API_BASE;

// --- Универсальные смещения ---
const topEllipseShiftX = 20;
const bottomEllipseShiftX = -20;
const topEllipseShiftY = -10;
const bottomEllipseShiftY = 0;

// Нижний полукруг
const bottomEllipseWidth = screenWidth * 8.5;
const bottomEllipseHeight = bottomEllipseWidth / 2;
const bottomEllipseLeft = -((bottomEllipseWidth - screenWidth) / 2) + bottomEllipseShiftX;
const bottomEllipseTop = 654 + bottomEllipseShiftY;

// Верхний полукруг
const topEllipseWidth = screenWidth * 8.5;
const topEllipseHeight = topEllipseWidth / 2;
const topEllipseLeft = -((topEllipseWidth - screenWidth) / 2) + topEllipseShiftX;
const sliderTop = 100;
const topEllipseTop = sliderTop - topEllipseHeight + topEllipseShiftY;

interface SliderItem {
  type: 'video' | 'image';
  src: string | any;
}

interface TabItem {
  title: string;
  icon: React.ReactNode;
  multiline?: boolean;
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

const SliderVideo = ({ src }: { src: string }) => {
  const player = useVideoPlayer(encodeURI(String(src)), (p) => {
    p.loop = true;
    p.muted = true;
    p.play();
  });
  return (
    <VideoView
      player={player}
      style={styles.slideImage}
      contentFit="cover"
      fullscreenOptions={{ enabled: false }}
    />
  );
};

const mascotImages = [
  require('../../assets/images/Guy11.png'),
  require('../../assets/images/Wink.png'),
  require('../../assets/images/Thinking.png'),
  require('../../assets/images/Oh.png'),
  require('../../assets/images/Aha.png'),
  require('../../assets/images/Wink2.png'),
];

const HomePage = () => {
  const insets = useSafeAreaInsets();
  const sliderHeight = 539; // base height of the slider
  const bottomCurveTopDynamic = 133 + sliderHeight - 12; // place the white curve just under the slider
  const [data, setData] = useState<HomeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [aboutVisible, setAboutVisible] = useState(false);
  const [entertainmentVisible, setEntertainmentVisible] = useState(false);
  const [planTripVisible, setPlanTripVisible] = useState(false);
  const [importantTripVisible, setImportantTripVisible] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const flatListRef = useRef<FlatList<SliderItem>>(null);

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
      multiline: tab.label.includes('\n') || tab.label.length > 15,
      action: () => {
        if (tab.label.includes('Абхазия') || tab.label === 'Об Абхазии') setAboutVisible(true);
        if (tab.label.includes('Развлечения') || tab.label.includes('заняться')) setEntertainmentVisible(true);
        if (tab.label.includes('поездку') || tab.label.includes('Запланируйте')) setPlanTripVisible(true);
        if (tab.label.includes('Необходимо') || tab.label.includes('поездке')) setImportantTripVisible(true);
      }
    })) || [];

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / 433);
    if (slideIndex !== currentSlide) {
      setCurrentSlide(slideIndex);
    }
  };

  const renderSliderItem = ({ item }: { item: SliderItem }) => (
    <View style={[styles.slide, { height: sliderHeight }]}>
      {item.type === 'video' ? (
        <SliderVideo src={String(item.src)} />
      ) : (
        <Image source={{ uri: item.src }} style={styles.slideImage} contentFit="cover" />
      )}
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Загрузка...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.homePage}>
      {/* Menu bar + Logo + Mascot */}
      <View style={styles.headerContainer}>
        <View style={styles.headerCurve} />
        
        <TouchableOpacity style={styles.menuBar} onPress={() => setSidebarVisible(true)}>
          <View style={styles.menuFrame}>
            <View style={styles.menuLine} />
            <View style={styles.menuLine} />
            <View style={styles.menuLine} />
          </View>
        </TouchableOpacity>

        <View style={styles.logoMascotContainer}>
          <Text style={styles.logoText}>Land of Soul</Text>
          <Image 
            source={mascotImages[currentSlide % mascotImages.length]} 
            style={styles.mascotImage}
            contentFit="contain"
          />
        </View>
          </View>

      {/* Slider */}
      <View style={[styles.slider, { height: sliderHeight }]}>
            <FlatList
              ref={flatListRef}
              data={sliderItems}
              renderItem={renderSliderItem}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
              scrollEventThrottle={16}
          snapToInterval={433}
          decelerationRate="fast"
          contentContainerStyle={styles.slides}
            />
          </View>

      {/* Dots */}
      <View style={styles.dots}>
        {sliderItems.map((_, idx) => (
          <View
            key={idx}
            style={[styles.dot, currentSlide % sliderItems.length === idx ? styles.activeDot : {}]}
          />
        ))}
      </View>

      {/* Bottom Curve in front of slider, behind tabs */}
      <View style={[
        styles.bottomCurve,
        { top: bottomCurveTopDynamic }
      ]} />

      {/* Tabs */}
      <View style={[
        styles.tabsContainer,
        { bottom: Math.max((insets.bottom || 0) + 12, 12) }
      ]}>
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
              <View style={styles.tabIcon}>
                 <View style={styles.iconCircle}>{tab.icon}</View>
              </View>
              <Text style={[
                styles.tabText,
                tab.multiline && styles.tabTextMultiline
              ]}>
                {tab.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
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
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  homePage: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#FFFFFF',
    overflow: 'visible',
  },

  // Header
  headerContainer: {
    position: 'absolute',
    width: 480,
    height: 91,
    left: (screenWidth - 480) / 2,
    top: 60,
    zIndex: 10,
  },
  headerCurve: {
    position: 'absolute',
    width: topEllipseWidth,
    height: topEllipseHeight,
    left: topEllipseLeft,
    top: topEllipseTop,
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: topEllipseWidth / 2,
    borderBottomRightRadius: topEllipseWidth / 2,
  },
  menuBar: {
    position: 'absolute',
    left: '13.33%',
    top: '2%',
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
  logoMascotContainer: {
    position: 'absolute',
    left: '50%',
    top: 0,
    bottom: 0,
    alignItems: 'center',
  },
  logoText: {
    position: 'absolute',
    top: 0,
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 24,
    color: '#000000D9',
  },
  mascotImage: {
    position: 'absolute',
    height: 78,
    width: 78,
    top: 12,
  },

  // Slider
  slider: {
    position: 'absolute',
    width: 433,
    height: 539,
    left: (screenWidth - 433) / 2,
    top: 133,
    zIndex: 5,
  },
  slides: {
    // This is for the content inside FlatList
  },
  slide: {
    width: 433,
    height: 539,
  },
  slideImage: {
    width: '100%',
    height: '100%',
  },

  // Dots
  dots: {
    position: 'absolute',
    width: 50,
    height: 6,
    left: (screenWidth - 50) / 2,
    top: 638,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    zIndex: 10,
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

  // White Ellipse
  bottomCurve: {
    position: 'absolute',
    width: bottomEllipseWidth,
    height: bottomEllipseHeight,
    left: bottomEllipseLeft,
    top: 0,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: bottomEllipseWidth / 2,
    borderTopRightRadius: bottomEllipseWidth / 2,
    zIndex: 6,
    // Let touches pass through
    pointerEvents: 'none',
  },

  // Tabs
  tabsContainer: {
    position: 'absolute',
    width: '100%',
    height: 113,
    // Anchor the tabs to the safe-area bottom to avoid being cut off on short screens
    bottom: 0,
    paddingHorizontal: 20,
    zIndex: 10,
  },
  tabsContent: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'flex-start'
  },
  tabComponent: {
    width: 97,
    alignItems: 'center',
    gap: 10,
  },
  tabIcon: {
    width: 73,
    height: 73,
    backgroundColor: 'transparent',
    borderRadius: 36.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCircle: {
    width: 73,
    height: 73,
    borderRadius: 100,
    backgroundColor: '#1129BD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconPlaceholder: {
    width: 48,
    height: 48,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    opacity: 0.3,
  },
  tabText: {
    width: '100%',
    height: 15,
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: 12,
    lineHeight: 15,
    textAlign: 'center',
    color: '#000000',
  },
  tabTextMultiline: {
    height: 30,
  },

  // Loading
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

export default function HomePageWrapper() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <HomePage />
    </SafeAreaView>
  );
}
