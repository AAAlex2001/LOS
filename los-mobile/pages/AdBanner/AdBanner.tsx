import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Animated,
  Easing,
  Dimensions,
  AppState,
} from 'react-native';
import { Image } from 'expo-image';
import { VideoView, useVideoPlayer } from 'expo-video';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import config from '@/config';
import { useTranslation, addLangParam } from '@/i18n';

interface AdBannerProps {
  visible: boolean;
  prepare?: boolean;
  onClose: () => void;
  onClosing?: () => void;
  prefetchedAd?: AdBannerData | null;
  onPrepared?: () => void;
}

interface AdBannerData {
  image?: string;
  video?: string;
  title: string;
  description: string;
  site: string;
  url: string;
  age_restriction?: string;
  is_active?: boolean;
}

const API_BASE = config.API_BASE;
const CLOSE_DELAY_MS = 5000;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const toMediaUrl = (url?: string | null) => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `${API_BASE}/media/${url}`;
};

const AdBanner: React.FC<AdBannerProps> = ({ visible, prepare = false, onClose, onClosing, prefetchedAd, onPrepared }) => {
  const { t } = useTranslation();
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const insets = useSafeAreaInsets();
  const [adData, setAdData] = useState<AdBannerData | null>(null);
  const [canClose, setCanClose] = useState(false);
  const [mediaReady, setMediaReady] = useState(false);
  const preparedRef = useRef(false);
  const closingRef = useRef(false);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const timerStartRef = useRef<number>(0);
  const timerRemainingRef = useRef<number>(CLOSE_DELAY_MS);

  const startCloseTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerStartRef.current = Date.now();
    timerRef.current = setTimeout(() => setCanClose(true), timerRemainingRef.current);
  }, []);

  const pauseCloseTimer = useCallback(() => {
    if (!timerRef.current) return;
    clearTimeout(timerRef.current);
    timerRef.current = null;
    const elapsed = Date.now() - timerStartRef.current;
    timerRemainingRef.current = Math.max(0, timerRemainingRef.current - elapsed);
  }, []);

  const isAdPayloadValid = (payload: AdBannerData | null | undefined) => {
    if (!payload || payload.is_active !== true) return false;
    return Boolean(payload.image || payload.video || payload.title || payload.description || payload.site || payload.url);
  };

  const videoUrl = adData?.video ? toMediaUrl(adData.video) : null;
  const player = useVideoPlayer(videoUrl, (p) => {
    p.loop = true;
  });

  useEffect(() => {
    if (visible) {
      closingRef.current = false;
      slideAnim.setValue(SCREEN_HEIGHT);
      setCanClose(false);

      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }).start();
    }
  }, [slideAnim, visible]);

  useEffect(() => {
    if (!mediaReady || !visible) return;

    timerRemainingRef.current = CLOSE_DELAY_MS;
    startCloseTimer();

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = null;
    };
  }, [mediaReady, visible, startCloseTimer]);

  useEffect(() => {
    if (!prepare && !visible) return;

    const loadAdData = async () => {
      try {
        if (prefetchedAd) {
          if (isAdPayloadValid(prefetchedAd as AdBannerData)) setAdData(prefetchedAd as AdBannerData);
          else setAdData(null);
          return;
        }

        const res = await fetch(addLangParam(`${API_BASE}/api/ad-banner/content/`), { cache: 'no-store' });
        if (!res.ok) {
          setAdData(null);
          return;
        }
        const json = await res.json() as AdBannerData;
        if (isAdPayloadValid(json)) setAdData(json);
        else setAdData(null);
      } catch (error) {
        console.error('Error loading ad banner:', error);
        setAdData(null);
      }
    };

    loadAdData();
  }, [prepare, prefetchedAd, visible]);

  useEffect(() => {
    if (!adData || adData.video || preparedRef.current) return;

    preparedRef.current = true;
    setMediaReady(true);
    onPrepared?.();
  }, [adData, onPrepared]);

  useEffect(() => {
    if (!adData?.video || !player) return;

    if (player.status === 'readyToPlay') {
      if (!preparedRef.current) {
        preparedRef.current = true;
        setMediaReady(true);
        onPrepared?.();
      }
      if (visible) {
        player.play();
      }
      return;
    }

    const subscription = player.addListener('statusChange', ({ status }: { status: string }) => {
      if (status === 'readyToPlay') {
        if (!preparedRef.current) {
          preparedRef.current = true;
          setMediaReady(true);
          onPrepared?.();
        }
        if (visible) {
          player.play();
        }
      }
    });
    return () => subscription.remove();
  }, [adData?.video, onPrepared, player, visible]);

  useEffect(() => {
    if (!player || !adData?.video || !visible || !mediaReady) return;

    if (visible && mediaReady) {
      player.play();
    } else {
      player.pause();
    }
  }, [adData?.video, mediaReady, player, visible]);

  useEffect(() => {
    if (!visible || !mediaReady) return;

    const subscription = AppState.addEventListener('change', (nextState) => {
      if (nextState === 'active') {
        if (player && adData?.video) player.play();
        startCloseTimer();
      } else {
        if (player && adData?.video) player.pause();
        pauseCloseTimer();
      }
    });

    return () => subscription.remove();
  }, [adData?.video, mediaReady, player, visible, startCloseTimer, pauseCloseTimer]);

  const handleOpenLink = async () => {
    if (!adData?.url) return;
    try {
      const supported = await Linking.canOpenURL(adData.url);
      if (supported) await Linking.openURL(adData.url);
    } catch (error) {
      console.error('Error opening link:', error);
    }
  };

  const handleClose = () => {
    if (closingRef.current) {
      return;
    }

    closingRef.current = true;
    onClosing?.();
    Animated.timing(slideAnim, {
      toValue: SCREEN_HEIGHT,
      duration: 300,
      easing: Easing.in(Easing.cubic),
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        onClose();
      } else {
        closingRef.current = false;
      }
    });
  };

  if (!visible || !adData || !mediaReady) {
    return null;
  }

  const isVideo = Boolean(adData.video);

  return (
    <Animated.View
      style={[
        styles.overlay,
        {
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <View style={styles.container}>
        <View style={styles.mediaContainer}>
          {isVideo ? (
            <VideoView
              player={player}
              style={styles.media}
              contentFit="cover"
              nativeControls={false}
            />
          ) : (
            <Image
              source={{ uri: toMediaUrl(adData.image) }}
              style={styles.media}
              contentFit="cover"
              onLoad={() => setMediaReady(true)}
            />
          )}
        </View>
        <View style={[styles.adLabel, { top: insets.top + 12, left: 30 }]}>
          <Text style={styles.adLabelText}>
            {t('common.advertisement')}
            {adData.age_restriction ? `  ${adData.age_restriction}` : ''}
          </Text>
        </View>
        {canClose && (
          <TouchableOpacity
            style={[styles.closeButton, { top: insets.top + 12, right: 30 }]}
            onPress={handleClose}
          >
            <Ionicons name="close" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        )}
        <View style={[styles.contentContainer, { paddingBottom: Math.max(24, insets.bottom + 16) }]}>
          <Text style={styles.siteText}>{adData.site}</Text>
          <Text style={styles.titleText}>{adData.title}</Text>
          <Text style={styles.descriptionText}>{adData.description}</Text>

          <TouchableOpacity style={styles.moreButton} onPress={handleOpenLink}>
            <Ionicons name="open-outline" size={20} color="#000000" />
            <Text style={styles.moreButtonText}>{t('common.more')}</Text>
          </TouchableOpacity>
        </View>
        </View>
      </Animated.View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10000,
  },
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#000000',
  },
  mediaContainer: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  media: {
    width: '100%',
    height: '100%',
  },
  adLabel: {
    position: 'absolute',
    backgroundColor: '#424242',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    zIndex: 10,
  },
  adLabelText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '500',
  },
  closeButton: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#424242',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  contentContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 30,
    paddingTop: 16,
    paddingBottom: 24,
    backgroundColor: 'transparent',
  },
  siteText: {
    fontSize: 12,
    color: '#FFFFFF',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  titleText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  descriptionText: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 16,
    lineHeight: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  moreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#424242',
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 8,
  },
  moreButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
});

export default AdBanner;
