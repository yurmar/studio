import { Ionicons } from '@expo/vector-icons';
import { ComponentProps } from 'react';
import { Pressable, StyleProp, ViewStyle } from 'react-native';

import { useTheme } from '@/themes/ThemeProvider';

import { Text } from './Text';

interface Props {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  icon?: ComponentProps<typeof Ionicons>['name'];
  style?: StyleProp<ViewStyle>;
}

export function Chip({ label, selected, onPress, icon, style }: Props) {
  const t = useTheme();
  const fg = selected ? t.colors.accentText : t.colors.text;
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={[
        {
          minHeight: 44,
          paddingHorizontal: t.spacing.md,
          borderRadius: t.ui.chipRadius,
          backgroundColor: selected ? t.colors.accent : t.colors.surface,
          borderWidth: 1,
          borderColor: selected ? t.colors.accent : t.colors.border,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
        },
        style,
      ]}
    >
      {icon ? <Ionicons name={icon} size={16} color={fg} /> : null}
      <Text variant="caption" color={fg} style={{ fontFamily: t.fonts.bodyBold }} numberOfLines={1}>
        {label}
      </Text>
    </Pressable>
  );
}
