import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Image } from 'expo-image';

const { width: screenWidth } = Dimensions.get('window');

const sliderItems = [
  { src: require('../../assets/images/abhazy1.jpg') },
  { src: require('../../assets/images/abhazy2.jpg') },
  { src: require('../../assets/images/abhazskayaKuhnya.jpg') },
  { src: require('../../assets/images/WineriesGagra1.jpg') },
];

const tabs = [
    { title: 'Об Абхазии' },
    { title: 'Развлечения' },
    { title: 'Запланируйте\nпоездку', multiline: true },
    { title: 'Необходимо\nв поездке', multiline: true },
    { title: 'Города' },
];

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const onScroll = (event: any) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / 433);
    if (slideIndex !== currentSlide) {
      setCurrentSlide(slideIndex);
    }
  };

  const renderSliderItem = ({ item }: { item: any }) => (
    <View style={styles.slide}>
      <Image source={item.src} style={styles.slideImage} contentFit="cover" />
    </View>
  );

  return (
    <View style={styles.homePage}>
      {/* Menu bar + Logo + Mascot */}
      <View style={styles.headerContainer}>
        <View style={styles.headerEllipse} />
        
        <TouchableOpacity style={styles.menuBar}>
          <View style={styles.menuFrame}>
            <View style={styles.menuLine} />
            <View style={styles.menuLine} />
            <View style={styles.menuLine} />
          </View>
        </TouchableOpacity>

        <View style={styles.logoMascotContainer}>
          <Text style={styles.logoText}>Land of Soul</Text>
          <Image 
            source={require('../../assets/images/Guy11.png')} 
            style={styles.mascotImage}
            contentFit="contain"
          />
        </View>
          </View>

          {/* Slider */}
      <View style={styles.slider}>
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

      {/* АБХАЗИЯ Title */}
      <View style={styles.titleFrame}>
        <Text style={styles.abkhaziaTitle}>АБХАЗИЯ</Text>
        </View>

      {/* Dots */}
      <View style={styles.dots}>
        <View style={[styles.dot, currentSlide % sliderItems.length === 0 ? styles.activeDot : {}]} />
        <View style={[styles.dot, currentSlide % sliderItems.length === 1 ? styles.activeDot : {}]} />
        <View style={[styles.dot, currentSlide % sliderItems.length === 2 ? styles.activeDot : {}]} />
        <View style={[styles.dot, currentSlide % sliderItems.length === 3 ? styles.activeDot : {}]} />
        </View>

      {/* White Ellipse behind tabs */}
      <View style={styles.ellipse1} />

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsContent}
        >
          {tabs.map((tab, index) => (
            <TouchableOpacity key={index} style={styles.tabComponent}>
              <View style={styles.tabIcon}>
                 <View style={styles.iconPlaceholder} />
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

      {/* Home Indicator */}
      <View style={styles.homeIndicatorContainer}>
        <View style={styles.homeIndicator} />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  homePage: {
    position: 'relative',
    width: 390,
    height: 844,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    alignSelf: 'center',
    marginTop: 40,
  },

  // Header
  headerContainer: {
    position: 'absolute',
    width: 480,
    height: 91,
    left: (390 - 480) / 2,
    top: 60,
    zIndex: 10,
  },
  headerEllipse: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 91 * 0.2527, // 25.27%
    bottom: 0,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 480/2,
    borderTopRightRadius: 480/2
  },
  menuBar: {
    position: 'absolute',
    left: '13.33%',
    top: '14.29%',
    paddingVertical: 10,
  },
  menuFrame: {
    width: 24,
    height: 12,
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
    left: '34.79%',
    right: '35%',
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
    lineHeight: 24, // Adjusted for better alignment
    color: 'rgba(0, 0, 0, 0.85)',
  },
  mascotImage: {
    position: 'absolute',
    height: 78,
    width: 78,
    top: 13,
  },

  // Slider
  slider: {
    position: 'absolute',
    width: 433,
    height: 539,
    left: (390 - 433) / 2,
    top: 133,
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

  // Title
  titleFrame: {
    position: 'absolute',
    width: 159,
    height: 48,
    left: (390 - 159) / 2,
    top: 581,
    justifyContent: 'center',
    alignItems: 'center',
  },
  abkhaziaTitle: {
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: 28,
    lineHeight: 28,
    textAlign: 'center',
    textTransform: 'uppercase',
    color: '#1129BD',
  },

  // Dots
  dots: {
    position: 'absolute',
    width: 50, // Increased width to accommodate gaps
    height: 6,
    left: (390 - 50) / 2,
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
  ellipse1: {
    position: 'absolute',
    width: 480,
    height: 68,
    left: (390 - 480) / 2,
    top: 654,
    backgroundColor: '#FFFFFF',
    borderRadius: 34,
  },

  // Tabs
  tabsContainer: {
    position: 'absolute',
    width: '100%',
    height: 113,
    top: 687,
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
    backgroundColor: '#1129BD',
    borderRadius: 36.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconPlaceholder: {
    width: 48,
    height: 48,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    opacity: 0.3, // Placeholder style
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

  // Home Indicator
  homeIndicatorContainer: {
    position: 'absolute',
    width: '100%',
    height: 34,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  homeIndicator: {
    width: 144,
    height: 5,
    backgroundColor: '#000000',
    borderRadius: 100,
  },
});

export default HomePage; 