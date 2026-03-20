import { Image } from 'expo-image';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import * as SystemUI from 'expo-system-ui';
import React, { useCallback, useEffect, useRef, useState } from 'react';
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
  const splashHiddenRef = useRef(false);

  const hideSplash = useCallback(() => {
    if (splashHiddenRef.current) return;
    splashHiddenRef.current = true;
    SplashScreen.hideAsync().catch(() => {});
  }, []);

  const isAdPayloadValid = (payload: any) => {
    if (!payload || payload.is_active !== true) return false;
    return Boolean(payload.image || payload.video || payload.title || payload.description || payload.site || payload.url);
  };

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
        setPrefetchedAd(null);
        setAdPrepared(true);
      } finally {
        setAdRequestDone(true);
      }
    };
    loadAd();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setReadyToReveal(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const revealWelcome = useCallback(() => {
    SystemUI.setBackgroundColorAsync('#FFFFFF');
    setShowWelcome(true);
    setShowSplash(false);
  }, []);

  useEffect(() => {
    if (!readyToReveal || !adRequestDone || !adPrepared || !showSplash) return;
    if (Boolean(prefetchedAd)) {
      setShowAd(true);
      return;
    }
    revealWelcome();
  }, [adPrepared, adRequestDone, prefetchedAd, readyToReveal, revealWelcome, showSplash]);

  return (
    <View style={styles.root}>
      <StatusBar
        hidden={showAd && !!prefetchedAd}
        animated={false}
        translucent
        backgroundColor="transparent"
        style={showSplash && !showWelcome ? 'light' : 'dark'}
      />

      {showWelcome && <WelcomeScreen />}

      {showSplash && (
        <View
          style={[
            styles.splashOverlay,
            showWelcome && { backgroundColor: '#FFFFFF' },
          ]}
        >
          {!showWelcome && (
            <Image
              source={require('../assets/images/logo_splash.png')}
              style={{ width: 150, height: 150 }}
              contentFit="contain"
              onLoad={hideSplash}
            />
          )}
        </View>
      )}

      <AdBanner
        visible={showAd && !!prefetchedAd}
        prepare={Boolean(prefetchedAd)}
        prefetchedAd={prefetchedAd}
        onPrepared={() => setAdPrepared(true)}
        onClosing={() => {
          SystemUI.setBackgroundColorAsync('#FFFFFF');
          setShowWelcome(true);
        }}
        onClose={() => {
          if (adClosedRef.current) return;
          adClosedRef.current = true;
          setShowSplash(false);
          setShowAd(false);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#010E59',
  },
  splashOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#010E59',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
});
