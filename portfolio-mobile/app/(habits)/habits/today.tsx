import { Ionicons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import { Pressable, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withSpring } from 'react-native-reanimated';

import { Card, Header, ProgressRing, Reveal, Screen, Text } from '@/components';
import { IconName } from '@/components/icons';
import data from '@/data/habits.json';
import { tabs } from '@/navigation';
import { useTheme } from '@/themes/ThemeProvider';

function CheckButton({ done, color, onPress }: { done: boolean; color: string; onPress: () => void }) {
  const t = useTheme();
  const scale = useSharedValue(1);
  const style = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked: done }}
      hitSlop={6}
      onPress={() => {
        scale.set(withSequence(withSpring(1.25, { damping: 8 }), withSpring(1)));
        onPress();
      }}
      style={{ width: 44, height: 44, alignItems: 'center', justifyContent: 'center' }}
    >
      <Animated.View
        style={[
          style,
          {
            width: 32,
            height: 32,
            borderRadius: 16,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: done ? color : 'transparent',
            borderWidth: 2,
            borderColor: done ? color : t.colors.border,
          },
        ]}
      >
        {done ? <Ionicons name="checkmark" size={20} color="#FFFFFF" /> : null}
      </Animated.View>
    </Pressable>
  );
}

export default function Today() {
  const t = useTheme();
  const [done, setDone] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(data.habits.map((h) => [h.id, h.done])),
  );
  const count = useMemo(() => Object.values(done).filter(Boolean).length, [done]);
  const total = data.habits.length;

  return (
    <Screen tabs={tabs.habits}>
      <Header eyebrow="Пятница, 20 ноября" title={`Привет, ${data.user.name}`} action={{ icon: 'notifications-outline' }} />

      <Reveal index={0}>
        <Card raised style={{ flexDirection: 'row', alignItems: 'center', gap: t.spacing.lg, padding: t.spacing.lg }}>
          <ProgressRing progress={count / total} size={112} stroke={12}>
            <Text variant="number">{Math.round((count / total) * 100)}%</Text>
          </ProgressRing>
          <View style={{ flex: 1, gap: 6 }}>
            <Text variant="heading">{count} из {total} сделано</Text>
            <Text variant="caption" muted>
              {count === total ? 'Все привычки на сегодня выполнены' : 'Ещё немного — вы уже на хорошем пути'}
            </Text>
          </View>
        </Card>
      </Reveal>

      <View style={{ gap: t.spacing.sm }}>
        <Text variant="heading">Привычки дня</Text>
        {data.habits.map((habit, i) => {
          const color = t.colors.tones[habit.tone];
          return (
            <Reveal key={habit.id} index={i + 1}>
              <Card style={{ flexDirection: 'row', alignItems: 'center', gap: t.spacing.md, paddingVertical: 10 }}>
                <View style={{ width: 48, height: 48, borderRadius: 16, backgroundColor: color + '33', alignItems: 'center', justifyContent: 'center' }}>
                  <Ionicons name={habit.icon as IconName} size={24} color={color} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text variant="bodyStrong" numberOfLines={1} style={{ textDecorationLine: done[habit.id] ? 'line-through' : 'none', opacity: done[habit.id] ? 0.55 : 1 }}>
                    {habit.title}
                  </Text>
                  <Text variant="caption" muted>
                    {habit.time} · серия {habit.streak} дн.
                  </Text>
                </View>
                <CheckButton done={!!done[habit.id]} color={color} onPress={() => setDone((p) => ({ ...p, [habit.id]: !p[habit.id] }))} />
              </Card>
            </Reveal>
          );
        })}
      </View>
    </Screen>
  );
}
