'use client';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';

interface HeaderProps {
  onNavigate?: (route: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const handleNavigation = (route: string) => {
    closeMenu();
    onNavigate?.(route);
  };

  return (
    <>
      {/* Overlay */}
      <Modal
        visible={menuOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={closeMenu}
      >
        <TouchableOpacity 
          style={[styles.mobileMenuOverlay, menuOpen && styles.active]}
          onPress={closeMenu}
          activeOpacity={1}
        />
      </Modal>

      {/* Mobile menu */}
      <Modal
        visible={menuOpen}
        transparent={true}
        animationType="slide"
        onRequestClose={closeMenu}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity 
            style={styles.modalBackground}
            onPress={closeMenu}
            activeOpacity={1}
          />
          <View style={[styles.mobileMenu, menuOpen && styles.active]}>
            <View style={styles.mobileNavList}>
              <TouchableOpacity 
                style={[styles.mobileNavButton, styles.blueOutline]}
                onPress={() => handleNavigation('#')}
              >
                <Text style={styles.mobileNavButtonText}>Доска объявлений</Text>
                <View style={styles.soonBadge}>
                  <Text style={styles.soonBadgeText}>скоро</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.figureWrapper}>
              <Image
                source={require('../../assets/images/Guy11.png')}
                style={styles.figureImage}
                contentFit="contain"
              />
            </View>

            <TouchableOpacity style={styles.mobileLanguageSelect}>
              <Text style={styles.languageText}>Выберите язык</Text>
              <View style={styles.arrowIcon}>
                <Text style={styles.arrowText}>▼</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          {/* Left block: Logo */}
          <TouchableOpacity 
            style={styles.logoSection}
            onPress={() => handleNavigation('/')}
          >
            <Image
              source={require('../../assets/images/logoMountain2.png')}
              style={styles.logoImage}
              contentFit="contain"
            />
            <Text style={styles.logoText}>Land of Soul</Text>
          </TouchableOpacity>

          {/* Center navigation buttons */}
          <View style={styles.nav}>
            <TouchableOpacity style={[styles.navButton, styles.blueOutline]}>
              <Text style={styles.navButtonText}>Доска объявлений</Text>
              <View style={styles.soonBadge}>
                <Text style={styles.soonBadgeText}>скоро</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Decorative image (Guy) */}
          <View style={styles.figureWrapperDesktop}>
            <Image
              source={require('../../assets/images/Guy11.png')}
              style={styles.figureImageDesktop}
              contentFit="contain"
            />
          </View>

          {/* Right block: language select */}
          <TouchableOpacity style={styles.languageSelect}>
            <Text style={styles.languageText}>Выберите язык</Text>
            <View style={styles.arrowIcon}>
              <Text style={styles.arrowText}>▼</Text>
            </View>
          </TouchableOpacity>

          {/* Burger button */}
          <TouchableOpacity 
            style={[styles.burgerButton, menuOpen && styles.burgerActive]}
            onPress={toggleMenu}
          >
            <View style={[styles.burgerLine, menuOpen && styles.burgerLine1]} />
            <View style={[styles.burgerLine, menuOpen && styles.burgerLine2]} />
            <View style={[styles.burgerLine, menuOpen && styles.burgerLine3]} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#ffffff',
  },
  header: {
    position: 'relative',
    width: '100%',
    maxWidth: 1920,
    height: 80,
    marginHorizontal: 'auto',
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  
  // Logo
  logoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    zIndex: 1000,
  },
  logoImage: {
    width: 60,
    height: 60,
  },
  logoText: {
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 22,
    color: 'rgba(0, 0, 0, 0.85)',
    margin: 0,
  },

  // Desktop items - hidden on mobile
  nav: {
    display: 'none',
  },
  figureWrapperDesktop: {
    display: 'none',
  },
  languageSelect: {
    display: 'none',
  },

  // Burger Menu
  burgerButton: {
    width: 48,
    height: 48,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    zIndex: 1002,
  },
  burgerLine: {
    position: 'absolute',
    width: 28,
    height: 3,
    backgroundColor: '#1129bd',
    marginVertical: 0,
  },
  burgerLine1: {
    top: 14,
  },
  burgerLine2: {
    top: '50%',
    transform: [{ translateY: -1.5 }],
  },
  burgerLine3: {
    bottom: 14,
  },

  // Mobile Menu (Off-canvas)
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalBackground: {
    flex: 1,
  },
  mobileMenuOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
    opacity: 0,
  },
  mobileMenu: {
    flexDirection: 'column',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    right: '-100%',
    width: '80%',
    maxWidth: 320,
    height: '100%',
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
    zIndex: 1001,
    paddingTop: 100,
    paddingHorizontal: 24,
    paddingBottom: 40,
    gap: 24,
  },

  // Active states for mobile menu
  active: {
    opacity: 1,
    right: 0,
  },
  burgerActive: {},

  // Mobile Menu Content
  mobileNavList: {
    flexDirection: 'column',
    gap: 16,
    marginBottom: 0,
    width: '100%',
  },
  mobileNavButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    width: '100%',
    height: 56,
    borderWidth: 2,
    borderColor: '#d5daef',
    borderRadius: 100,
    backgroundColor: '#ffffff',
    position: 'relative',
  },
  mobileNavButtonText: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 22,
    color: '#1129bd',
    textAlign: 'center',
  },
  mobileLanguageSelect: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 6,
    paddingHorizontal: 16,
    width: '100%',
    height: 56,
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: 'rgba(17, 41, 189, 0.1)',
    borderRadius: 100,
    marginTop: 0,
  },

  // Navigation buttons
  navButton: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: 190,
    height: 48,
    borderWidth: 2,
    borderColor: 'transparent',
    borderRadius: 100,
    backgroundColor: '#ffffff',
  },
  navButtonText: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 22,
    color: '#1129bd',
    textAlign: 'center',
  },

  // Global badge style
  soonBadge: {
    position: 'absolute',
    top: -8,
    right: -20,
    backgroundColor: '#1129BD',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 50,
  },
  soonBadgeText: {
    color: '#FFFFFF',
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: 12,
    lineHeight: 12,
    textTransform: 'uppercase',
    fontStyle: 'italic',
  },

  // Figure styles
  figureWrapper: {
    width: 100,
    height: 100,
  },
  figureImage: {
    width: '100%',
    height: '100%',
  },
  figureImageDesktop: {
    width: '100%',
    height: 'auto',
  },

  // Language select
  languageText: {
    fontFamily: 'Inter',
    fontWeight: '400',
    lineHeight: 24,
    color: '#1129bd',
  },
  arrowIcon: {
    marginLeft: 6,
  },
  arrowText: {
    color: '#1129bd',
    fontSize: 12,
  },

  // Common outline styles
  blueOutline: {
    borderColor: '#d5daef',
  },
});

export default Header; 