import { ReactNode } from 'react';
import { Text as RNText, TextProps, TextStyle } from 'react-native';

import { useTheme } from '@/themes/ThemeProvider';

type Variant = 'display' | 'title' | 'heading' | 'body' | 'bodyStrong' | 'caption' | 'label' | 'number';

interface Props extends TextProps {
  variant?: Variant;
  muted?: boolean;
  accent?: boolean;
  color?: string;
  children?: ReactNode;
}

export function Text({ variant = 'body', muted, accent, color, style, ...rest }: Props) {
  const t = useTheme();
  const base: Record<Variant, TextStyle> = {
    display: { fontFamily: t.fonts.numeric, fontSize: t.ui.headingSize + 8, lineHeight: t.ui.headingSize + 14, letterSpacing: t.ui.headingLetterSpacing },
    title: { fontFamily: t.fonts.heading, fontSize: t.ui.headingSize, lineHeight: t.ui.headingSize + 6, letterSpacing: t.ui.headingLetterSpacing },
    heading: { fontFamily: t.fonts.heading, fontSize: 20, lineHeight: 26, letterSpacing: t.ui.headingLetterSpacing / 2 },
    body: { fontFamily: t.fonts.body, fontSize: 16, lineHeight: 24 },
    bodyStrong: { fontFamily: t.fonts.bodyBold, fontSize: 16, lineHeight: 24 },
    caption: { fontFamily: t.fonts.body, fontSize: 14, lineHeight: 20 },
    label: { fontFamily: t.fonts.bodyMedium, fontSize: 12, lineHeight: 16, letterSpacing: 0.6, textTransform: 'uppercase' },
    number: { fontFamily: t.fonts.numeric, fontSize: 24, lineHeight: 30 },
  };
  const tone = color ?? (accent ? t.colors.accent : muted ? t.colors.textMuted : t.colors.text);
  return <RNText {...rest} style={[base[variant], { color: tone }, style]} />;
}
