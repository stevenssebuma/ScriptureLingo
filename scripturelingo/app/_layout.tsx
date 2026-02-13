import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="onboarding/choose-scriptures" />
        <Stack.Screen name="onboarding/daily-goal" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="lesson/reading" />
        <Stack.Screen name="lesson/complete" />
        <Stack.Screen name="quiz/multiple-choice" />
        <Stack.Screen name="quiz/citation" />
      </Stack>
      <StatusBar style="dark" />
    </ThemeProvider>
  );
}
