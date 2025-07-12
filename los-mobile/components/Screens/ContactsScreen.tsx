import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Linking, Dimensions } from 'react-native';
import { Ionicons, FontAwesome, MaterialCommunityIcons, AntDesign, Feather } from '@expo/vector-icons';

const contacts = [
  {
    label: 'Telegram',
    icon: <Feather name="send" size={24} color="#1129BD" />,
    url: 'https://t.me/',
  },
  {
    label: 'Instagram',
    icon: <AntDesign name="instagram" size={24} color="#1129BD" />,
    url: 'https://instagram.com/',
  },
  {
    label: 'X (Twitter)',
    icon: <MaterialCommunityIcons name="alpha-x-circle-outline" size={24} color="#1129BD" />,
    url: 'https://twitter.com/',
  },
  {
    label: 'Facebook',
    icon: <FontAwesome name="facebook" size={24} color="#1129BD" />,
    url: 'https://facebook.com/',
  },
  {
    label: 'YouTube',
    icon: <FontAwesome name="youtube-play" size={24} color="#1129BD" />,
    url: 'https://youtube.com/',
  },
  {
    label: 'Rutube',
    icon: <MaterialCommunityIcons name="alpha-r-box" size={24} color="#1129BD" />,
    url: 'https://rutube.ru/',
  },
];

const { width: screenWidth } = Dimensions.get('window');

export default function ContactsScreen({ visible, onClose }: { visible: boolean, onClose: () => void }) {
  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View style={styles.container}>
        <Text style={styles.title}>НАШИ КОНТАКТЫ</Text>
        <TouchableOpacity onPress={onClose} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={28} color="#1129BD" />
        </TouchableOpacity>
        <View style={styles.line} />
        <View style={styles.list}>
          {contacts.map((item, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.item}
              onPress={() => Linking.openURL(item.url)}
              activeOpacity={0.7}
            >
              <View style={styles.icon}>{item.icon}</View>
              <Text style={styles.label}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    paddingTop: 80,
    paddingHorizontal: 0,
  },
  title: {
    fontWeight: '700',
    fontSize: 24,
    color: '#0F0F0F',
    textTransform: 'uppercase',
    marginLeft: 20,
    marginBottom: 8,
  },
  backBtn: {
    position: 'absolute',
    right: 20,
    top: 80,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    height: 1,
    backgroundColor: '#E2E4E6',
    width: screenWidth - 40,
    marginLeft: 20,
    marginBottom: 16,
  },
  list: {
    width: '100%',
    marginTop: 8,
    paddingHorizontal: 0,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    width: screenWidth - 40,
    height: 56,
    marginLeft: 20,
    marginBottom: 2,
    borderRadius: 16,
    // backgroundColor: '#F8F8F8',
  },
  icon: {
    width: 40,
    alignItems: 'center',
    marginRight: 16,
  },
  label: {
    fontSize: 16,
    color: '#1129BD',
    fontWeight: '500',
  },
}); 