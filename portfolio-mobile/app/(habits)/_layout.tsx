import { Stack } from 'expo-router';

import { ThemeProvider } from '@/themes/ThemeProvider';

export default function Layout() {
  return (
    <ThemeProvider concept="habits">
      <Stack screenOptions={{ headerShown: false, animation: 'fade', animationDuration: 160 }} />
    </ThemeProvider>
  );
}
