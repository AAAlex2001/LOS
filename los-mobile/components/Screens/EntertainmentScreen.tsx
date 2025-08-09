import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import PartiesScreen from './PartiesScreen';
import MountainRoutesScreen from './MountainRoutesScreen';
import ExcursionsScreen from './ExcursionsScreen';
import HotSpringsScreen from './HotSpringsScreen';

const buttons = [
  { title: 'Вечеринки и яркие впечатления', icon: <MaterialCommunityIcons name="party-popper" size={40} color="#fff" /> },
  { title: 'Горные маршруты', icon: <MaterialCommunityIcons name="terrain" size={40} color="#fff" /> },
  { title: 'Экскурсии', icon: <MaterialCommunityIcons name="car-outline" size={40} color="#fff" /> },
  { title: 'Горячие источники', icon: <MaterialCommunityIcons name="hot-tub" size={40} color="#fff" /> },
  { title: 'Спортивные залы', icon: <FontAwesome5 name="dumbbell" size={40} color="#fff" /> },
];

export default function EntertainmentScreen({ visible, onClose }: { visible: boolean, onClose: () => void }) {
  const [partiesVisible, setPartiesVisible] = React.useState(false);
  const [mountainVisible, setMountainVisible] = React.useState(false);
  const [excursionsVisible, setExcursionsVisible] = React.useState(false);
  const [hotSpringsVisible, setHotSpringsVisible] = React.useState(false);
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
              <TouchableOpacity
                key={idx}
                style={styles.item}
                activeOpacity={0.8}
                onPress={() => {
                  if (btn.title === 'Вечеринки и яркие впечатления') {
                    setPartiesVisible(true);
                  } else if (btn.title === 'Горные маршруты') {
                    setMountainVisible(true);
                  } else if (btn.title === 'Экскурсии') {
                    setExcursionsVisible(true);
                  } else if (btn.title === 'Горячие источники') {
                    setHotSpringsVisible(true);
                  }
                }}
              >
                <View style={styles.iconCircle}>
                  {btn.icon}
                </View>
                <Text style={styles.label}>{btn.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {/* Второй ряд — 2 элемента, прижаты к левому краю */}
          <View style={[styles.row]}>
            {buttons.slice(3, 5).map((btn, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.item}
                activeOpacity={0.8}
                onPress={() => {
                  if (btn.title === 'Горячие источники') {
                    setHotSpringsVisible(true);
                  }
                  // 'Спортивные залы' — позже добавим модалку
                }}
              >
                <View style={styles.iconCircle}>
                  {btn.icon}
                </View>
                <Text style={styles.label}>{btn.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <PartiesScreen visible={partiesVisible} onClose={() => setPartiesVisible(false)} />
        <MountainRoutesScreen visible={mountainVisible} onClose={() => setMountainVisible(false)} />
        <ExcursionsScreen visible={excursionsVisible} onClose={() => setExcursionsVisible(false)} />
        <HotSpringsScreen visible={hotSpringsVisible} onClose={() => setHotSpringsVisible(false)} />
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