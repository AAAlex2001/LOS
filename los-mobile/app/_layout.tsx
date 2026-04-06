import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useEffect } from 'react';
import { Text, TextInput, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Stack } from 'expo-router';
import * as SystemUI from 'expo-system-ui';
import 'react-native-reanimated';

import '@/i18n';

import { useColorScheme } from '@/hooks/useColorScheme';

// Держим нативный сплеш пока React не будет готов
SplashScreen.preventAutoHideAsync().catch(() => {});
SystemUI.setBackgroundColorAsync('#010E59');

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
Text.defaultProps.maxFontSizeMultiplier = 1;

TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;
TextInput.defaultProps.maxFontSizeMultiplier = 1;

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    // Мгновенный переход, без fade — убирает мерцание иконки
    SplashScreen.setOptions({ fade: false });
  }, []);

  if (!fontsLoaded) {
    return <View style={{ flex: 1, backgroundColor: '#010E59' }} />;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#010E59' },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
