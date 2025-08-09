import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Dimensions, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width: screenWidth } = Dimensions.get('window');

type Props = { visible: boolean; onClose: () => void };

type ExcursionCard = {
  id: number;
  img?: any;
  contacts: string;
  site: string;
};

const excursionServices: ExcursionCard[] = [
  { id: 1, img: require('../../assets/images/Excursions1.svg'), contacts: 'Контакты: +7 (940) 910-70-70', site: 'https://welcome-abkhazia.com/' },
  { id: 2, img: require('../../assets/images/Excursions2.svg'), contacts: 'Контакты: +7 (940) 771-62-84', site: 'https://new.sukhum-travel.ru/' },
  { id: 3, img: require('../../assets/images/Excursions3.svg'), contacts: 'Контакты: +7 (940) 932-51-51', site: 'https://apsny-travel.com/tours_catalog.php' },
  { id: 4, img: require('../../assets/images/Excursions4.svg'), contacts: 'Контакты: +7 (940) 770-22-20', site: 'https://kruizgagra.ru/ekskursii' },
  { id: 5, img: require('../../assets/images/Excursions5.svg'), contacts: 'Контакты: +7 (940) 996-72-76,\nWhatsapp +7 (940) 996-72-76', site: 'https://continent-gagra.ru/excursionsabkhazia' },
];

export default function ExcursionsScreen({ visible, onClose }: Props) {
  const topRow = excursionServices.slice(0, 3);
  const bottomRow = excursionServices.slice(3);

  const openLink = (url: string) => Linking.openURL(url).catch(() => {});

  const renderCard = (item: ExcursionCard) => (
    <View key={item.id} style={styles.card}>
      {item.img && <Image source={item.img} style={styles.cardImg} resizeMode="contain" />}
      <View style={styles.cardBody}>
        <Text style={styles.cardContacts}>{item.contacts}</Text>
        <Text style={styles.link} onPress={() => openLink(item.site)}>САЙТ: {item.site}</Text>
      </View>
    </View>
  );

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View style={styles.container}>
        <View style={styles.headerBar}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <View style={styles.headerTitleWrap}>
            <Text style={styles.headerTitle}>ЭКСКУРСИИ</Text>
          </View>
          <View style={{ width: 36 }} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Text style={styles.pageTitle}>Экскурсии</Text>

          <View style={styles.row}>{topRow.map(renderCard)}</View>
          <View style={styles.row}>{bottomRow.map(renderCard)}</View>
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
  cardImg: { width: '100%', height: 140, backgroundColor: '#F5F7FF' },
  cardBody: { padding: 12, gap: 6 },
  cardContacts: { fontFamily: 'Inter', fontWeight: '400', fontSize: 16, color: '#000' },
  link: { fontFamily: 'Inter', fontWeight: '600', fontSize: 16, color: '#1129BD', textDecorationLine: 'underline' },
});


