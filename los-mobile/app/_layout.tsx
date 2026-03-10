import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Stack } from 'expo-router';
import * as SystemUI from 'expo-system-ui';
import 'react-native-reanimated';

import '@/i18n';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    SystemUI.setBackgroundColorAsync('#010E59');
    SplashScreen.hideAsync().catch(() => {});
  }, []);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
