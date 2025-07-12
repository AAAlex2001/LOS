'use client';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Linking } from 'react-native';
import { Image } from 'expo-image';

interface FooterProps {
  onNavigate?: (route: string) => void;
}

const socialIcons = [
  { src: require('../../assets/images/telegram.svg'), alt: 'Telegram', w: 42, h: 42 },
  { src: require('../../assets/images/instagram.svg'), alt: 'Instagram', w: 42, h: 42 },
  { src: require('../../assets/images/twitter.svg'), alt: 'Twitter', w: 42, h: 42 },
  { src: require('../../assets/images/facebook.svg'), alt: 'Facebook', w: 42, h: 42 },
  { src: require('../../assets/images/youtube.svg'), alt: 'YouTube', w: 42, h: 42 },
  { src: require('../../assets/images/rutube.svg'), alt: 'Rutube', w: 42, h: 42 },
];

const quickLinks = [
  { label: 'Города', href: '/cities' },
  { label: 'Связь', href: '/mobile-communication' },
  { label: 'Такси', href: '/taxi' },
  { label: 'Ваш доктор', href: '/your-doctor' },
  { label: 'Важно знать', href: '/important' },
  { label: 'История и культура Абхазии', href: '/history-and-culture' },
  { label: 'Развлечения', href: '/parties' },
  { label: 'Банки', href: '/banks' },
];

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNavigation = (route: string) => {
    onNavigate?.(route);
  };

  const handleSocialPress = (platform: string) => {
    console.log(`Opening ${platform}`);
  };

  return (
    <View style={styles.footer}>
      {/* Top area */}
      <View style={styles.topRow}>
        {/* Branding */}
        <View style={styles.brand}>
          <Text style={styles.brandTitle}>Land of Soul Abkhazia</Text>
          <Text style={styles.brandSubtitle}>О сервисе</Text>
          <Text style={styles.brandDescription}>
            Ваш гид по Абхазии с проверенными рекомендациями и эксклюзивными маршрутами.
          </Text>
          <View style={styles.socials}>
            {socialIcons.map((icon, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.socialLink}
                onPress={() => handleSocialPress(icon.alt)}
              >
                <Image 
                  source={icon.src} 
                  style={[styles.socialIcon, { width: icon.w, height: icon.h }]} 
                  contentFit="contain"
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Quick links block */}
        <View style={styles.quickLinksBlock}>
          <Text style={styles.quickLinksTitle}>Быстрые ссылки</Text>
          <View style={styles.quickLinks}>
            {quickLinks.map((link, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.quickLinkItem}
                onPress={() => handleNavigation(link.href)}
              >
                <View style={styles.quickLinkArrow} />
                <Text style={styles.quickLinkText}>{link.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Download badges block */}
        <View style={styles.appBlock}>
          <Text style={styles.appBlockTitle}>Скачайте мобильное приложение</Text>
          <View style={styles.appBadges}>
            <TouchableOpacity onPress={() => Linking.openURL('https://apps.apple.com')}>
              <Image
                source={require('../../assets/images/appstore.svg')}
                style={styles.appBadge}
                contentFit="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL('https://play.google.com')}>
              <Image
                source={require('../../assets/images/googleplay.svg')}
                style={styles.appBadge}
                contentFit="contain"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Bottom line */}
      <View style={styles.bottomRow}>
        <View style={styles.legalLinks}>
          <TouchableOpacity onPress={() => handleNavigation('/accessibility-and-terms')}>
            <Text style={styles.legalLink}>
              Доступность и правила пользования сайтом
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleNavigation('/privacy-policy')}>
            <Text style={styles.legalLink}>
              Политика конфиденциальности сайта
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.rights}>© 2025 Land of soul Abkhazia. Все права защищены.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    width: '100%',
    maxWidth: 1920,
    marginHorizontal: 'auto',
    backgroundColor: '#1129bd',
    color: '#ffffff',
    fontFamily: "Inter",
    paddingHorizontal: 16,
    paddingVertical: 40,
    paddingBottom: 24,
    height: 'auto',
  },

  topRow: {
    flexDirection: 'column',
    gap: 40,
  },

  // --- Column Blocks ---
  brand: {
    width: '100%',
    flexDirection: 'column',
    gap: 30,
  },

  quickLinksBlock: {
    width: '100%',
    flexDirection: 'column',
    gap: 20,
  },

  appBlock: {
    width: '100%',
    flexDirection: 'column',
    gap: 20,
  },

  // Branding Section
  brandTitle: {
    fontWeight: '700',
    fontSize: 28,
    lineHeight: 34,
    margin: 0,
    color: '#ffffff',
  },

  brandSubtitle: {
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 24,
    margin: 0,
    color: '#ffffff',
  },

  brandDescription: {
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 22,
    margin: 0,
    color: '#ffffff',
  },

  socials: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
    flexWrap: 'wrap',
  },

  socialLink: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  socialIcon: {
    // Width and height will be set dynamically
  },

  // Quick Links Section
  quickLinksTitle: {
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 24,
    margin: 0,
    color: '#ffffff',
  },

  quickLinks: {
    gap: 35,
  },

  quickLinkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    position: 'relative',
  },

  quickLinkArrow: {
    width: 6,
    height: 6,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ffffff',
    transform: [{ rotate: '-45deg' }],
  },

  quickLinkText: {
    fontSize: 16,
    lineHeight: 22,
    color: '#fff',
    fontWeight: '400',
  },

  // App Download Section
  appBlockTitle: {
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 24,
    margin: 0,
    color: '#ffffff',
  },

  appBadges: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 12,
  },

  appBadge: {
    width: 180,
    height: 52,
  },

  // Divider
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginVertical: 32,
  },

  // Bottom Row
  bottomRow: {
    flexDirection: 'column',
    gap: 16,
    alignItems: 'flex-start',
  },

  legalLinks: {
    flexDirection: 'column', // Stack on mobile
    gap: 12,
    alignItems: 'flex-start',
  },

  legalLink: {
    fontWeight: '400',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.5)',
  },

  rights: {
    fontWeight: '400',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.5)',
  },
});

export default Footer; 