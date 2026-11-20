import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

import { Button, Card, Header, ProgressRing, Reveal, Screen, Text } from '@/components';
import data from '@/data/fitness.json';
import { tabs } from '@/navigation';
import { useTheme } from '@/themes/ThemeProvider';

const clock = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

export default function Workout() {
  const t = useTheme();
  const w = data.workout;
  const [left, setLeft] = useState(w.restLeft);

  useEffect(() => {
    const id = setInterval(() => setLeft((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <Screen
      tabs={tabs.fitness}
      footer={
        <View style={{ flexDirection: 'row', gap: t.spacing.sm }}>
          <Button title="+30 с" variant="secondary" onPress={() => setLeft((s) => s + 30)} style={{ width: 104, paddingHorizontal: 8 }} />
          <Button title="Пропустить отдых" icon="play-skip-forward" style={{ flex: 1 }} onPress={() => setLeft(0)} />
        </View>
      }
    >
      <Header eyebrow={`Упражнение 3 из ${data.today.exercises}`} title={w.exercise} subtitle={w.muscle} />

      <Reveal index={0} style={{ alignItems: 'center' }}>
        <ProgressRing progress={left / w.restSeconds} size={200} stroke={14}>
          <Text variant="label" muted>Отдых</Text>
          <Text variant="display" style={{ fontSize: 44, lineHeight: 52 }}>{clock(left)}</Text>
          <Text variant="caption" muted>Подход {w.setIndex} из {w.setTotal}</Text>
        </ProgressRing>
      </Reveal>

      <Reveal index={1} style={{ flexDirection: 'row', gap: t.spacing.sm }}>
        <Card style={{ flex: 1, gap: 2 }}>
          <Text variant="caption" muted>Повторы</Text>
          <Text variant="number">{w.reps}</Text>
        </Card>
        <Card style={{ flex: 1, gap: 2 }}>
          <Text variant="caption" muted>Вес</Text>
          <Text variant="number">{w.weight} <Text variant="caption" muted>кг</Text></Text>
        </Card>
      </Reveal>

      <Reveal index={2} style={{ gap: t.spacing.sm }}>
        {w.sets.map((s) => (
          <View key={s.n} style={{ height: 52, flexDirection: 'row', alignItems: 'center', gap: t.spacing.md, paddingHorizontal: t.spacing.md, borderRadius: t.radius.lg, backgroundColor: s.state === 'active' ? t.colors.accentSoft : t.colors.surface }}>
            <View style={{ width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: s.state === 'done' ? t.colors.accent : 'transparent', borderWidth: s.state === 'done' ? 0 : 2, borderColor: s.state === 'active' ? t.colors.accent : t.colors.border }}>
              {s.state === 'done' ? <Ionicons name="checkmark" size={16} color={t.colors.accentText} /> : <Text variant="caption" style={{ fontSize: 12, lineHeight: 16 }} muted>{s.n}</Text>}
            </View>
            <Text variant="bodyStrong" style={{ flex: 1 }} muted={s.state === 'next'}>{s.reps} × {s.weight} кг</Text>
            {s.state === 'active' ? <Text variant="label" accent>Сейчас</Text> : null}
          </View>
        ))}
      </Reveal>
    </Screen>
  );
}
