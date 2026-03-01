import * as Haptics from 'expo-haptics';
import { Image } from 'expo-image';
import { StatusBar } from 'expo-status-bar';
import * as SystemUI from 'expo-system-ui';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import AdBanner from '../pages/AdBanner/AdBanner';
import WelcomeScreen from '../pages/Welcome/Welcome';
import config from '../config';
import { addLangParam } from '@/i18n';

export default function IndexScreen() {
  const [showSplash, setShowSplash] = useState(true);
  const [showAd, setShowAd] = useState(false);
  const [prefetchedAd, setPrefetchedAd] = useState<any>(null);
  const [adLoaded, setAdLoaded] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const isAdPayloadValid = (payload: any) => {
    if (!payload || payload.is_active !== true) return false;
    return Boolean(payload.image || payload.title || payload.description || payload.site || payload.url);
  };

  // Загружаем рекламу сразу при монтировании (во время сплэша)
  useEffect(() => {
    const loadAd = async () => {
      try {
        const res = await fetch(addLangParam(`${config.API_BASE}/api/ad-banner/content/`), { cache: 'no-store' });
        if (res.ok) {
          const json = await res.json();
          if (isAdPayloadValid(json)) setPrefetchedAd(json);
          else setPrefetchedAd(null);
        }
      } catch (e) {
        console.error('Prefetch ad error', e);
      } finally {
        setAdLoaded(true);
      }
    };
    loadAd();
  }, []);

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
        // Показываем рекламу (данные уже загружены)
        setShowAd(true);
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

  // Если реклама ещё не загружена — показываем белый экран (ждём)
  if (!adLoaded) {
    return (
      <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
        <StatusBar style="dark" />
      </View>
    );
  }

  return (
    <>
      <StatusBar style="dark" />
      {/* Сначала показываем рекламу поверх Welcome */}
      <AdBanner visible={showAd && !!prefetchedAd} onClose={() => setShowAd(false)} prefetchedAd={prefetchedAd} />
      {/* Welcome показывается только когда реклама закрыта или её нет */}
      {(!showAd || !prefetchedAd) && <WelcomeScreen />}
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