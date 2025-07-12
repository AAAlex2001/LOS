import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width: screenWidth } = Dimensions.get('window');

export default function TransportCommunicationsScreen({ visible, onClose }: { visible: boolean, onClose: () => void }) {
  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerBar}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <View style={styles.headerTitleWrap}>
            <Text style={styles.headerTitle}>ТРАНСПОРТНОЕ СООБЩЕНИЕ</Text>
          </View>
          <View style={{ width: 36 }} />
        </View>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* <Text style={styles.mainTitle}>Транспортное сообщение республики Абхазия</Text> */}

          {/* Аэропорт */}
          <View style={styles.transportBlock}>
            <Text style={styles.blockTitle}>СУХУМСКИЙ МЕЖДУНАРОДНЫЙ АЭРОПОРТ ИМЕНИ В.Г. АРДЗИНБА</Text>
            <View style={styles.imagesContainer}>
              <Image source={require('../../assets/images/airport1.jpg')} style={styles.image} resizeMode="cover" />
              <Image source={require('../../assets/images/airport2.png')} style={styles.image} resizeMode="cover" />
            </View>
          </View>

          {/* Вокзал */}
          <View style={styles.transportBlock}>
            <Text style={styles.blockTitle}>ЖЕЛЕЗНОДОРОЖНЫЙ ВОКЗАЛ СУХУМ</Text>
            <View style={styles.imagesContainer}>
              <Image source={require('../../assets/images/vokzal1.jpg')} style={styles.image} resizeMode="cover" />
              <Image source={require('../../assets/images/vokzal2.png')} style={styles.image} resizeMode="cover" />
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    height: 110,
    paddingTop: 50,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E4E6',
  },
  backButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  headerTitleWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: 18,
    color: '#000',
    textTransform: 'uppercase',
    letterSpacing: 0.2,
    marginTop: 30,
    marginLeft: 0,
  },
  scrollContent: {
    paddingBottom: 40,
    alignItems: 'center',
    paddingTop: 0,
  },
  mainTitle: {
    fontFamily: 'Inter',
    fontWeight: '800',
    fontSize: 28,
    lineHeight: 34,
    textAlign: 'center',
    color: '#1129BD',
    marginBottom: 40,
    marginTop: 10,
  },
  transportBlock: {
    width: screenWidth - 40,
    marginBottom: 60,
    alignSelf: 'center',
  },
  blockTitle: {
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 24,
    textAlign: 'center',
    textDecorationLine: 'underline',
    color: '#1129BD',
    textTransform: 'uppercase',
    marginBottom: 24,
    marginTop: 16,
  },
  imagesContainer: {
    flexDirection: screenWidth > 768 ? 'row' : 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  image: {
    width: screenWidth > 700 ? 320 : screenWidth - 60,
    height: 180,
    borderRadius: 15,
    marginBottom: screenWidth > 768 ? 0 : 20,
    marginHorizontal: 10,
  },
}); 