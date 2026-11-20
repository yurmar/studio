import { Ionicons } from '@expo/vector-icons';
import { Href, usePathname, useRouter } from 'expo-router';
import { ComponentProps } from 'react';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '@/themes/ThemeProvider';

import { Text } from './Text';

type IconName = ComponentProps<typeof Ionicons>['name'];

export interface TabItem {
  label: string;
  icon: IconName;
  activeIcon: IconName;
  href: Href;
  path: string;
}

export const TAB_BAR_HEIGHT = 72;

export function TabBar({ items }: { items: TabItem[] }) {
  const t = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const bottom = Math.max(insets.bottom, 12);

  return (
    <View
      style={[
        {
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          paddingBottom: bottom,
          paddingTop: 8,
          paddingHorizontal: 8,
          flexDirection: 'row',
          backgroundColor: t.colors.surface,
          borderTopWidth: 1,
          borderTopColor: t.colors.border,
        },
        t.shadow.raised,
      ]}
    >
      {items.map((item) => {
        const active = pathname === item.path;
        const color = active ? t.colors.accent : t.colors.textMuted;
        return (
          <Pressable
            key={item.label}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            onPress={() => router.replace(item.href)}
            style={{ flex: 1, minHeight: 48, alignItems: 'center', justifyContent: 'center', gap: 3 }}
          >
            <View
              style={{
                width: 48,
                height: 28,
                borderRadius: t.radius.pill,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: active ? t.colors.accentSoft : 'transparent',
              }}
            >
              <Ionicons name={active ? item.activeIcon : item.icon} size={20} color={color} />
            </View>
            <Text variant="caption" color={color} style={{ fontSize: 11, lineHeight: 14, fontFamily: active ? t.fonts.bodyBold : t.fonts.bodyMedium }}>
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
