import { View } from 'react-native';
import Svg, { Circle, Defs, G, Line, LinearGradient, Path, Rect, Stop, Text as SvgText } from 'react-native-svg';

import { useTheme } from '@/themes/ThemeProvider';

interface Props {
  values: number[];
  labels: string[];
  width: number;
  height?: number;
  highlight?: number;
}

/** График нагрузки: столбцы по неделям и сглаженная линия тренда (SVG). */
export function LoadChart({ values, labels, width, height = 200, highlight = values.length - 1 }: Props) {
  const t = useTheme();
  const padL = 28;
  const padR = 8;
  const padT = 16;
  const padB = 28;
  const innerW = width - padL - padR;
  const innerH = height - padT - padB;
  const max = Math.ceil(Math.max(...values) / 5) * 5;
  const step = innerW / values.length;
  const barW = Math.min(22, step * 0.56);
  const y = (v: number) => padT + innerH - (v / max) * innerH;
  const x = (i: number) => padL + step * i + step / 2;

  const points = values.map((v, i) => ({ x: x(i), y: y(v) }));
  const line = points
    .map((p, i) => {
      if (i === 0) return `M${p.x} ${p.y}`;
      const prev = points[i - 1];
      const cx = (prev.x + p.x) / 2;
      return `C${cx} ${prev.y} ${cx} ${p.y} ${p.x} ${p.y}`;
    })
    .join(' ');
  const area = `${line} L${points[points.length - 1].x} ${padT + innerH} L${points[0].x} ${padT + innerH} Z`;
  const ticks = [0, max / 2, max];

  return (
    <View style={{ width, height }}>
      <Svg width={width} height={height}>
        <Defs>
          <LinearGradient id="area" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={t.colors.accent} stopOpacity="0.28" />
            <Stop offset="1" stopColor={t.colors.accent} stopOpacity="0" />
          </LinearGradient>
        </Defs>
        {ticks.map((tick) => (
          <G key={tick}>
            <Line x1={padL} x2={width - padR} y1={y(tick)} y2={y(tick)} stroke={t.colors.border} strokeWidth="1" strokeDasharray="4 6" />
            <SvgText x={0} y={y(tick) + 4} fill={t.colors.textMuted} fontSize="11" fontFamily={t.fonts.body}>{tick}</SvgText>
          </G>
        ))}
        {values.map((v, i) => (
          <Rect
            key={labels[i]}
            x={x(i) - barW / 2}
            y={y(v)}
            width={barW}
            height={padT + innerH - y(v)}
            rx={8}
            fill={i === highlight ? t.colors.accent : t.colors.surfaceAlt}
          />
        ))}
        <Path d={area} fill="url(#area)" />
        <Path d={line} stroke={t.colors.accent} strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.9" />
        <Circle cx={points[highlight].x} cy={points[highlight].y} r="5" fill={t.colors.bg} stroke={t.colors.accent} strokeWidth="3" />
        {labels.map((label, i) =>
          i % 2 === (values.length - 1) % 2 ? (
            <SvgText key={label} x={x(i)} y={height - 8} fill={i === highlight ? t.colors.text : t.colors.textMuted} fontSize="11" fontFamily={t.fonts.bodyMedium} textAnchor="middle">
              {label}
            </SvgText>
          ) : null,
        )}
      </Svg>
    </View>
  );
}
