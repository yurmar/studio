import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';

import { Card, Header, Reveal, Screen, Text } from '@/components';
import data from '@/data/habits.json';
import { tabs } from '@/navigation';
import { useTheme } from '@/themes/ThemeProvider';

const WEEKDAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
const TODAY = 20;

export default function Detail() {
  const t = useTheme();
  const d = data.detail;
  const cells: (number | null)[] = [
    ...Array.from({ length: d.monthStartOffset }, () => null),
    ...Array.from({ length: d.days }, (_, i) => i + 1),
  ];
  const rows: (number | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) rows.push(cells.slice(i, i + 7));

  const stats = [
    { label: 'Лучшая серия', value: `${d.best}`, unit: 'дн.' },
    { label: 'Всего отметок', value: `${d.total}`, unit: '' },
    { label: 'Выполнение', value: `${Math.round(d.rate * 100)}`, unit: '%' },
  ];

  return (
    <Screen tabs={tabs.habits}>
      <Header eyebrow="Привычка" title={d.title} action={{ icon: 'ellipsis-horizontal' }} />

      <Reveal index={0}>
        <Card tone="accent" style={{ flexDirection: 'row', alignItems: 'center', gap: t.spacing.md, padding: t.spacing.lg }}>
          <Ionicons name="flame" size={44} color={t.colors.accentText} />
          <View>
            <Text variant="display" color={t.colors.accentText}>{d.streak} дней</Text>
            <Text variant="caption" color={t.colors.accentText} style={{ opacity: 0.85 }}>подряд — отличная серия</Text>
          </View>
        </Card>
      </Reveal>

      <Reveal index={1}>
        <Card>
          <Text variant="heading" style={{ marginBottom: t.spacing.md }}>{d.month}</Text>
          <View style={{ flexDirection: 'row', marginBottom: 6 }}>
            {WEEKDAYS.map((w) => (
              <Text key={w} variant="caption" muted style={{ flex: 1, textAlign: 'center' }}>{w}</Text>
            ))}
          </View>
          {rows.map((row, r) => (
            <View key={r} style={{ flexDirection: 'row' }}>
              {Array.from({ length: 7 }, (_, c) => {
                const day = row[c] ?? null;
                const done = day !== null && d.doneDays.includes(day);
                const today = day === TODAY;
                return (
                  <View key={c} style={{ flex: 1, height: 40, alignItems: 'center', justifyContent: 'center' }}>
                    {day !== null ? (
                      <View
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 18,
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: done ? t.colors.accent : 'transparent',
                          borderWidth: today && !done ? 2 : 0,
                          borderColor: t.colors.accent,
                        }}
                      >
                        <Text variant="caption" color={done ? t.colors.accentText : day > TODAY ? t.colors.textMuted : t.colors.text} style={{ fontFamily: t.fonts.bodyBold }}>
                          {day}
                        </Text>
                      </View>
                    ) : null}
                  </View>
                );
              })}
            </View>
          ))}
        </Card>
      </Reveal>

      <Reveal index={2} style={{ flexDirection: 'row', gap: t.spacing.sm }}>
        {stats.map((s) => (
          <Card key={s.label} style={{ flex: 1, padding: t.spacing.md, gap: 4 }}>
            <Text variant="number">{s.value}<Text variant="caption" muted> {s.unit}</Text></Text>
            <Text variant="caption" muted style={{ fontSize: 12, lineHeight: 16 }}>{s.label}</Text>
          </Card>
        ))}
      </Reveal>

      <Reveal index={3}>
        <Card>
          <Text variant="heading" style={{ marginBottom: t.spacing.md }}>Эта неделя</Text>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', height: 96 }}>
            {d.week.map((w) => (
              <View key={w.day} style={{ alignItems: 'center', gap: 6, flex: 1 }}>
                <View style={{ width: 20, height: 64 * w.value + 8, borderRadius: 10, backgroundColor: w.value >= 1 ? t.colors.accent : t.colors.accentSoft }} />
                <Text variant="caption" muted style={{ fontSize: 12 }}>{w.day}</Text>
              </View>
            ))}
          </View>
        </Card>
      </Reveal>
    </Screen>
  );
}
