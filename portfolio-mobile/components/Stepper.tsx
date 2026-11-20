import { Ionicons } from '@expo/vector-icons';
import { Pressable, View } from 'react-native';

import { useTheme } from '@/themes/ThemeProvider';

import { Text } from './Text';

interface Props {
  value: number;
  onChange: (value: number) => void;
  min?: number;
}

export function Stepper({ value, onChange, min = 0 }: Props) {
  const t = useTheme();
  const button = (icon: 'add' | 'remove', next: number, filled: boolean) => (
    <Pressable
      accessibilityRole="button"
      onPress={() => onChange(Math.max(min, next))}
      style={{ width: 44, height: 44, alignItems: 'center', justifyContent: 'center' }}
    >
      <View
        style={{
          width: 32,
          height: 32,
          borderRadius: t.radius.md,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: filled ? t.colors.accent : t.colors.accentSoft,
        }}
      >
        <Ionicons name={icon} size={18} color={filled ? t.colors.accentText : t.colors.accent} />
      </View>
    </Pressable>
  );
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {button('remove', value - 1, false)}
      <Text variant="bodyStrong" style={{ minWidth: 24, textAlign: 'center' }}>{value}</Text>
      {button('add', value + 1, true)}
    </View>
  );
}
