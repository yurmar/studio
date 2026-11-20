import { StatusBar } from 'expo-status-bar';
import { ReactNode } from 'react';
import { ScrollView, StyleProp, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '@/themes/ThemeProvider';

import { TAB_BAR_HEIGHT, TabBar, TabItem } from './TabBar';

interface Props {
  children: ReactNode;
  tabs?: TabItem[];
  scroll?: boolean;
  contentStyle?: StyleProp<ViewStyle>;
  /** Контент, закреплённый над нижней навигацией (например, кнопка). */
  footer?: ReactNode;
}

export function Screen({ children, tabs, scroll = true, contentStyle, footer }: Props) {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const bottomBar = tabs ? TAB_BAR_HEIGHT + Math.max(insets.bottom, 12) - 12 : insets.bottom;
  const footerHeight = footer ? 88 : 0;

  const padding: ViewStyle = {
    paddingTop: insets.top,
    paddingHorizontal: t.spacing.gutter,
    paddingBottom: bottomBar + footerHeight + t.spacing.lg,
    gap: t.spacing.lg,
  };

  return (
    <View style={{ flex: 1, backgroundColor: t.colors.bg }}>
      <StatusBar style={t.scheme === 'dark' ? 'light' : 'dark'} />
      {scroll ? (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[padding, contentStyle]}>
          {children}
        </ScrollView>
      ) : (
        <View style={[{ flex: 1 }, padding, contentStyle]}>{children}</View>
      )}
      {footer ? (
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: bottomBar,
            paddingHorizontal: t.spacing.gutter,
            paddingTop: t.spacing.sm,
            paddingBottom: t.spacing.md,
            backgroundColor: t.colors.bg,
          }}
        >
          {footer}
        </View>
      ) : null}
      {tabs ? <TabBar items={tabs} /> : null}
    </View>
  );
}
