import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { Image } from 'expo-image';
import config from '../../config';

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

// Позиции иконок относительно центра экрана
const iconPositions = [
  { width: 100, height: 100, left: -200, top: -340, rotation: 6, delay: 0 },
  { width: 100, height: 100, left: 100, top: -340, rotation: -15, delay: 150 },
  { width: 100, height: 100, left: -200, top: 225, rotation: 10, delay: 300 },
  { width: 90, height: 90, left: -60, top: 125, rotation: -5, delay: 450 },
  { width: 80, height: 80, left: 100, top: 45, rotation: 7, delay: 600 },
];

export default function WelcomeScreen() {
  const router = useRouter();
  const [content, setContent] = useState<WelcomeContent | null>(null);
  const [titleY, setTitleY] = useState(0);
  
  // X для верхних (0,1), Y для нижних (2,3,4)
  const translateXAnims = useRef(iconPositions.map(() => new Animated.Value(0))).current;
  const translateYAnims = useRef(iconPositions.map(() => new Animated.Value(0))).current;
  const fadeAnims = useRef(iconPositions.map(() => new Animated.Value(0))).current;

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
        const res = await fetch(`${API_BASE}/api/welcome/page/content/`, { cache: 'no-store' });
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
    iconPositions.forEach((icon, index) => {
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

    const animations = iconPositions.map((icon, index) =>
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
              setTitleY(y + height);
            }}
          >
            {content?.title}
          </Text>
          <Text style={styles.heading}>{content?.subtitle}</Text>
          <Text style={styles.description}>{content?.description}</Text>
          <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
            <Text style={styles.buttonText}>Начать исследовать</Text>
            <Ionicons name="arrow-forward" size={31} color="#FFFFFF" />
          </TouchableOpacity>

          {/* Floating Icons */}
          <View style={styles.iconsContainer}>
            {content?.icons?.slice(0, 5).map((iconData, index) => {
              const pos = iconPositions[index];
              if (!pos) return null;
              const opacity = fadeAnims[index];
              
              // Для первых двух иконок позиционируем относительно заголовка
              let topPosition;
              if (index <= 1) {
                // Позиция под заголовком + небольшой отступ
                topPosition = titleY > 0 ? titleY + 20 : SCREEN_HEIGHT / 2 + pos.top;
              } else {
                // Для остальных иконок используем центр экрана
                topPosition = SCREEN_HEIGHT / 2 + pos.top;
              }
              
              return (
                <Animated.View
                  key={index}
                  style={[
                    styles.icon,
                    {
                      width: pos.width,
                      height: pos.height,
                      left: SCREEN_WIDTH / 2 + pos.left,
                      top: topPosition,
                      transform: [
                        { rotate: `${pos.rotation}deg` },
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
