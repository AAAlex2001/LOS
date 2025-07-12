import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import GovernmentStructureScreen from './GovernmentStructureScreen';
import HistoryAndCultureScreen from './HistoryAndCultureScreen';
import TransportCommunicationsScreen from './TransportCommunicationsScreen';
import AbkhazianCuizineScreen from './AbkhazianCuizineScreen';
import AbkhazianCustomsScreen from './AbkhazianCustomsScreen';
import ElementaryDictionaryScreen from './ElementaryDictionaryScreen';

const buttons = [
  { title: 'Государственное\nустройство', icon: <MaterialCommunityIcons name="flag-variant" size={40} color="#fff" /> },
  { title: 'Транспортное\nсообщение', icon: <MaterialCommunityIcons name="train" size={40} color="#fff" /> },
  { title: 'История и культура', icon: <MaterialCommunityIcons name="human-male-female" size={40} color="#fff" /> },
  { title: 'Абхазская кухня', icon: <MaterialCommunityIcons name="silverware-fork-knife" size={40} color="#fff" /> },
  { title: 'Абхазские обычаи', icon: <MaterialCommunityIcons name="handshake" size={40} color="#fff" /> },
  { title: 'Элементарный\nсловарь', icon: <MaterialCommunityIcons name="book-open-variant" size={40} color="#fff" /> },
];

export default function AboutAbkhaziaModal({ visible, onClose }: { visible: boolean, onClose: () => void }) {
  const [govVisible, setGovVisible] = useState(false);
  const [historyVisible, setHistoryVisible] = useState(false);
  const [transportVisible, setTransportVisible] = useState(false);
  const [cuisineVisible, setCuisineVisible] = useState(false);
  const [customsVisible, setCustomsVisible] = useState(false);
  const [dictionaryVisible, setDictionaryVisible] = useState(false);
  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View style={styles.fullscreen}>
        <View style={styles.headerBar}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#000" />
            <Text style={styles.header}>ОБ АБХАЗИИ</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.grid}>
          {buttons.map((btn, idx) => (
            <TouchableOpacity
              key={idx}
              onPress={
                idx === 0 ? () => setGovVisible(true)
                : idx === 1 ? () => setTransportVisible(true)
                : idx === 2 ? () => setHistoryVisible(true)
                : idx === 3 ? () => setCuisineVisible(true)
                : idx === 4 ? () => setCustomsVisible(true)
                : idx === 5 ? () => setDictionaryVisible(true)
                : undefined
              }
              activeOpacity={0.7}
              style={styles.item}
            >
              <View style={styles.iconCircle}>{btn.icon}</View>
              <Text style={styles.label}>{btn.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <GovernmentStructureScreen visible={govVisible} onClose={() => setGovVisible(false)} />
        <TransportCommunicationsScreen visible={transportVisible} onClose={() => setTransportVisible(false)} />
        <HistoryAndCultureScreen visible={historyVisible} onClose={() => setHistoryVisible(false)} />
        <AbkhazianCuizineScreen visible={cuisineVisible} onClose={() => setCuisineVisible(false)} />
        <AbkhazianCustomsScreen visible={customsVisible} onClose={() => setCustomsVisible(false)} />
        <ElementaryDictionaryScreen visible={dictionaryVisible} onClose={() => setDictionaryVisible(false)} />
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
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