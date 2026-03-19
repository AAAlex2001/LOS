import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useEffect, useRef } from 'react';
import { View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Stack } from 'expo-router';
import * as SystemUI from 'expo-system-ui';
import 'react-native-reanimated';

import '@/i18n';

import { useColorScheme } from '@/hooks/useColorScheme';

SplashScreen.preventAutoHideAsync().catch(() => {});
SystemUI.setBackgroundColorAsync('#010E59');

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
  const splashHiddenRef = useRef(false);
  const [fontsLoaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    SplashScreen.setOptions({ fade: true, duration: 200 });
  }, []);

  // Пока шрифты грузятся — синий экран, НЕ null (null = белый корневой View)
  if (!fontsLoaded) {
    return <View style={{ flex: 1, backgroundColor: '#010E59' }} />;
  }

  return (
    <View
      style={{ flex: 1 }}
      onLayout={() => {
        if (splashHiddenRef.current) return;
        splashHiddenRef.current = true;
        SplashScreen.hideAsync().catch(() => {});
      }}
    >
      <ThemeProvider value={colorScheme === 'dark' ? LosDarkTheme : LosTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ThemeProvider>
    </View>
  );
}
