import React, { useRef, useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Dimensions, Animated, Pressable, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SideBarLogo from '../../assets/images/SideBarLogo.svg';
import ContactsScreen from './ContactsScreen';
import LanguageScreen from './LanguageScreen';
import { useTranslation } from '@/i18n';

const { width: screenWidth } = Dimensions.get('window');

export default function SidebarScreen({ visible, onClose, onNavigateHome }: { visible: boolean, onClose: () => void, onNavigateHome?: () => void }) {
  const { t } = useTranslation();
  const [contactsVisible, setContactsVisible] = useState(false);
  const [languageVisible, setLanguageVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-screenWidth)).current;

  const menuItems = [
    { label: t('navigation.main_menu'), icon: <Ionicons name="home-outline" size={24} color="#1129BD" /> },
    { label: t('footer.contact_us'), icon: <Ionicons name="chatbubble-ellipses-outline" size={24} color="#1129BD" /> },
    { label: t('footer.privacy_policy'), icon: <Ionicons name="document-outline" size={24} color="#1129BD" />},
    { label: t('language.select'), icon: <Ionicons name="language-outline" size={24} color="#1129BD" /> },
  ];

  useEffect(() => {
    if (visible) {
      slideAnim.setValue(-screenWidth);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -screenWidth,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  return (
    <Modal visible={visible} animationType="none" transparent={true}>
      <View style={styles.overlay}>
        <Pressable style={styles.bgClose} onPress={onClose} />
        <Animated.View style={[styles.sidebar, { transform: [{ translateX: slideAnim }] }]}> 
          {/* Логотип */}
          <SideBarLogo width={104} height={104} style={styles.logo} />
          {/* Заголовок */}
          <Text style={styles.title}>LAND OF SOUL ABKHAZIA</Text>
          {/* Линия */}
          <View style={styles.line} />
          {/* Кнопки */}
          <TouchableOpacity style={styles.boardBtn}>
            <Text style={styles.boardBtnText}>{t('common.bulletin_board')}</Text>
          </TouchableOpacity>
          {/* Меню */}
          <View style={styles.menuList}>
            {menuItems.map((item, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.menuItem}
                onPress={
                  idx === 0 && onNavigateHome
                    ? onNavigateHome
                    : idx === 1
                    ? () => setContactsVisible(true)
                    : idx === 2
                    ? () => Linking.openURL('https://landofsoul-apsny.ru/privacy-policy')
                    : idx === 3
                    ? () => setLanguageVisible(true)
                    : undefined
                }
              >
                <View style={styles.menuIcon}>{item.icon}</View>
                <Text style={styles.menuLabel}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <ContactsScreen visible={contactsVisible} onClose={() => setContactsVisible(false)} />
          <LanguageScreen visible={languageVisible} onClose={() => setLanguageVisible(false)} />
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.10)',
  },
  sidebar: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    paddingTop: 64,
    paddingHorizontal: 28,
    justifyContent: 'flex-start',
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    zIndex: 2,
  },
  bgClose: {
    flex: 1,
    zIndex: 1,
  },
  logo: {
    alignSelf: 'flex-start',
    marginBottom: 10,
    marginTop: 24,
  },
  title: {
    fontWeight: '700',
    fontSize: 20,
    textTransform: 'uppercase',
    color: '#0F0F0F',
    textAlign: 'left',
    alignSelf: 'flex-start',
    marginBottom: 20,
    marginTop: 8,
  },
  line: {
    height: 1,
    backgroundColor: '#E2E4E6',
    width: '100%',
    marginBottom: 24,
  },
  boardBtn: {
    width: 246,
    height: 40,
    alignSelf: 'flex-start',
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#D5DAEF',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  boardBtnText: {
    color: '#1129BD',
    fontWeight: '500',
    fontSize: 16,
  },
  menuList: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
  },
  menuIcon: {
    width: 32,
    alignItems: 'center',
    marginRight: 10,
  },
  menuLabel: {
    fontSize: 16,
    color: '#1129BD',
    fontWeight: '500',
  },
}); 