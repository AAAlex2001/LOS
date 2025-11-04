import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import WelcomeScreen from '../pages/Welcome/Welcome';

export default function IndexScreen() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return (
      <SafeAreaView style={styles.splash} edges={['top', 'bottom']}>
        <StatusBar style="light" />
        <Image
          source={require('../assets/images/logo_splash.png')}
          style={{ width: 150, height: 150 }}
          contentFit="contain"
        />
      </SafeAreaView>
    );
  }

  return <WelcomeScreen />;
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    backgroundColor: '#010E59',
    alignItems: 'center',
    justifyContent: 'center',
  },
});