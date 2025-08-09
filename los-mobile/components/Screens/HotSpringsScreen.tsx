import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width: screenWidth } = Dimensions.get('window');

type Props = { visible: boolean; onClose: () => void };

type SpringCard = { id: number; title: string; img: any; text?: string };

const springs: SpringCard[] = [
  { id: 1, title: 'Кындыг', img: require('../../assets/images/HotelsGagra1.jpg') },
  { id: 2, title: 'Цкуара', img: require('../../assets/images/HotelsGagra2.jpg') },
  { id: 3, title: 'Бабушара', img: require('../../assets/images/HotelsGudauta1.jpg') },
  { id: 4, title: 'Мархеул', img: require('../../assets/images/HotelsPitsunda1.jpg') },
  { id: 5, title: 'Гагра', img: require('../../assets/images/HotelsGagra3.jpg') },
  { id: 6, title: 'Беслетка', img: require('../../assets/images/HotelsGagra4.jpg') },
  { id: 7, title: 'Ткуарчал', img: require('../../assets/images/HotelsTkuarchal1.jpg') },
];

export default function HotSpringsScreen({ visible, onClose }: Props) {
  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View style={styles.container}>
        <View style={styles.headerBar}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <View style={styles.headerTitleWrap}>
            <Text style={styles.headerTitle}>ГОРЯЧИЕ ИСТОЧНИКИ</Text>
          </View>
          <View style={{ width: 36 }} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Text style={styles.pageTitle}>Горячие источники</Text>
          <View style={styles.banner}>
            <Text style={styles.bannerText}>
              Абхазия – уникальная по своей красоте страна. Здесь природные сероводородные,
              радоновые и грязевые источники. Много горячих ключей действуют круглый год.
              Ниже — самые популярные термы региона.
            </Text>
          </View>

          <View style={styles.cardsContainer}>
            {springs.map((s) => (
              <View key={s.id} style={styles.card}>
                <Text style={styles.cardTitle}>{s.title}</Text>
                <Image source={s.img} style={styles.cardImg} resizeMode="cover" />
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
  banner: { backgroundColor: '#EFF3FF', borderRadius: 12, padding: 12, marginBottom: 16 },
  bannerText: { fontFamily: 'Inter', fontWeight: '500', fontSize: 16, color: 'rgba(0,0,0,0.85)' },
  cardsContainer: { gap: 16 },
  card: { width: CARD_WIDTH, borderRadius: 12, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E2E4E6', overflow: 'hidden' },
  cardTitle: { fontFamily: 'Inter', fontWeight: '700', fontSize: 18, color: '#1129BD', paddingHorizontal: 12, paddingTop: 12, paddingBottom: 6 },
  cardImg: { width: '100%', height: 220, backgroundColor: '#F5F7FF' },
});


