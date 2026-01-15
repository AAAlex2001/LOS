import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { Image } from 'expo-image';
import config from '../../config';
import {useTranslation, addLangParam} from '@/i18n';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const API_BASE = config.API_BASE;

const toImageUrl = (url?: string) => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `${API_BASE}/media/${url}`;
};

type WelcomeContent = {
  title?: string;
  subtitle?: string;
  description?: string;
  icons?: { image: string; order?: number }[];
};

// Конфигурация иконок: размеры, горизонтальное смещение от центра, вращение, задержка анимации
// Иконки 0,1 — верхние (между заголовками), иконки 2,3,4 — нижние (после кнопки)
const iconConfigs = [
  { width: 85, height: 85, offsetX: -120, rotation: 6, delay: 0 },      // мандарин (слева)
  { width: 75, height: 75, offsetX: 120, rotation: -15, delay: 150 },   // правая верхняя (симметрично мандарину)
  { width: 75, height: 75, offsetX: -130, rotation: 10, delay: 300 },   // левая нижняя
  { width: 70, height: 70, offsetX: 0, rotation: -5, delay: 450 },      // центр нижняя
  { width: 65, height: 65, offsetX: 110, rotation: 7, delay: 600 },     // правая нижняя
];

export default function WelcomeScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const [content, setContent] = useState<WelcomeContent | null>(null);
  const [titleBottomY, setTitleBottomY] = useState(0);       // нижняя граница верхнего заголовка
  const [subtitleTopY, setSubtitleTopY] = useState(0);       // верхняя граница subtitle
  const [buttonBottomY, setButtonBottomY] = useState(0);     // нижняя граница кнопки
  
  // X для верхних (0,1), Y для нижних (2,3,4)
  const translateXAnims = useRef(iconConfigs.map(() => new Animated.Value(0))).current;
  const translateYAnims = useRef(iconConfigs.map(() => new Animated.Value(0))).current;
  const fadeAnims = useRef(iconConfigs.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    const vibrate = async () => {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setTimeout(async () => {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }, 300);
    };
    vibrate();
  }, []);

  // Загрузить контент экрана Welcome из админки
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(addLangParam(`${API_BASE}/api/welcome/page/content/`), { cache: 'no-store' });
        if (!res.ok) return;
        const json = (await res.json()) as WelcomeContent;
        setContent(json);
      } catch (e) {
        console.error(e);
      }
    };
    load();
  }, []);

  useEffect(() => {
    // Стартовые позиции для анимации
    iconConfigs.forEach((icon, index) => {
      fadeAnims[index].setValue(0);
      if (index === 0) {
        // Слева
        translateXAnims[index].setValue(-SCREEN_WIDTH);
        translateYAnims[index].setValue(0);
      } else if (index === 1) {
        // Справа
        translateXAnims[index].setValue(SCREEN_WIDTH);
        translateYAnims[index].setValue(0);
      } else {
        // Снизу
        translateXAnims[index].setValue(0);
        translateYAnims[index].setValue(SCREEN_HEIGHT);
      }
    });

    const animations = iconConfigs.map((icon, index) =>
      Animated.parallel([
        index <= 1
          ? Animated.spring(translateXAnims[index], {
              toValue: 0,
              delay: icon.delay,
              useNativeDriver: true,
              tension: 50,
              friction: 7,
            })
          : Animated.spring(translateYAnims[index], {
              toValue: 0,
              delay: icon.delay,
              useNativeDriver: true,
              tension: 50,
              friction: 7,
            }),
        Animated.timing(fadeAnims[index], {
          toValue: 1,
          duration: 600,
          delay: icon.delay,
          useNativeDriver: true,
        }),
      ])
    );

    Animated.stagger(50, animations).start();
  }, []);

  const handleGetStarted = () => {
    router.replace('/home');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.contentWrapper}>
        <View style={styles.content}>
          <Text 
            style={styles.title}
            onLayout={(e) => {
              const { y, height } = e.nativeEvent.layout;
              setTitleBottomY(y + height);
            }}
          >
            {content?.title}
          </Text>
          <Text 
            style={styles.heading}
            onLayout={(e) => {
              const { y } = e.nativeEvent.layout;
              setSubtitleTopY(y);
            }}
          >
            {content?.subtitle}
          </Text>
          <Text style={styles.description}>{content?.description}</Text>
          <TouchableOpacity 
            style={styles.button} 
            onPress={handleGetStarted}
            onLayout={(e) => {
              const { y, height } = e.nativeEvent.layout;
              setButtonBottomY(y + height);
            }}
          >
            <Text style={styles.buttonText}>{t('common.start_exploring')}</Text>
            <Ionicons name="arrow-forward" size={31} color="#FFFFFF" />
          </TouchableOpacity>

          {/* Floating Icons */}
          <View style={styles.iconsContainer}>
            {content?.icons?.slice(0, 5).map((iconData, index) => {
              const cfg = iconConfigs[index];
              if (!cfg) return null;
              const opacity = fadeAnims[index];
              
              // Вычисляем позицию Y
              let topPosition: number;
              if (index <= 1) {
                // Верхние иконки: между title и subtitle (по центру этого промежутка)
                const gapCenter = titleBottomY + (subtitleTopY - titleBottomY) / 2;
                topPosition = gapCenter - cfg.height / 2;
              } else {
                // Нижние иконки: после кнопки (лесенкой)
                const baseY = buttonBottomY + 30 + 35; // отступ от кнопки для правой (+35px сдвиг)
                const bottomY = baseY + 100;      // самая нижняя (левая)
                if (index === 2) topPosition = bottomY;                    // левая - самая нижняя
                else if (index === 3) topPosition = baseY + (bottomY - baseY) / 2;  // центр - посередине
                else topPosition = baseY;                                  // правая - 65px от кнопки
              }
              
              return (
                <Animated.View
                  key={index}
                  style={[
                    styles.icon,
                    {
                      width: cfg.width,
                      height: cfg.height,
                      left: SCREEN_WIDTH / 2 + cfg.offsetX - cfg.width / 2,
                      top: topPosition,
                      transform: [
                        { rotate: `${cfg.rotation}deg` },
                        { translateX: translateXAnims[index] },
                        { translateY: translateYAnims[index] },
                      ],
                      opacity,
                    },
                  ]}
                >
                  <Image
                    source={{ uri: toImageUrl(iconData.image) }}
                    style={styles.iconImage}
                    contentFit="contain"
                  />
                </Animated.View>
              );
            })}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  contentWrapper: {
    flex: 1,
    position: 'relative',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 40,
    alignItems: 'center',
    position: 'relative',
    zIndex: 2,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1129BD',
    textAlign: 'center',
    marginBottom: 130,
    lineHeight: 34,
    maxWidth: 380,
    width: '100%',
  },
  heading: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1129BD',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 24,
    maxWidth: 380,
    width: '100%',
  },
  description: {
    fontSize: 18,
    fontWeight: '400',
    color: '#000000',
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 48,
    maxWidth: 380,
    width: '100%',
  },
  button: {
    backgroundColor: '#1129BD',
    paddingVertical: 8.5,
    paddingHorizontal: 22.5,
    borderRadius: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    minHeight: 50,
    maxWidth: 380,
    width: '100%',
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  iconsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
    zIndex: 1,
    overflow: 'visible',
  },
  icon: {
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  iconImage: {
    width: '100%',
    height: '100%',
  },
});
