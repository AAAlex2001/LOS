import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Modal,
  StyleSheet,
} from 'react-native';
import { Image } from 'expo-image';
import { Video, ResizeMode } from 'expo-av';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const { width: screenWidth } = Dimensions.get('window');

const cities = [
  { img: require('../../assets/images/partial-react-logo.png'), title: 'Гагра', desc: 'Жемчужина Абхазии с пальмовой набережной, замками и крепостями' },
  { img: require('../../assets/images/partial-react-logo.png'), title: 'Сухум', desc: 'Солнечная столица с Ботаническим садом и колониальными особняками' },
  { img: require('../../assets/images/partial-react-logo.png'), title: 'Гудаута', desc: 'Уютный городок с мандариновыми садами и чистейшими пляжами' },
  { img: require('../../assets/images/partial-react-logo.png'), title: 'Новый Афон', desc: 'Духовный центр с древними пещерами и Несторовой горой' },
  { img: require('../../assets/images/partial-react-logo.png'), title: 'Пицунда', desc: 'Царство реликтовых сосен и золотистых галечных пляжей' },
  { img: require('../../assets/images/partial-react-logo.png'), title: 'Очамчыра', desc: 'Тихий приморский город с атмосферой старинного порта' },
  { img: require('../../assets/images/partial-react-logo.png'), title: 'Гал', desc: 'Край чайных плантаций, зелёных холмов и гостеприимных жителей' },
  { img: require('../../assets/images/partial-react-logo.png'), title: 'Гулрыпш', desc: 'Горное селение с водопадами и панорамными видами' },
  { img: require('../../assets/images/partial-react-logo.png'), title: 'Ткуарчал', desc: 'Город шахтёров в окружении живописных горных хребтов' },
];

const sliderItems = [
  { type: 'image', src: require('../../assets/images/partial-react-logo.png') },
  { type: 'image', src: require('../../assets/images/partial-react-logo.png') },
  { type: 'image', src: require('../../assets/images/partial-react-logo.png') },
  { type: 'image', src: require('../../assets/images/partial-react-logo.png') },
  { type: 'image', src: require('../../assets/images/partial-react-logo.png') },
  { type: 'image', src: require('../../assets/images/partial-react-logo.png') },
  { type: 'image', src: require('../../assets/images/partial-react-logo.png') },
  { type: 'image', src: require('../../assets/images/partial-react-logo.png') },
  { type: 'image', src: require('../../assets/images/partial-react-logo.png') },
  { type: 'image', src: require('../../assets/images/partial-react-logo.png') },
  { type: 'image', src: require('../../assets/images/partial-react-logo.png') },
  { type: 'image', src: require('../../assets/images/partial-react-logo.png') },
];

const activities = [
  { img: require('../../assets/images/partial-react-logo.png'), title: 'вечеринки', href: '/parties' },
  { img: require('../../assets/images/partial-react-logo.png'), title: 'горные маршруты', href: '/mountain-routes' },
  { img: require('../../assets/images/partial-react-logo.png'), title: 'экскурсии', href: '/excursions' },
  { img: require('../../assets/images/partial-react-logo.png'), title: 'горячие источники', href: '/hot-springs' },
];

const actionButtons = [
  { label: 'Ваш доктор', href: '/your-doctor' },
  { label: 'Связь и интернет', href: '/mobile-communication' },
  { label: 'Службы такси', href: '/taxi' },
  { label: 'Банки', href: '/banks' },
  { label: 'Важно знать', href: '/important' },
];

const popupData = {
  about: [
    { label: 'Государственное устройство', href: '/government-structure' },
    { label: 'Транспортное сообщение', href: '/transport-communications' },
    { label: 'История и культура', href: '/history-and-culture' },
    { label: 'Абхазская кухня', href: '/abkhazian-cuizine' },
    { label: 'Абхазские обычаи', href: '/abkhazian-customs' },
    { label: 'Элементарный словарь', href: '/elementary-dictionary' }
  ],
  activities: [
    { label: 'Вечеринки и яркие впечатления', href: '/parties' },
    { label: 'Горные маршруты', href: '/mountain-routes' },
    { label: 'Экскурсии', href: '/excursions' },
    { label: 'Горячие источники', href: '/hot-springs' }
  ],
  booking: [
    { label: 'Города Абхазии', href: '/cities' },
    { label: 'Связь', href: '/mobile-communication' },
    { label: 'Такси', href: '/taxi' },
    { label: 'Банки', href: '/banks' }
  ],
  essentials: [
    { label: 'Ваш доктор', href: '/your-doctor' },
    { label: 'Важно знать', href: '/important' }
  ],
};

