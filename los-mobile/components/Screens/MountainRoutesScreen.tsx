import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Dimensions, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width: screenWidth } = Dimensions.get('window');

type Props = { visible: boolean; onClose: () => void };

type RouteCard = {
  id: number;
  img?: any;
  phone?: string;
  site?: string;
  text?: string;
  title?: string;
  name?: string;
};

const routes: RouteCard[] = [
  { id: 1, img: require('../../assets/images/logoMountain.svg'), site: 'https://highlandabkhazia.ru' },
  { id: 2, img: require('../../assets/images/MountainCar.png'), site: 'https://www.instagram.com/dzhiping_abkhazia/' },
  { id: 3, img: require('../../assets/images/logoMountain2.png'), site: 'https://apsny.world/mountain-night' },
  { id: 4, img: require('../../assets/images/MountainApp.png'), text: 'Контакты: +7 (940) 932-51-51', site: 'https://apsny-travel.com/tours_catalog.php' },
  { id: 5, title: 'ИНДИВИДУАЛЬНЫЕ МАРШРУТЫ', name: 'Астамур Кация', phone: '+7–940–772–67–70', img: require('../../assets/images/activity_gornye_marshruty.jpg') },
];

export default function MountainRoutesScreen({ visible, onClose }: Props) {
  const topRow = routes.slice(0, 3);
  const bottomRow = routes.slice(3);

  const openLink = (url?: string) => {
    if (!url) return;
    const clean = url.startsWith('http') ? url : url.replace('САЙТ: ', '');
    Linking.openURL(clean).catch(() => {});
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View style={styles.container}>
        <View style={styles.headerBar}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <View style={styles.headerTitleWrap}>
            <Text style={styles.headerTitle}>ГОРНЫЕ МАРШРУТЫ</Text>
          </View>
          <View style={{ width: 36 }} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Text style={styles.pageTitle}>Горные маршруты</Text>

          <View style={styles.row}>
            {topRow.map((route) => (
              <View key={route.id} style={styles.card}>
                {route.img && (
                  <Image source={route.img} style={styles.cardImg} resizeMode="contain" />
                )}
                <View style={styles.cardBody}>
                  {route.title && <Text style={styles.cardTitle}>{route.title}</Text>}
                  {route.name && <Text style={styles.cardName}>{route.name}</Text>}
                  {route.phone && !route.img && <Text style={styles.cardPhone}>Тел.: {route.phone}</Text>}
                  {route.phone && route.img && <Text style={styles.phone}>Контакты: {route.phone}</Text>}
                  {route.site && (
                    <Text onPress={() => openLink(route.site)} style={styles.link}>САЙТ: {route.site}</Text>
                  )}
                  {route.text && <Text style={styles.text}>{route.text}</Text>}
                </View>
              </View>
            ))}
          </View>

          <View style={styles.row}>
            {bottomRow.map((route) => (
              <View key={route.id} style={styles.card}>
                {route.img && (
                  <Image source={route.img} style={styles.cardImg} resizeMode="contain" />
                )}
                <View style={styles.cardBody}>
                  {route.title && <Text style={styles.cardTitle}>{route.title}</Text>}
                  {route.name && <Text style={styles.cardName}>{route.name}</Text>}
                  {route.phone && !route.img && <Text style={styles.cardPhone}>Тел.: {route.phone}</Text>}
                  {route.phone && route.img && <Text style={styles.phone}>Контакты: {route.phone}</Text>}
                  {route.site && (
                    <Text onPress={() => openLink(route.site)} style={styles.link}>САЙТ: {route.site}</Text>
                  )}
                  {route.text && <Text style={styles.text}>{route.text}</Text>}
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

const CARD_WIDTH = screenWidth - 32;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  headerBar: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: '#fff', height: 96, paddingTop: 44, paddingHorizontal: 12,
    borderBottomWidth: 1, borderBottomColor: '#E2E4E6',
  },
  backButton: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center', marginTop: 24 },
  headerTitleWrap: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  headerTitle: { fontFamily: 'Inter', fontWeight: '700', fontSize: 16, color: '#000', textTransform: 'uppercase', letterSpacing: 0.2, marginTop: 24, textAlign: 'center' },
  scrollContent: { padding: 16, paddingBottom: 40 },
  pageTitle: { fontFamily: 'Inter', fontWeight: '800', fontSize: 22, color: '#1129BD', marginBottom: 12, textAlign: 'center' },
  row: { gap: 16, marginBottom: 16 },
  card: { width: CARD_WIDTH, borderRadius: 12, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E2E4E6', overflow: 'hidden' },
  cardImg: { width: '100%', height: 160, backgroundColor: '#F5F7FF' },
  cardBody: { padding: 12, gap: 6 },
  cardTitle: { fontFamily: 'Inter', fontWeight: '700', fontSize: 18, color: '#000' },
  cardName: { fontFamily: 'Inter', fontWeight: '600', fontSize: 16, color: '#000' },
  cardPhone: { fontFamily: 'Inter', fontWeight: '400', fontSize: 16, color: '#000' },
  phone: { fontFamily: 'Inter', fontWeight: '400', fontSize: 16, color: '#000' },
  link: { fontFamily: 'Inter', fontWeight: '600', fontSize: 16, color: '#1129BD', textDecorationLine: 'underline' },
  text: { fontFamily: 'Inter', fontWeight: '400', fontSize: 16, color: '#000' },
});


