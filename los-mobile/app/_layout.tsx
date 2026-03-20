import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { View } from 'react-native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SystemUI from 'expo-system-ui';
import 'react-native-reanimated';

import '@/i18n';

import { useColorScheme } from '@/hooks/useColorScheme';

// Нативный корневой View — синий (асинхронно, но expo-system-ui плагин
// делает это на нативном уровне при сборке, этот вызов — страховка)
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
  const [fontsLoaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <View style={{ flex: 1, backgroundColor: '#010E59' }} />;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? LosDarkTheme : LosTheme}>
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
