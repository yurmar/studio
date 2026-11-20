export type Scheme = 'light' | 'dark';

export interface Palette {
  bg: string;
  surface: string;
  surfaceAlt: string;
  text: string;
  textMuted: string;
  accent: string;
  accentText: string;
  accentSoft: string;
  border: string;
  success: string;
  danger: string;
  /** Дополнительные оттенки для иллюстраций и меток. */
  tones: string[];
}

export interface Shadow {
  shadowColor: string;
  shadowOffset: { width: number; height: number };
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
}

export interface Theme {
  name: string;
  scheme: Scheme;
  colors: Palette;
  fonts: { heading: string; headingBold: string; numeric: string; body: string; bodyMedium: string; bodyBold: string };
  radius: { sm: number; md: number; lg: number; xl: number; pill: number };
  spacing: { xs: number; sm: number; md: number; lg: number; xl: number; xxl: number; gutter: number };
  shadow: { card: Shadow; raised: Shadow };
  /** Особенности оформления компонентов в концепте. */
  ui: {
    cardRadius: number;
    cardBorder: number;
    buttonRadius: number;
    buttonHeight: number;
    buttonUppercase: boolean;
    headingSize: number;
    headingLetterSpacing: number;
    chipRadius: number;
  };
}

export interface ThemeSpec extends Omit<Theme, 'colors' | 'scheme'> {
  light: Palette;
  dark: Palette;
  /** Схема, в которой концепт показывается по умолчанию в портфолио. */
  signature: Scheme;
}

export const makeShadow = (color: string, opacity: number, radius: number, y: number): Shadow => ({
  shadowColor: color,
  shadowOffset: { width: 0, height: y },
  shadowOpacity: opacity,
  shadowRadius: radius,
  elevation: Math.round(radius / 2),
});

export const resolveTheme = (spec: ThemeSpec, scheme: Scheme): Theme => {
  const { light, dark, signature: _signature, ...rest } = spec;
  return { ...rest, scheme, colors: scheme === 'dark' ? dark : light };
};