const HomePage = () => {
  const [activePopup, setActivePopup] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleScroll = (event: any) => {
    const slideSize = screenWidth;
    const currentIndex = Math.round(event.nativeEvent.contentOffset.x / slideSize);
    setCurrentSlide(currentIndex);
  };

  const renderSliderItem = ({ item, index }: { item: any; index: number }) => (
    <View style={[styles.slide, { width: screenWidth }]}>
      {item.type === 'video' ? (
        <Video
          source={item.src}
          style={styles.sliderMedia}
          shouldPlay={index === currentSlide}
          isLooping
          isMuted
          resizeMode={ResizeMode.COVER}
        />
      ) : (
        <Image source={item.src} style={styles.sliderMedia} contentFit="cover" />
      )}
    </View>
  );

  const renderCityCard = ({ item }: { item: any }) => (
    <View style={styles.cityCard}>
      <Image source={item.img} style={styles.cityImage} contentFit="cover" />
      <View style={styles.cityInfo}>
        <Text style={styles.cityTitle}>{item.title}</Text>
        <Text style={styles.cityDesc}>{item.desc}</Text>
      </View>
    </View>
  );

  const renderActivityCard = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.activityCard}>
      <Image source={item.img} style={styles.activityImage} contentFit="cover" />
      <View style={styles.activityInfo}>
        <Text style={styles.activityTitle}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderPopup = () => {
    if (!activePopup) return null;
    
    const items = popupData[activePopup as keyof typeof popupData];
    
    return (
      <Modal
        visible={!!activePopup}
        transparent
        animationType="fade"
        onRequestClose={() => setActivePopup(null)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setActivePopup(null)}
        >
          <View style={styles.popupContainer}>
            {items.map((item, index) => (
              <TouchableOpacity key={index} style={styles.popupItem}>
                <Text style={styles.popupItemText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          {/* Tabs */}
          <View style={styles.tabsContainer}>
            <TouchableOpacity 
              style={styles.tabItem}
              onPress={() => setActivePopup(activePopup === 'about' ? null : 'about')}
            >
              <Text style={styles.tabText}>Об Абхазии</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.tabItem}
              onPress={() => setActivePopup(activePopup === 'activities' ? null : 'activities')}
            >
              <Text style={styles.tabText}>Чем заняться</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.tabItem}
              onPress={() => setActivePopup(activePopup === 'booking' ? null : 'booking')}
            >
              <Text style={styles.tabText}>Запланируйте поездку</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.tabItem}
              onPress={() => setActivePopup(activePopup === 'essentials' ? null : 'essentials')}
            >
              <Text style={styles.tabText}>Необходимо в поездке</Text>
            </TouchableOpacity>
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
              onScroll={handleScroll}
              scrollEventThrottle={16}
            />
          </View>

          {/* Intro Text */}
          <View style={styles.introSection}>
            <Image 
              source={require('../../assets/images/partial-react-logo.png')} 
              style={styles.introBackground}
              contentFit="cover"
            />
            <View style={styles.introOverlay}>
              <Text style={styles.introText}>
                Пейзажи, которые захватывают дух, богатая история и вкусная еда, Абхазия не просто удивит — она покорит вас!
                {'\n\n'}
                Готовы к путешествию, которое останется в сердце навсегда?
              </Text>
            </View>
          </View>
        </View>

        {/* Cities Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Незабываемые виды Абхазии</Text>
          <FlatList
            data={cities}
            renderItem={renderCityCard}
            numColumns={2}
            columnWrapperStyle={styles.citiesRow}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={styles.cityCardSeparator} />}
          />
        </View>

        {/* CTA Section */}
        <View style={styles.ctaSection}>
          <Text style={styles.sectionTitle}>Отдых в Абхазии — с комфортом!</Text>
          
          <View style={styles.promoBanner}>
            <Image 
              source={require('../../assets/images/partial-react-logo.png')} 
              style={styles.promoMandarin}
              contentFit="contain"
            />
            <View style={styles.promoBackground}>
              <Image 
                source={require('../../assets/images/partial-react-logo.png')} 
                style={styles.promoBackgroundImage}
                contentFit="cover"
              />
              <View style={styles.promoOverlay}>
                <Text style={styles.promoText}>
                  Вы уже вдохновились горными пейзажами, лазурным морем и гостеприимством Абхазии?
                </Text>
                <Text style={styles.promoText}>
                  Пора забронировать уютное жильё через <Text style={styles.highlight}>«Мандарин»</Text> — проверенный сервис аренды с лучшими вариантами!
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.bookingCard}>
            <Image 
              source={require('../../assets/images/partial-react-logo.png')} 
              style={styles.bookingImage}
              contentFit="cover"
            />
            <View style={styles.bookingInfo}>
              <Text style={styles.bookingTitle}>Частный сектор</Text>
              <Text style={styles.bookingDesc}>Гостевые дома в горах или аутентичные домики с национальным колоритом</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.bookingButton}>
            <Text style={styles.bookingButtonText}>Подобрать жильё</Text>
            <Text style={styles.bookingButtonArrow}>↗</Text>
          </TouchableOpacity>
          
          <Text style={styles.bookingFinePrint}>Без комиссий · Поддержка 24/7 · Гарантия заселения</Text>
        </View>

        {/* Activities Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Развлечения в Абхазии: создайте свой идеальный отдых!</Text>
          
          <View style={styles.activitiesBanner}>
            <Image 
              source={require('../../assets/images/partial-react-logo.png')} 
              style={styles.activitiesBackground}
              contentFit="cover"
            />
            <View style={styles.activitiesOverlay}>
              <Text style={styles.activitiesText}>
                Не просто отдых — эмоции, которые запомнятся навсегда.
              </Text>
              <Text style={styles.activitiesText}>
                От горных троп до шумных вечеринок — каждый день будет особенным!
              </Text>
            </View>
          </View>

          <FlatList
            data={activities}
            renderItem={renderActivityCard}
            numColumns={2}
            columnWrapperStyle={styles.activitiesRow}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={styles.activityCardSeparator} />}
          />
        </View>

        {/* Actions Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Здесь собрано всё, что избавит вас от лишних переживаний в поездке</Text>
          <View style={styles.actionsGrid}>
            {actionButtons.map((button, index) => (
              <TouchableOpacity key={index} style={styles.actionButton}>
                <Text style={styles.actionButtonText}>{button.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
      
      <Footer />
      {renderPopup()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollView: {
    flex: 1,
  },
  heroSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  tabsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  tabItem: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginBottom: 8,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
    textAlign: 'center',
  },
  sliderContainer: {
    height: 250,
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 20,
  },
  slide: {
    height: 250,
  },
  sliderMedia: {
    width: '100%',
    height: '100%',
  },
  introSection: {
    height: 200,
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 40,
    position: 'relative',
  },
  introBackground: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  introOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  introText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 24,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1129bd',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 28,
  },
  citiesRow: {
    justifyContent: 'space-between',
  },
  cityCard: {
    width: '48%',
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#d5daef',
    backgroundColor: '#ffffff',
    marginBottom: 15,
  },
  cityCardSeparator: {
    height: 15,
  },
  cityImage: {
    width: '100%',
    height: 120,
  },
  cityInfo: {
    padding: 10,
    backgroundColor: 'rgba(17, 41, 189, 0.1)',
  },
  cityTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1129bd',
    textTransform: 'uppercase',
    marginBottom: 5,
    textAlign: 'center',
  },
  cityDesc: {
    fontSize: 14,
    color: '#1129bd',
    textAlign: 'center',
    lineHeight: 16,
  },
  ctaSection: {
    paddingHorizontal: 20,
    marginBottom: 40,
    alignItems: 'center',
  },
  promoBanner: {
    position: 'relative',
    width: '100%',
    marginBottom: 20,
  },
  promoMandarin: {
    position: 'absolute',
    top: -40,
    left: '50%',
    transform: [{ translateX: -80 }],
    width: 160,
    height: 160,
    zIndex: 2,
  },
  promoBackground: {
    height: 180,
    borderRadius: 15,
    overflow: 'hidden',
    position: 'relative',
    marginTop: 80,
  },
  promoBackgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  promoOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
  },
  promoText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 20,
  },
  highlight: {
    color: '#ff6b00',
    textDecorationLine: 'underline',
  },
  bookingCard: {
    width: '100%',
    maxWidth: 350,
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#d5daef',
    backgroundColor: '#ffffff',
    marginBottom: 20,
  },
  bookingImage: {
    width: '100%',
    height: 180,
  },
  bookingInfo: {
    padding: 15,
    backgroundColor: 'rgba(17, 41, 189, 0.1)',
  },
  bookingTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1129bd',
    textTransform: 'uppercase',
    marginBottom: 8,
    textAlign: 'center',
  },
  bookingDesc: {
    fontSize: 16,
    color: '#1129bd',
    textAlign: 'center',
    lineHeight: 18,
  },
  bookingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 350,
    height: 48,
    backgroundColor: '#ff6b00',
    borderRadius: 25,
    marginBottom: 10,
  },
  bookingButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#ffffff',
    marginRight: 10,
  },
  bookingButtonArrow: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  bookingFinePrint: {
    fontSize: 16,
    color: '#000000',
    textAlign: 'center',
  },
  activitiesBanner: {
    height: 150,
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 30,
    position: 'relative',
  },
  activitiesBackground: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  activitiesOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  activitiesText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 10,
    lineHeight: 20,
  },
  activitiesRow: {
    justifyContent: 'space-between',
  },
  activityCard: {
    width: '48%',
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#d5daef',
    backgroundColor: '#ffffff',
    marginBottom: 15,
  },
  activityCardSeparator: {
    height: 15,
  },
  activityImage: {
    width: '100%',
    height: 120,
  },
  activityInfo: {
    padding: 15,
    backgroundColor: 'rgba(17, 41, 189, 0.1)',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1129bd',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 15,
  },
  actionButton: {
    minWidth: 140,
    height: 45,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#d5daef',
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  actionButtonText: {
    fontSize: 16,
    color: '#1129bd',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    margin: 20,
    maxWidth: 300,
    width: '80%',
  },
  popupItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  popupItemText: {
    fontSize: 16,
    color: '#1129bd',
    textAlign: 'center',
  },
});

export default HomePage; 