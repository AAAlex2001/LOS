import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

const buttons = [
  { title: 'Ваш доктор', icon: <FontAwesome5 name="clinic-medical" size={40} color="#fff" /> },
  { title: 'Важно знать', icon: <MaterialCommunityIcons name="alert-circle-outline" size={40} color="#fff" /> },
];

export default function ImportantTripScreen({ visible, onClose }: { visible: boolean, onClose: () => void }) {
  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View style={styles.fullscreen}>
        <View style={styles.headerBar}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#000" />
            <Text style={styles.header}>НЕОБХОДИМО В ПОЕЗДКЕ</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.grid}>
          <View style={styles.row}>
            {buttons.map((btn, idx) => (
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