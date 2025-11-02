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
      action: () => {
        if (tab.label.includes('Абхазия') || tab.label === 'Об Абхазии') setAboutVisible(true);
        if (tab.label.includes('Развлечения') || tab.label.includes('заняться')) setEntertainmentVisible(true);
        if (tab.label.includes('поездку') || tab.label.includes('Запланируйте')) setPlanTripVisible(true);
        if (tab.label.includes('Необходимо') || tab.label.includes('поездке')) setImportantTripVisible(true);
      }
    })) || [];

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / (screenWidth - 40));
    if (slideIndex !== currentSlide) {
      setCurrentSlide(slideIndex);
    }
  };

  const renderSliderItem = ({ item }: { item: SliderItem }) => (
    <View style={styles.slide}>
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
    <SafeAreaView style={styles.safeArea}>
      {/* Burger Menu */}
      <TouchableOpacity style={styles.menuBar} onPress={() => setSidebarVisible(true)}>
        <View style={styles.menuFrame}>
          <View style={styles.menuLine} />
          <View style={styles.menuLine} />
          <View style={styles.menuLine} />
        </View>
      </TouchableOpacity>

      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Logo + Mascot + Slider Container */}
        <View style={styles.logoSliderContainer}>
          {/* Logo + Mascot */}
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>Land of Soul</Text>
            <Image 
              source={mascotImages[currentSlide % mascotImages.length]} 
              style={styles.mascotImage}
              contentFit="contain"
            />
          </View>

          {/* Slider */}
          <View style={styles.sliderContainer}>
            <FlatList
              ref={flatListRef}
              data={sliderItems}
              renderItem={renderSliderItem}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={onScroll}
              scrollEventThrottle={16}
              snapToInterval={screenWidth - 40}
              decelerationRate="fast"
            />
          </View>

          {/* Dots */}
          {sliderItems.length > 0 && (
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
          )}
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
    top: 20,
    left: 20,
    zIndex: 100,
    padding: 8,
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
    marginBottom: 4,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  logoSliderContainer: {
    flexDirection: 'column',
    gap: 0,
    marginTop: 20,
  },
  logoContainer: {
    alignItems: 'center',
    gap: 10,
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
  },
  sliderContainer: {
    width: screenWidth,
    height: 539,
    paddingHorizontal: 20,
  },
  slide: {
    width: screenWidth - 40,
    height: 539,
  },
  slideImage: {
    width: '100%',
    height: '100%',
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 10,
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
    marginTop: 30,
    paddingHorizontal: 20,
  },
  tabsContent: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'flex-start',
  },
  tabComponent: {
    alignItems: 'center',
    gap: 10,
    justifyContent: 'flex-start',
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
