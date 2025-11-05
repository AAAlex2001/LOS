import React, { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import WelcomeScreen from '../pages/Welcome/Welcome';

// Keep the native splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function IndexScreen() {
  useEffect(() => {
    // Hide native splash screen after a short delay
    const timer = setTimeout(async () => {
      await SplashScreen.hideAsync();
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <StatusBar style="light" />
      <WelcomeScreen />
    </>
  );
}