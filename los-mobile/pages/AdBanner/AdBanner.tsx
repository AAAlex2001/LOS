import React, { useEffect, useRef, useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Animated,
  ActivityIndicator,
} from 'react-native';
import { Image } from 'expo-image';
import { VideoView, useVideoPlayer } from 'expo-video';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import config from '@/config';
import { useTranslation, addLangParam } from '@/i18n';

interface AdBannerProps {
  visible: boolean;
  onClose: () => void;
  prefetchedAd?: AdBannerData | null;
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

const toMediaUrl = (url?: string | null) => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `${API_BASE}/media/${url}`;
};

const AdBanner: React.FC<AdBannerProps> = ({ visible, onClose, prefetchedAd }) => {
  const { t } = useTranslation();
  const progressAnim = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();
  const [adData, setAdData] = useState<AdBannerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [canClose, setCanClose] = useState(false);
  const [mediaReady, setMediaReady] = useState(false);

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
      setCanClose(false);
      setMediaReady(false);
      progressAnim.setValue(0);
    }
  }, [visible]);

  useEffect(() => {
    if (!mediaReady || !visible) return;

    Animated.timing(progressAnim, {
      toValue: 1,
      duration: CLOSE_DELAY_MS,
      useNativeDriver: false,
    }).start();

    const timer = setTimeout(() => setCanClose(true), CLOSE_DELAY_MS);
    return () => {
      clearTimeout(timer);
      progressAnim.stopAnimation();
    };
  }, [mediaReady, visible]);

  useEffect(() => {
    if (!visible) return;

    const loadAdData = async () => {
      try {
        setLoading(true);

        if (prefetchedAd) {
          if (isAdPayloadValid(prefetchedAd as AdBannerData)) setAdData(prefetchedAd as AdBannerData);
          else setAdData(null);
          setLoading(false);
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
      } finally {
        setLoading(false);
      }
    };

    loadAdData();
  }, [visible, prefetchedAd]);

  useEffect(() => {
    if (!adData?.video || !player) return;
    const subscription = player.addListener('statusChange', ({ status }: { status: string }) => {
      if (status === 'readyToPlay') {
        setMediaReady(true);
        player.play();
      }
    });
    return () => subscription.remove();
  }, [player, adData?.video]);

  const handleOpenLink = async () => {
    if (!adData?.url) return;
    try {
      const supported = await Linking.canOpenURL(adData.url);
      if (supported) await Linking.openURL(adData.url);
    } catch (error) {
      console.error('Error opening link:', error);
    }
  };

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  if (!visible || loading || !adData) {
    return null;
  }

  const isVideo = Boolean(adData.video);

  return (
    <Modal
      visible={visible}
      transparent={false}
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <StatusBar style="light" />
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
        {!mediaReady && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#FFFFFF" />
          </View>
        )}
        {mediaReady && (
          <View style={[styles.progressBarContainer, { top: insets.top }]}>
            <Animated.View style={[styles.progressBar, { width: progressWidth }]} />
          </View>
        )}
        <View style={[styles.adLabel, { top: insets.top + 12, left: 30 }]}>
          <Text style={styles.adLabelText}>
            {t('common.advertisement')}
            {adData.age_restriction ? `  ${adData.age_restriction}` : ''}
          </Text>
        </View>
        {canClose && (
          <TouchableOpacity
            style={[styles.closeButton, { top: insets.top + 12, right: 30 }]}
            onPress={onClose}
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
    </Modal>
  );
};

const styles = StyleSheet.create({
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
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 30,
  },
  progressBarContainer: {
    height: 2,
    backgroundColor: '#E0E0E0',
    width: '100%',
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 20,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#1129BD',
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

