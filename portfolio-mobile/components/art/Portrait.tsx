import Svg, { Circle, Ellipse, Path, Rect } from 'react-native-svg';

export interface PortraitLook {
  skin: string;
  hair: string;
  shirt: string;
  background: string;
  beard?: boolean;
  /** 0 — короткая стрижка, 1 — зачёс, 2 — длинные волосы, 3 — лысый. */
  hairStyle: 0 | 1 | 2 | 3;
  glasses?: boolean;
}

interface Props {
  look: PortraitLook;
  size: number;
  square?: boolean;
}

/** Собственная векторная иллюстрация мастера: стилизованный портрет без реальных лиц. */
export function Portrait({ look, size, square }: Props) {
  const { skin, hair, shirt, background, beard, hairStyle, glasses } = look;
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120">
      <Rect width="120" height="120" rx={square ? 0 : 60} fill={background} />
      {hairStyle === 2 ? <Path d="M32 62 C28 30 46 18 60 18 C76 18 94 30 88 62 L88 96 L32 96 Z" fill={hair} /> : null}
      <Path d="M18 120 C20 94 38 86 60 86 C82 86 100 94 102 120 Z" fill={shirt} />
      <Rect x="51" y="70" width="18" height="22" rx="8" fill={skin} />
      <Ellipse cx="60" cy="52" rx="23" ry="27" fill={skin} />
      <Ellipse cx="37" cy="54" rx="4" ry="7" fill={skin} />
      <Ellipse cx="83" cy="54" rx="4" ry="7" fill={skin} />
      {hairStyle === 0 ? <Path d="M36 46 C34 26 48 22 60 22 C74 22 86 28 84 46 C78 38 70 34 60 34 C50 34 42 38 36 46 Z" fill={hair} /> : null}
      {hairStyle === 1 ? <Path d="M35 48 C30 26 50 16 66 20 C82 22 90 34 84 48 C80 40 74 32 60 32 C48 32 40 38 35 48 Z" fill={hair} /> : null}
      {hairStyle === 2 ? <Path d="M36 50 C36 30 46 26 60 26 C74 26 84 30 84 50 C78 40 70 36 60 36 C50 36 42 40 36 50 Z" fill={hair} /> : null}
      {beard ? <Path d="M38 56 C38 80 48 86 60 86 C72 86 82 80 82 56 C78 70 70 72 60 72 C50 72 42 70 38 56 Z" fill={hair} /> : null}
      <Circle cx="51" cy="54" r="2.4" fill="#2A2420" />
      <Circle cx="69" cy="54" r="2.4" fill="#2A2420" />
      <Path d="M53 68 C57 71 63 71 67 68" stroke={beard ? skin : '#9A5E4C'} strokeWidth="2.2" strokeLinecap="round" fill="none" />
      {glasses ? (
        <>
          <Rect x="42" y="47" width="16" height="12" rx="4" stroke="#2A2420" strokeWidth="2" fill="none" />
          <Rect x="62" y="47" width="16" height="12" rx="4" stroke="#2A2420" strokeWidth="2" fill="none" />
          <Path d="M58 53 H62" stroke="#2A2420" strokeWidth="2" />
        </>
      ) : null}
    </Svg>
  );
}
