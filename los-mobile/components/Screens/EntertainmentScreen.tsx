import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';

const buttons = [
  { title: 'Вечеринки и яркие впечатления', icon: <MaterialCommunityIcons name="party-popper" size={40} color="#fff" /> },
  { title: 'Горные маршруты', icon: <MaterialCommunityIcons name="terrain" size={40} color="#fff" /> },
  { title: 'Экскурсии', icon: <MaterialIcons name="tour" size={40} color="#fff" /> },
  { title: 'Горячие источники', icon: <MaterialCommunityIcons name="hot-tub" size={36} color="#fff" /> },
  { title: 'Спортивные залы', icon: <FontAwesome5 name="dumbbell" size={40} color="#fff" /> },
];

export default function EntertainmentScreen({ visible, onClose }: { visible: boolean, onClose: () => void }) {
  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View style={styles.fullscreen}>
        <View style={styles.headerBar}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#000" />
            <Text style={styles.header}>РАЗВЛЕЧЕНИЯ</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.grid}>
          {/* Первый ряд — 3 элемента */}
          <View style={[styles.row]}>
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
          <View style={[styles.row]}>
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
    // убираю justifyContent: 'center', чтобы ряды не центрировались
    flexDirection: 'column',
    paddingLeft: 20,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 0,
    // не задаём justifyContent, чтобы элементы шли слева
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