import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as SystemUI from 'expo-system-ui';
import WelcomeScreen from '../pages/Welcome/Welcome';

export default function IndexScreen() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Set system UI background color to match splash during splash
    SystemUI.setBackgroundColorAsync('#010E59');
    
    const timer = setTimeout(async () => {
      setShowSplash(false);
      // Return system bars to white after splash
      await SystemUI.setBackgroundColorAsync('#FFFFFF');
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return (
      <SafeAreaView style={styles.splash} edges={[]}>
        <StatusBar style="light" />
        <Image
          source={require('../assets/images/logo_splash.png')}
          style={{ width: 150, height: 150 }}
          contentFit="contain"
        />
      </SafeAreaView>
    );
  }

  return (
    <>
      <StatusBar style="dark" />
      <WelcomeScreen />
    </>
  );
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    backgroundColor: '#010E59',
    alignItems: 'center',
    justifyContent: 'center',
  },
});