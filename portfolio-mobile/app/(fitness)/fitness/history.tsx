import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { View, useWindowDimensions } from 'react-native';

import { Card, Chip, Header, LoadChart, Reveal, Screen, Text } from '@/components';
import data from '@/data/fitness.json';
import { tabs } from '@/navigation';
import { useTheme } from '@/themes/ThemeProvider';

export default function History() {
  const t = useTheme();
  const { width } = useWindowDimensions();
  const [range, setRange] = useState('Месяц');
  const h = data.history;
  const chartWidth = Math.min(width, 430) - t.spacing.gutter * 2 - t.spacing.md * 2;

  return (
    <Screen tabs={tabs.fitness}>
      <Header eyebrow="Нагрузка, тонн в неделю" title="История" />

      <Reveal index={0} style={{ flexDirection: 'row', gap: t.spacing.sm }}>
        {h.range.map((r) => (
          <Chip key={r} label={r} selected={range === r} onPress={() => setRange(r)} style={{ flex: 1 }} />
        ))}
      </Reveal>

      <Reveal index={1}>
        <Card raised style={{ gap: t.spacing.sm }}>
          <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 8 }}>
            <Text variant="display" style={{ fontSize: 36 }}>15,1<Text variant="heading" muted> т</Text></Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
              <Ionicons name="arrow-up" size={14} color={t.colors.success} />
              <Text variant="caption" color={t.colors.success} style={{ fontFamily: t.fonts.bodyBold }}>+6%</Text>
            </View>
          </View>
          <Text variant="caption" muted>на прошлой неделе — 14,2 т</Text>
          <LoadChart values={h.volume} labels={h.labels} width={chartWidth} height={196} />
        </Card>
      </Reveal>

      <Reveal index={2} style={{ flexDirection: 'row', gap: t.spacing.sm }}>
        {h.stats.map((s) => (
          <Card key={s.label} style={{ flex: 1, padding: t.spacing.md, gap: 2 }}>
            <Text variant="number" style={{ fontSize: 22 }} numberOfLines={1}>{s.value}</Text>
            <Text variant="caption" muted style={{ fontSize: 12, lineHeight: 16 }} numberOfLines={1}>{s.unit}</Text>
          </Card>
        ))}
      </Reveal>

      <View style={{ gap: t.spacing.sm }}>
        <Text variant="heading">Недавние</Text>
        {h.recent.map((r, i) => (
          <Reveal key={r.title} index={i + 3}>
            <Card style={{ flexDirection: 'row', alignItems: 'center', gap: t.spacing.md, paddingVertical: 12 }}>
              <View style={{ width: 44, height: 44, borderRadius: t.radius.md, backgroundColor: t.colors.accentSoft, alignItems: 'center', justifyContent: 'center' }}>
                <Ionicons name={r.icon as 'barbell'} size={22} color={t.colors.accent} />
              </View>
              <View style={{ flex: 1 }}>
                <Text variant="bodyStrong" numberOfLines={1}>{r.title}</Text>
                <Text variant="caption" muted>{r.date} · {r.meta}</Text>
              </View>
            </Card>
          </Reveal>
        ))}
      </View>
    </Screen>
  );
}
