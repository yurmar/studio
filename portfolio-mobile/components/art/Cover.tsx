import Svg, { Circle, Defs, G, LinearGradient, Path, Rect, Stop } from 'react-native-svg';

export type CoverPattern = 'waves' | 'sun' | 'moon' | 'mountains' | 'forest' | 'lighthouse' | 'rings' | 'rain';

export interface CoverStyle {
  pattern: CoverPattern;
  from: string;
  to: string;
  ink: string;
}

interface Props {
  look: CoverStyle;
  size: number;
  radius?: number;
}

function Pattern({ look }: { look: CoverStyle }) {
  const { ink } = look;
  switch (look.pattern) {
    case 'waves':
      return (
        <G fill="none" stroke={ink} strokeWidth="2.5" strokeLinecap="round" opacity="0.85">
          {[62, 74, 86, 98, 110].map((y, i) => (
            <Path key={y} d={`M-4 ${y} C20 ${y - 12} 40 ${y + 12} 60 ${y} C80 ${y - 12} 100 ${y + 12} 124 ${y}`} opacity={1 - i * 0.14} />
          ))}
          <Circle cx="84" cy="34" r="14" fill={ink} stroke="none" opacity="0.9" />
        </G>
      );
    case 'sun':
      return (
        <G>
          <Circle cx="60" cy="68" r="30" fill={ink} opacity="0.92" />
          <Rect x="0" y="84" width="120" height="36" fill={look.to} opacity="0.65" />
          <G stroke={look.from} strokeWidth="2" opacity="0.5">
            <Path d="M30 92 H90" /><Path d="M38 100 H82" /><Path d="M46 108 H74" />
          </G>
        </G>
      );
    case 'moon':
      return (
        <G>
          <Circle cx="60" cy="54" r="30" fill={ink} opacity="0.95" />
          <Circle cx="72" cy="46" r="26" fill={look.from} />
          <G fill={ink}>
            <Circle cx="24" cy="26" r="2" /><Circle cx="96" cy="22" r="1.6" /><Circle cx="100" cy="64" r="2" /><Circle cx="20" cy="70" r="1.6" /><Circle cx="86" cy="96" r="1.8" />
          </G>
          <Path d="M0 104 C30 92 50 108 80 98 C100 92 112 98 120 96 V120 H0 Z" fill={ink} opacity="0.18" />
        </G>
      );
    case 'mountains':
      return (
        <G>
          <Circle cx="86" cy="34" r="12" fill={ink} opacity="0.9" />
          <Path d="M-4 104 L34 50 L58 84 L82 44 L124 104 Z" fill={ink} opacity="0.35" />
          <Path d="M-4 120 L28 78 L52 104 L80 66 L124 120 Z" fill={ink} opacity="0.7" />
        </G>
      );
    case 'forest':
      return (
        <G fill={ink}>
          {[16, 42, 68, 94].map((x, i) => (
            <Path key={x} d={`M${x} ${112 - i * 4} L${x + 14} ${52 + i * 6} L${x + 28} ${112 - i * 4} Z`} opacity={0.55 + i * 0.1} />
          ))}
          <Circle cx="92" cy="26" r="9" opacity="0.85" />
        </G>
      );
    case 'lighthouse':
      return (
        <G>
          <Path d="M-4 100 C30 90 60 108 90 98 C104 94 114 96 124 98 V120 H-4 Z" fill={ink} opacity="0.5" />
          <Path d="M48 100 L54 48 H70 L76 100 Z" fill={ink} />
          <Rect x="52" y="34" width="22" height="14" rx="3" fill={ink} />
          <Path d="M50 34 L63 24 L76 34 Z" fill={ink} />
          <Path d="M74 40 L124 24 V56 Z" fill={ink} opacity="0.25" />
        </G>
      );
    case 'rings':
      return (
        <G fill="none" stroke={ink} strokeWidth="2.5">
          {[16, 28, 40, 52].map((r, i) => (
            <Circle key={r} cx="60" cy="60" r={r} opacity={0.95 - i * 0.2} />
          ))}
          <Circle cx="60" cy="60" r="6" fill={ink} stroke="none" />
        </G>
      );
    case 'rain':
      return (
        <G stroke={ink} strokeWidth="2.5" strokeLinecap="round" opacity="0.85">
          {[14, 34, 54, 74, 94].map((x, i) => (
            <Path key={x} d={`M${x} ${20 + (i % 2) * 14} l-6 22 M${x + 10} ${64 + (i % 3) * 8} l-6 20`} />
          ))}
          <Path d="M10 100 C30 92 44 108 64 100 C84 92 98 106 116 98" fill="none" />
        </G>
      );
  }
}

/** Собственные обложки: абстрактные иллюстрации без текста и без реальных изданий. */
export function Cover({ look, size, radius = 16 }: Props) {
  const id = `g-${look.pattern}-${look.from.slice(1)}`;
  return (
    <Svg width={size} height={size * 1.5} viewBox="0 0 120 180" style={{ borderRadius: radius }}>
      <Defs>
        <LinearGradient id={id} x1="0" y1="0" x2="0.6" y2="1">
          <Stop offset="0" stopColor={look.from} />
          <Stop offset="1" stopColor={look.to} />
        </LinearGradient>
      </Defs>
      <Rect width="120" height="180" fill={`url(#${id})`} />
      <G transform="translate(0 20)">
        <Pattern look={look} />
      </G>
      <Rect x="0" y="0" width="6" height="180" fill="#000" opacity="0.12" />
    </Svg>
  );
}
