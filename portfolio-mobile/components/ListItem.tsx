import { Ionicons } from '@expo/vector-icons';
import { ComponentProps, ReactNode } from 'react';
import { Pressable, StyleProp, View, ViewStyle } from 'react-native';

import { useTheme } from '@/themes/ThemeProvider';

import { Text } from './Text';

interface Props {
  title: string;
  subtitle?: string;
  leading?: ReactNode;
  trailing?: ReactNode;
  chevron?: boolean;
  selected?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export function ListItem({ title, subtitle, leading, trailing, chevron, selected, onPress, style }: Props) {
  const t = useTheme();
  const chevronName: ComponentProps<typeof Ionicons>['name'] = 'chevron-forward';
  return (
    <Pressable
      accessibilityRole={onPress ? 'button' : undefined}
      onPress={onPress}
      style={[
        {
          minHeight: 64,
          flexDirection: 'row',
          alignItems: 'center',
          gap: t.spacing.md,
          padding: t.spacing.md,
          borderRadius: t.ui.cardRadius,
          backgroundColor: t.colors.surface,
          borderWidth: selected ? 2 : t.ui.cardBorder,
          borderColor: selected ? t.colors.accent : t.colors.border,
        },
        !selected && t.shadow.card,
        style,
      ]}
    >
      {leading}
      <View style={{ flex: 1, gap: 2 }}>
        <Text variant="bodyStrong" numberOfLines={1}>
          {title}
        </Text>
        {subtitle ? (
          <Text variant="caption" muted numberOfLines={2}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      {trailing}
      {chevron ? <Ionicons name={chevronName} size={20} color={t.colors.textMuted} /> : null}
    </Pressable>
  );
}
