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

const globalKey = '__LOS_FONTS_PATCHED__';
const g = globalThis as typeof globalThis & { [globalKey]?: boolean };

if (!g[globalKey]) {
  const textAny = Text as unknown as {
    render?: (...args: any[]) => any;
    defaultProps?: Record<string, unknown>;
  };
  const textInputAny = TextInput as unknown as {
    render?: (...args: any[]) => any;
    defaultProps?: Record<string, unknown>;
  };

  if (typeof textAny.render === 'function') {
    const originalTextRender = textAny.render;
    textAny.render = (props: Record<string, unknown>, ...rest: any[]) =>
      originalTextRender(
        {
          ...props,
          allowFontScaling: false,
          maxFontSizeMultiplier: 1,
        },
        ...rest
      );
  }

  if (typeof textInputAny.render === 'function') {
    const originalTextInputRender = textInputAny.render;
    textInputAny.render = (props: Record<string, unknown>, ...rest: any[]) =>
      originalTextInputRender(
        {
          ...props,
          allowFontScaling: false,
          maxFontSizeMultiplier: 1,
        },
        ...rest
      );
  }

  textAny.defaultProps = textAny.defaultProps || {};
  textAny.defaultProps.allowFontScaling = false;
  textAny.defaultProps.maxFontSizeMultiplier = 1;

  textInputAny.defaultProps = textInputAny.defaultProps || {};
  textInputAny.defaultProps.allowFontScaling = false;
  textInputAny.defaultProps.maxFontSizeMultiplier = 1;

  g[globalKey] = true;
}

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
