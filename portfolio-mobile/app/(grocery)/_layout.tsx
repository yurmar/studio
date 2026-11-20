import { Stack } from 'expo-router';

import { ThemeProvider } from '@/themes/ThemeProvider';

export default function Layout() {
  return (
    <ThemeProvider concept="grocery">
      <Stack screenOptions={{ headerShown: false, animation: 'fade', animationDuration: 160 }} />
    </ThemeProvider>
  );
}
