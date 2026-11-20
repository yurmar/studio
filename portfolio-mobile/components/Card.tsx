import { ReactNode } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import { useTheme } from '@/themes/ThemeProvider';

interface Props {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  padded?: boolean;
  raised?: boolean;
  tone?: 'surface' | 'alt' | 'accent';
}

export function Card({ children, style, padded = true, raised, tone = 'surface' }: Props) {
  const t = useTheme();
  const background = tone === 'accent' ? t.colors.accent : tone === 'alt' ? t.colors.surfaceAlt : t.colors.surface;
  return (
    <View
      style={[
        {
          backgroundColor: background,
          borderRadius: t.ui.cardRadius,
          borderWidth: t.ui.cardBorder,
          borderColor: t.colors.border,
          padding: padded ? t.spacing.md : 0,
          overflow: 'hidden',
        },
        tone === 'surface' ? (raised ? t.shadow.raised : t.shadow.card) : null,
        style,
      ]}
    >
      {children}
    </View>
  );
}
