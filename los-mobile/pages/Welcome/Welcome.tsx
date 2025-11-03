import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';

export default function WelcomeScreen() {
  const router = useRouter();

  useEffect(() => {
    const vibrate = async () => {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setTimeout(async () => {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }, 300);
    };
    vibrate();
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
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
      minHeight: 50
  },
  buttonText: {
    fontSize: 16,
      lineHeight: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
      width: '100%'
  },
});
