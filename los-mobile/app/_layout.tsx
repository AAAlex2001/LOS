import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Stack } from 'expo-router';
import * as SystemUI from 'expo-system-ui';
import 'react-native-reanimated';

import '@/i18n';

import { useColorScheme } from '@/hooks/useColorScheme';

SplashScreen.preventAutoHideAsync().catch(() => {});

const LosTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#010E59',
  },
};

const LosDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#010E59',
  },
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    SplashScreen.setOptions({ fade: false });
    SystemUI.setBackgroundColorAsync('#010E59');
  }, []);

  useEffect(() => {
    if (!fontsLoaded) return;
    // Splash screen is now hidden from inside the index.tsx
    // precisely when the React splash Modal actually appears.
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? LosDarkTheme : LosTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
