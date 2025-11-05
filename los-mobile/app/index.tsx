import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Image } from 'expo-image';
import { StatusBar } from 'expo-status-bar';
import * as SystemUI from 'expo-system-ui';
import * as Haptics from 'expo-haptics';
import WelcomeScreen from '../pages/Welcome/Welcome';

export default function IndexScreen() {
  const [showSplash, setShowSplash] = useState(true);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Устанавливаем синий фон для системных баров во время сплэша
    SystemUI.setBackgroundColorAsync('#010E59');
    
    // Через 2 секунды начинаем плавное исчезание сплэша
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start(async () => {
        setShowSplash(false);
        // Меняем фон системных баров на белый
        await SystemUI.setBackgroundColorAsync('#FFFFFF');
        // Сердцебиение: два импакта с небольшой задержкой
        try {
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          setTimeout(async () => {
            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }, 120);
        } catch {}
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return (
      <Animated.View style={[styles.splashContainer, { opacity: fadeAnim }]}>
        <StatusBar style="light" />
        <View style={styles.splashContent}>
          <Image
            source={require('../assets/images/logo_splash.png')}
            style={{ width: 150, height: 150 }}
            contentFit="contain"
          />
        </View>
      </Animated.View>
    );
  }

  return (
    <>
      <StatusBar style="dark" />
      <WelcomeScreen />
    </>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: '#010E59',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
  },
  splashContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});