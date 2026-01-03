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
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import config from '@/config';
import {useTranslation, addLangParam} from '@/i18n';

interface AdBannerProps {
  visible: boolean;
  onClose: () => void;
}

interface AdBannerData {
  image: string;
  title: string;
  description: string;
  site: string;
  url: string;
  is_active?: boolean;
}

const API_BASE = config.API_BASE;

const toImageUrl = (url?: string) => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `${API_BASE}/media/${url}`;
};

const AdBanner: React.FC<AdBannerProps> = ({ visible, onClose }) => {
  const { t } = useTranslation();
  const progressAnim = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();
  const [adData, setAdData] = useState<AdBannerData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (visible) {
      progressAnim.setValue(0);
      Animated.timing(progressAnim, {
        toValue: 1,
        duration: 5000,
        useNativeDriver: false,
      }).start();
    }
  }, [visible]);

  useEffect(() => {
    if (!visible) return;

    const loadAdData = async () => {
      try {
        setLoading(true);
        const res = await fetch(addLangParam(`${API_BASE}/api/ad-banner/content/`), { cache: 'no-store' });
        if (!res.ok) {
          // Если нет данных, используем пустые значения и не показываем баннер
          setAdData(null);
          return;
        }
        const json = await res.json() as AdBannerData;
        // Показываем баннер только если он активен
        if (json.is_active !== false) {
          setAdData(json);
        } else {
          setAdData(null);
        }
      } catch (error) {
        console.error('Error loading ad banner:', error);
        setAdData(null);
      } finally {
        setLoading(false);
      }
    };

    loadAdData();
  }, [visible]);

  const handleOpenLink = async () => {
    if (!adData?.url) return;
    try {
      const supported = await Linking.canOpenURL(adData.url);
      if (supported) {
        await Linking.openURL(adData.url);
      }
    } catch (error) {
      console.error('Error opening link:', error);
    }
  };

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  // Не показываем баннер, если нет данных или загрузка не завершена
  if (!visible || loading || !adData) {
    return null;
  }

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
        {/* Картинка на весь фон */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: toImageUrl(adData.image) }}
            style={styles.image}
            contentFit="cover"
          />
        </View>

        {/* Прогресс бар */}
        <View style={[styles.progressBarContainer, { top: insets.top }]}>
          <Animated.View
            style={[styles.progressBar, { width: progressWidth }]}
          />
        </View>

        {/* Метка t('common.advertisement') */}
        <View style={[styles.adLabel, { top: insets.top + 12, left: 30 }]}>
          <Text style={styles.adLabelText}>{t('common.advertisement')}</Text>
        </View>

        {/* Крестик закрытия */}
        <TouchableOpacity 
          style={[styles.closeButton, { top: insets.top + 12, right: 30 }]} 
          onPress={onClose}
        >
          <Ionicons name="close" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        {/* Нижняя часть с текстом */}
        <View style={[styles.contentContainer, { paddingBottom: Math.max(24, insets.bottom + 16) }]}>
          <Text style={styles.siteText}>{adData.site}</Text>
          <Text style={styles.titleText}>{adData.title}</Text>
          <Text style={styles.descriptionText}>{adData.description}</Text>

          {/* Кнопка t('common.more') */}
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
    backgroundColor: 'transparent',
  },
  imageContainer: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
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

