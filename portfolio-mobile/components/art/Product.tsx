import Svg, { Circle, Defs, Ellipse, G, LinearGradient, Path, RadialGradient, Rect, Stop } from 'react-native-svg';

export type ProductKind =
  | 'apple' | 'orange' | 'tomato' | 'avocado' | 'bread' | 'milk'
  | 'cheese' | 'eggs' | 'carrot' | 'strawberry' | 'banana' | 'broccoli';

interface Props {
  kind: ProductKind;
  size: number;
  background: string;
  /** Скругление подложки; 0 — без подложки по краям. */
  radius?: number;
}

const Shine = ({ id, color }: { id: string; color: string }) => (
  <Defs>
    <RadialGradient id={id} cx="35%" cy="30%" r="80%">
      <Stop offset="0" stopColor="#FFFFFF" stopOpacity="0.55" />
      <Stop offset="0.35" stopColor={color} stopOpacity="0" />
    </RadialGradient>
  </Defs>
);

function Art({ kind }: { kind: ProductKind }) {
  switch (kind) {
    case 'apple':
      return (
        <G>
          <Ellipse cx="60" cy="108" rx="30" ry="5" fill="#000" opacity="0.08" />
          <Path d="M60 36 C44 26 22 36 24 64 C26 90 44 106 60 100 C76 106 94 90 96 64 C98 36 76 26 60 36 Z" fill="#D9473B" />
          <Path d="M60 36 C44 26 22 36 24 64 C26 90 44 106 60 100 Z" fill="#E86A55" opacity="0.55" />
          <Path d="M60 38 C60 28 64 20 70 14" stroke="#5A3A26" strokeWidth="4" strokeLinecap="round" fill="none" />
          <Path d="M64 26 C74 14 90 16 92 22 C86 32 72 34 64 26 Z" fill="#6FA84A" />
          <Ellipse cx="42" cy="54" rx="7" ry="11" fill="#FFFFFF" opacity="0.28" transform="rotate(20 42 54)" />
        </G>
      );
    case 'orange':
      return (
        <G>
          <Ellipse cx="60" cy="108" rx="32" ry="5" fill="#000" opacity="0.08" />
          <Circle cx="60" cy="62" r="40" fill="#F58A1F" />
          <Circle cx="60" cy="62" r="40" fill="#FFB04D" opacity="0.4" transform="translate(-6 -6)" />
          <Path d="M60 22 C66 12 78 12 84 18 C76 26 66 28 60 22 Z" fill="#5E9B3E" />
          <Ellipse cx="44" cy="48" rx="8" ry="12" fill="#FFFFFF" opacity="0.28" transform="rotate(25 44 48)" />
          <G fill="#E0760F" opacity="0.5">
            <Circle cx="70" cy="64" r="1.6" /><Circle cx="52" cy="76" r="1.6" /><Circle cx="76" cy="82" r="1.6" />
            <Circle cx="62" cy="52" r="1.6" /><Circle cx="86" cy="58" r="1.6" /><Circle cx="44" cy="64" r="1.6" />
          </G>
        </G>
      );
    case 'tomato':
      return (
        <G>
          <Ellipse cx="60" cy="108" rx="34" ry="5" fill="#000" opacity="0.08" />
          <Path d="M60 30 C30 24 14 50 20 74 C26 98 46 104 60 104 C74 104 94 98 100 74 C106 50 90 24 60 30 Z" fill="#E24A33" />
          <Path d="M60 30 C30 24 14 50 20 74 C26 98 46 104 60 104 Z" fill="#F06A4F" opacity="0.5" />
          <Path d="M60 34 L48 24 L56 32 L46 38 L58 38 L60 30 L64 38 L76 38 L66 32 L74 24 Z" fill="#4F8C3A" />
          <Ellipse cx="38" cy="58" rx="7" ry="11" fill="#FFFFFF" opacity="0.28" transform="rotate(20 38 58)" />
        </G>
      );
    case 'avocado':
      return (
        <G>
          <Ellipse cx="60" cy="110" rx="26" ry="4" fill="#000" opacity="0.08" />
          <Path d="M60 10 C44 10 38 34 30 58 C20 86 38 108 60 108 C82 108 100 86 90 58 C82 34 76 10 60 10 Z" fill="#3C6B2A" />
          <Path d="M60 18 C48 18 44 38 38 58 C30 82 44 100 60 100 C76 100 90 82 82 58 C76 38 72 18 60 18 Z" fill="#B7D56A" />
          <Path d="M60 30 C52 30 50 44 46 58 C40 78 50 92 60 92 C70 92 80 78 74 58 C70 44 68 30 60 30 Z" fill="#D8E792" />
          <Circle cx="60" cy="72" r="17" fill="#8A5A36" />
          <Ellipse cx="54" cy="66" rx="5" ry="7" fill="#FFFFFF" opacity="0.25" />
        </G>
      );
    case 'bread':
      return (
        <G>
          <Ellipse cx="60" cy="102" rx="42" ry="6" fill="#000" opacity="0.08" />
          <Path d="M18 62 C14 36 36 22 60 22 C84 22 106 36 102 62 C100 70 96 72 96 76 L96 92 C96 98 92 100 86 100 L34 100 C28 100 24 98 24 92 L24 76 C24 72 20 70 18 62 Z" fill="#C98A47" />
          <Path d="M24 62 C22 42 40 30 60 30 C80 30 98 42 96 62 Z" fill="#E0A862" />
          <G stroke="#B97A3A" strokeWidth="4" strokeLinecap="round" fill="none">
            <Path d="M40 42 L50 56" /><Path d="M58 38 L68 54" /><Path d="M76 42 L84 56" />
          </G>
          <Ellipse cx="40" cy="38" rx="9" ry="4" fill="#FFFFFF" opacity="0.28" transform="rotate(-20 40 38)" />
        </G>
      );
    case 'milk':
      return (
        <G>
          <Ellipse cx="60" cy="110" rx="28" ry="4" fill="#000" opacity="0.08" />
          <Path d="M40 18 L80 18 L84 36 L84 100 C84 104 82 106 78 106 L42 106 C38 106 36 104 36 100 L36 36 Z" fill="#F4F7FA" />
          <Path d="M36 36 L84 36 L80 18 L40 18 Z" fill="#8EC1E6" />
          <Path d="M36 36 L60 36 L60 106 L42 106 C38 106 36 104 36 100 Z" fill="#DDE6EE" opacity="0.7" />
          <Rect x="44" y="52" width="32" height="30" rx="8" fill="#8EC1E6" />
          <Path d="M52 72 C52 62 60 58 60 58 C60 58 68 62 68 72 C68 77 64 79 60 79 C56 79 52 77 52 72 Z" fill="#FFFFFF" />
        </G>
      );
    case 'cheese':
      return (
        <G>
          <Ellipse cx="60" cy="102" rx="42" ry="6" fill="#000" opacity="0.08" />
          <Path d="M14 70 L74 28 L106 52 L106 88 C106 92 102 96 96 96 L22 96 C16 96 14 92 14 88 Z" fill="#F2C14E" />
          <Path d="M14 70 L74 28 L106 52 L106 62 L22 62 Z" fill="#F8D57C" />
          <Path d="M14 70 L22 62 L106 62 L106 52 L74 28 Z" fill="#FADE92" opacity="0.5" />
          <G fill="#E0A630">
            <Circle cx="40" cy="80" r="7" /><Circle cx="68" cy="84" r="5" /><Circle cx="88" cy="76" r="6" />
            <Circle cx="56" cy="70" r="3" />
          </G>
        </G>
      );
    case 'eggs':
      return (
        <G>
          <Ellipse cx="60" cy="102" rx="42" ry="6" fill="#000" opacity="0.08" />
          <Path d="M16 66 L104 66 L98 96 C97 100 94 102 90 102 L30 102 C26 102 23 100 22 96 Z" fill="#C9B38C" />
          <Ellipse cx="38" cy="62" rx="15" ry="20" fill="#F7EBD6" />
          <Ellipse cx="62" cy="58" rx="15" ry="21" fill="#FBF3E4" />
          <Ellipse cx="86" cy="62" rx="15" ry="20" fill="#F2E3C8" />
          <Ellipse cx="57" cy="48" rx="4" ry="8" fill="#FFFFFF" opacity="0.7" />
          <Path d="M16 66 L104 66 L102 76 L18 76 Z" fill="#B8A37C" />
        </G>
      );
    case 'carrot':
      return (
        <G>
          <Ellipse cx="60" cy="110" rx="26" ry="4" fill="#000" opacity="0.08" />
          <Path d="M52 22 C46 8 38 6 34 10 C40 12 46 18 50 26 Z M60 22 C60 6 66 2 72 4 C68 10 66 16 66 26 Z M66 26 C74 12 84 12 88 16 C80 18 74 24 70 30 Z" fill="#5E9B3E" />
          <Path d="M42 28 C56 22 80 26 86 38 C90 46 78 62 60 86 C52 98 46 108 42 104 C38 100 32 84 30 60 C28 42 32 32 42 28 Z" fill="#F07C1F" transform="rotate(-18 60 60)" />
          <G stroke="#C95F0F" strokeWidth="2" strokeLinecap="round" opacity="0.5">
            <Path d="M50 52 L58 54" /><Path d="M46 70 L54 72" /><Path d="M56 40 L64 42" />
          </G>
          <Ellipse cx="46" cy="44" rx="4" ry="12" fill="#FFFFFF" opacity="0.25" transform="rotate(-18 46 44)" />
        </G>
      );
    case 'strawberry':
      return (
        <G>
          <Ellipse cx="60" cy="108" rx="28" ry="5" fill="#000" opacity="0.08" />
          <Path d="M60 98 C36 88 22 64 24 46 C26 32 40 28 60 34 C80 28 94 32 96 46 C98 64 84 88 60 98 Z" fill="#E2394B" />
          <Path d="M60 98 C36 88 22 64 24 46 C26 32 40 28 60 34 Z" fill="#EE5A68" opacity="0.5" />
          <Path d="M60 36 L44 28 L52 38 L38 40 L52 44 L60 52 L68 44 L82 40 L68 38 L76 28 Z" fill="#5E9B3E" />
          <G fill="#F9D86B">
            <Ellipse cx="44" cy="58" rx="2" ry="3" /><Ellipse cx="60" cy="62" rx="2" ry="3" /><Ellipse cx="76" cy="58" rx="2" ry="3" />
            <Ellipse cx="52" cy="74" rx="2" ry="3" /><Ellipse cx="68" cy="74" rx="2" ry="3" /><Ellipse cx="60" cy="86" rx="2" ry="3" />
          </G>
        </G>
      );
    case 'banana':
      return (
        <G>
          <Ellipse cx="60" cy="106" rx="38" ry="5" fill="#000" opacity="0.08" />
          <Path d="M18 36 C20 74 48 100 92 94 C100 92 102 84 96 82 C62 84 40 66 34 34 Z" fill="#F4CB3D" />
          <Path d="M18 36 C20 74 48 100 92 94 C80 82 52 76 34 34 Z" fill="#E7B72A" opacity="0.7" />
          <Path d="M18 36 L26 22 L38 28 L34 34 Z" fill="#7A5B2E" />
          <Path d="M92 94 C98 94 102 88 98 82" stroke="#5A4120" strokeWidth="4" strokeLinecap="round" fill="none" />
          <Path d="M30 50 C36 70 52 82 70 86" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.35" fill="none" />
        </G>
      );
    case 'broccoli':
      return (
        <G>
          <Ellipse cx="60" cy="110" rx="30" ry="4" fill="#000" opacity="0.08" />
          <Path d="M52 70 L50 104 C50 108 70 108 70 104 L68 70 Z" fill="#9CC46B" />
          <G fill="#3F8A3C">
            <Circle cx="38" cy="52" r="20" /><Circle cx="60" cy="38" r="22" /><Circle cx="82" cy="52" r="20" />
            <Circle cx="48" cy="66" r="16" /><Circle cx="72" cy="66" r="16" />
          </G>
          <G fill="#5BAA54" opacity="0.8">
            <Circle cx="34" cy="46" r="8" /><Circle cx="56" cy="30" r="9" /><Circle cx="80" cy="44" r="8" /><Circle cx="62" cy="56" r="8" />
          </G>
        </G>
      );
  }
}

/** Собственная иллюстрация продукта; заменяет фотографии, чтобы не зависеть от лицензий. */
export function Product({ kind, size, background, radius = 0 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120">
      <Shine id="shine" color={background} />
      <Rect width="120" height="120" rx={radius} fill={background} />
      <Circle cx="60" cy="64" r="48" fill="#FFFFFF" opacity="0.38" />
      <LinearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
        <Stop offset="0" stopColor="#FFFFFF" stopOpacity="0" />
        <Stop offset="1" stopColor="#000000" stopOpacity="0.04" />
      </LinearGradient>
      <Rect y="84" width="120" height="36" fill="url(#floor)" />
      <Art kind={kind} />
    </Svg>
  );
}
