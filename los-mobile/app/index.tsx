import { Image } from 'expo-image';
import { StatusBar } from 'expo-status-bar';
import * as SystemUI from 'expo-system-ui';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import AdBanner from '../pages/AdBanner/AdBanner';
import WelcomeScreen from '../pages/Welcome/Welcome';
import config from '../config';
import { addLangParam } from '@/i18n';

export default function IndexScreen() {
  const [showSplash, setShowSplash] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showAd, setShowAd] = useState(false);
  const [prefetchedAd, setPrefetchedAd] = useState<any>(null);
  const [adRequestDone, setAdRequestDone] = useState(false);
  const [adPrepared, setAdPrepared] = useState(false);
  const [readyToReveal, setReadyToReveal] = useState(false);
  const adClosedRef = useRef(false);

  const isAdPayloadValid = (payload: any) => {
    if (!payload || payload.is_active !== true) return false;
    return Boolean(payload.image || payload.video || payload.title || payload.description || payload.site || payload.url);
  };

  // Загружаем рекламу сразу при монтировании (во время сплэша)
  useEffect(() => {
    const loadAd = async () => {
      try {
        const res = await fetch(addLangParam(`${config.API_BASE}/api/ad-banner/content/`), { cache: 'no-store' });
        if (!res.ok) {
          setPrefetchedAd(null);
          setAdPrepared(true);
          return;
        }

        const json = await res.json();
        if (isAdPayloadValid(json)) {
          setPrefetchedAd(json);

          if (!json.video && json.image) {
            const imageUrl = json.image.startsWith('http')
              ? json.image
              : `${config.API_BASE}/media/${json.image}`;
            await Image.prefetch(imageUrl).catch(() => {});
          }

          if (!json.video) {
            setAdPrepared(true);
          }
        } else {
          setPrefetchedAd(null);
          setAdPrepared(true);
        }
      } catch (e) {
        console.error('Prefetch ad error', e);
        setPrefetchedAd(null);
        setAdPrepared(true);
      } finally {
        setAdRequestDone(true);
      }
    };
    loadAd();
  }, []);

  useEffect(() => {
    SystemUI.setBackgroundColorAsync('#010E59');

    const timer = setTimeout(() => {
      setReadyToReveal(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!readyToReveal || !adRequestDone || !adPrepared || !showSplash) {
      return;
    }

    const hasAd = Boolean(prefetchedAd);

    if (hasAd) {
      setShowAd(true);
      return;
    }

    const openWelcome = async () => {
      setShowSplash(false);
      setShowWelcome(true);
      await SystemUI.setBackgroundColorAsync('#FFFFFF');
    };

    openWelcome();
  }, [adPrepared, adRequestDone, prefetchedAd, readyToReveal, showSplash]);

  useEffect(() => {
    if (!showAd || !prefetchedAd || showWelcome) {
      return;
    }

    const timer = setTimeout(() => {
      setShowSplash(false);
      setShowWelcome(true);
      SystemUI.setBackgroundColorAsync('#FFFFFF');
    }, 3000);

    return () => clearTimeout(timer);
  }, [prefetchedAd, showAd, showWelcome]);

  return (
    <View style={[styles.root, { backgroundColor: showSplash ? '#010E59' : '#FFFFFF' }]}>
      <StatusBar
        hidden={showAd && !!prefetchedAd}
        animated={false}
        translucent
        backgroundColor="transparent"
        style={showSplash ? 'light' : 'dark'}
      />
      <AdBanner
        visible={showAd && !!prefetchedAd}
        prepare={Boolean(prefetchedAd)}
        prefetchedAd={prefetchedAd}
        onPrepared={() => setAdPrepared(true)}
        onClosing={() => {
          setShowWelcome(true);
        }}
        onClose={async () => {
          if (adClosedRef.current) {
            return;
          }
          adClosedRef.current = true;
          setShowAd(false);
          setShowSplash(false);
          setShowWelcome(true);
          await SystemUI.setBackgroundColorAsync('#FFFFFF');
        }}
      />
      {showWelcome && <WelcomeScreen />}

      {showSplash && (
        <View style={styles.splashContainer} pointerEvents="none">
          <View style={styles.splashContent}>
            <Image
              source={require('../assets/images/logo_splash.png')}
              style={{ width: 150, height: 150 }}
              contentFit="contain"
            />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
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