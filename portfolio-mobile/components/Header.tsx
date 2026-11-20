import { Ionicons } from '@expo/vector-icons';
import { ComponentProps, ReactNode } from 'react';
import { Pressable, View } from 'react-native';

import { useTheme } from '@/themes/ThemeProvider';

import { Text } from './Text';

type IconName = ComponentProps<typeof Ionicons>['name'];

interface Props {
  title: string;
  eyebrow?: string;
  subtitle?: string;
  right?: ReactNode;
  action?: { icon: IconName; onPress?: () => void };
}

export function Header({ title, eyebrow, subtitle, right, action }: Props) {
  const t = useTheme();
  return (
    <View style={{ paddingTop: t.spacing.md, gap: 6 }}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: t.spacing.md }}>
        <View style={{ flex: 1, gap: 6 }}>
          {eyebrow ? (
            <Text variant="label" accent>
              {eyebrow}
            </Text>
          ) : null}
          <Text variant="title">{title}</Text>
        </View>
        {right}
        {action ? (
          <Pressable
            accessibilityRole="button"
            onPress={action.onPress}
            style={{
              width: 44,
              height: 44,
              borderRadius: t.ui.buttonRadius > 20 ? 22 : t.radius.md,
              backgroundColor: t.colors.surface,
              borderWidth: 1,
              borderColor: t.colors.border,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Ionicons name={action.icon} size={22} color={t.colors.text} />
          </Pressable>
        ) : null}
      </View>
      {subtitle ? (
        <Text variant="caption" muted>
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
}
