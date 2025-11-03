import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { Image } from 'expo-image';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const icons = [
  {
    image: require('../../assets/images/Mand3.png'),
    width: 100,
    height: 100,
    left: -200,
    top: -350,
    rotation: 6,
    delay: 0,
  },
  {
    image: require('../../assets/images/adaptive-icon.png'),
    width: 100,
    height: 100,
    left: 133,
    top: -120,
    rotation: -15,
    delay: 150,
  },
  {
    image: require('../../assets/images/adaptive-icon.png'),
    width: 110,
    height: 110,
    left: -137,
    top: 328,
    rotation: 10,
    delay: 300,
  },
  {
    image: require('../../assets/images/YourDoctor_logo.png'),
    width: 90,
    height: 90,
    left: -3,
    top: 328,
    rotation: -5,
    delay: 450,
  },
  {
    image: require('../../assets/images/adaptive-icon.png'),
    width: 80,
    height: 80,
    left: 123,
    top: 248,
    rotation: 7,
    delay: 600,
  },
];

export default function WelcomeScreen() {
  const router = useRouter();
  const slideAnims = useRef(icons.map(() => new Animated.Value(-500))).current;
  const fadeAnims = useRef(icons.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    const vibrate = async () => {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setTimeout(async () => {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }, 300);
    };
    vibrate();
  }, []);

  useEffect(() => {
    const animations = icons.map((icon, index) => {
      return Animated.parallel([
        Animated.spring(slideAnims[index], {
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
      ]);
    });

    Animated.stagger(50, animations).start();
  }, []);

  const handleGetStarted = () => {
    router.replace('/home');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.content}>
        <Text style={styles.title}>Добро пожаловать!</Text>
        <Text style={styles.heading}>Встречайте первый тур-гид по Абхазии!</Text>
        <Text style={styles.description}>
          Всё для идеального путешествия в одном приложении: яркая культура, лазурное море и живописные горы, рестораны, такси, операторы и другие. Начните путешествие с вдохновением!
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
          <Text style={styles.buttonText}>Начать исследовать</Text>
          <Ionicons name="arrow-forward" size={31} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Floating Icons */}
      <View style={styles.iconsContainer}>
        {icons.map((icon, index) => {
          const translateX = slideAnims[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
          });
          const opacity = fadeAnims[index];

          return (
            <Animated.View
              key={index}
              style={[
                styles.icon,
                {
                  width: icon.width,
                  height: icon.height,
                  left: SCREEN_WIDTH / 2 + icon.left,
                  top: SCREEN_HEIGHT / 2 + icon.top,
                  transform: [
                    { rotate: `${icon.rotation}deg` },
                    { translateY: slideAnims[index] },
                  ],
                  opacity,
                },
              ]}
            >
              <Image
                source={icon.image}
                style={styles.iconImage}
                contentFit="contain"
              />
            </Animated.View>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    zIndex: 2,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1129BD',
    textAlign: 'center',
    marginBottom: 125,
  },
  heading: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1129BD',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  description: {
    fontSize: 18,
    fontWeight: '400',
    color: '#000000',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#1129BD',
    paddingVertical: 8.5,
    paddingHorizontal: 22.5,
    borderRadius: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    width: '100%',
  },
  iconsContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: 1,
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
