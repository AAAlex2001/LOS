import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5, MaterialIcons, Entypo, FontAwesome } from '@expo/vector-icons';

const buttons = [
  { title: 'Города Абхазии', icon: <MaterialCommunityIcons name="city-variant-outline" size={40} color="#fff" /> },
  { title: 'Аренда жилья', icon: <MaterialCommunityIcons name="home-outline" size={40} color="#fff" /> },
  { title: 'Мобильная связь\nи интернет', icon: <MaterialIcons name="wifi" size={40} color="#fff" /> },
  { title: 'Службы такси', icon: <FontAwesome5 name="taxi" size={40} color="#fff" /> },
  { title: 'Банки', icon: <FontAwesome5 name="piggy-bank" size={40} color="#fff" /> },
];

export default function PlanTripScreen({ visible, onClose }: { visible: boolean, onClose: () => void }) {
  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View style={styles.fullscreen}>
        <View style={styles.headerBar}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#000" />
            <Text style={styles.header}>ЗАПЛАНИРУЙТЕ ПОЕЗДКУ</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.grid}>
          {/* Первый ряд — 3 элемента */}
          <View style={styles.row}>
            {buttons.slice(0, 3).map((btn, idx) => (
              <View key={idx} style={styles.item}>
                <View style={styles.iconCircle}>
                  {btn.icon}
                </View>
                <Text style={styles.label}>{btn.title}</Text>
              </View>
            ))}
          </View>
          {/* Второй ряд — 2 элемента, прижаты к левому краю */}
          <View style={styles.row}>
            {buttons.slice(3, 5).map((btn, idx) => (
              <View key={idx} style={styles.item}>
                <View style={styles.iconCircle}>
                  {btn.icon}
                </View>
                <Text style={styles.label}>{btn.title}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 70,
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 10,
  },
  grid: {
    marginTop: 32,
    flexDirection: 'column',
    paddingLeft: 20,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 0,
  },
  item: {
    width: 110,
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 30,
  },
  iconCircle: {
    width: 73,
    height: 73,
    borderRadius: 100,
    backgroundColor: '#1129BD',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  label: {
    fontWeight: '700',
    fontSize: 10,
    lineHeight: 12,
    textAlign: 'center',
    color: '#000',
    width: 110,
  },
}); 