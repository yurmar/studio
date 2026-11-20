import { ReactNode } from 'react';
import { View } from 'react-native';

import { useTheme } from '@/themes/ThemeProvider';

import { Text } from './Text';

interface Props {
  name?: string;
  size?: number;
  color?: string;
  children?: ReactNode;
}

export function Avatar({ name = '', size = 48, color, children }: Props) {
  const t = useTheme();
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('');
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: color ?? t.colors.accentSoft,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {children ?? (
        <Text variant="bodyStrong" accent style={{ fontSize: size * 0.36 }}>
          {initials}
        </Text>
      )}
    </View>
  );
}
