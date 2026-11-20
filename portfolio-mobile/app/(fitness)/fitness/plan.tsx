import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { View } from 'react-native';

import { Button, Card, Header, Reveal, Screen, Text } from '@/components';
import data from '@/data/fitness.json';
import { tabs } from '@/navigation';
import { useTheme } from '@/themes/ThemeProvider';

export default function Plan() {
  const t = useTheme();
  const router = useRouter();

  return (
    <Screen tabs={tabs.fitness}>
      <Header eyebrow="16 – 22 ноября" title="План недели" action={{ icon: 'add' }} />

      <Reveal index={0} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        {data.week.map((d) => {
          const today = d.state === 'today';
          return (
            <View key={d.id} style={{ width: 46, height: 76, borderRadius: t.radius.lg, alignItems: 'center', justifyContent: 'center', gap: 4, backgroundColor: today ? t.colors.accent : t.colors.surface }}>
              <Text variant="caption" color={today ? t.colors.accentText : t.colors.textMuted} style={{ fontSize: 12, lineHeight: 16 }}>{d.dow}</Text>
              <Text variant="bodyStrong" color={today ? t.colors.accentText : t.colors.text}>{d.day}</Text>
              <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: d.state === 'done' ? t.colors.accent : d.state === 'today' ? t.colors.accentText : 'transparent' }} />
            </View>
          );
        })}
      </Reveal>

      <Reveal index={1}>
        <Card raised style={{ padding: t.spacing.lg, gap: t.spacing.md, borderRadius: 28 }}>
          <Text variant="label" accent>Сегодня · Пятница</Text>
          <Text variant="title">{data.today.title}</Text>
          <View style={{ flexDirection: 'row', gap: t.spacing.lg }}>
            {[
              { icon: 'time-outline', text: `${data.today.minutes} мин` },
              { icon: 'barbell-outline', text: `${data.today.exercises} упр.` },
              { icon: 'flame-outline', text: `${data.today.kcal} ккал` },
            ].map((m) => (
              <View key={m.text} style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <Ionicons name={m.icon as 'time-outline'} size={18} color={t.colors.textMuted} />
                <Text variant="caption" muted>{m.text}</Text>
              </View>
            ))}
          </View>
          <Button title="Начать тренировку" icon="play" onPress={() => router.replace('/fitness/workout')} />
        </Card>
      </Reveal>

      <View style={{ gap: t.spacing.sm }}>
        <Text variant="heading">Остальные дни</Text>
        {data.week.filter((d) => d.state !== 'today').map((d, i) => (
          <Reveal key={d.id} index={i + 2}>
            <Card style={{ flexDirection: 'row', alignItems: 'center', gap: t.spacing.md, paddingVertical: 12 }}>
              <View style={{ width: 44, height: 44, borderRadius: t.radius.md, backgroundColor: d.state === 'done' ? t.colors.accentSoft : t.colors.surfaceAlt, alignItems: 'center', justifyContent: 'center' }}>
                <Ionicons name={d.state === 'done' ? 'checkmark' : d.state === 'rest' ? 'moon-outline' : 'barbell-outline'} size={22} color={d.state === 'done' ? t.colors.accent : t.colors.textMuted} />
              </View>
              <View style={{ flex: 1 }}>
                <Text variant="bodyStrong" numberOfLines={1}>{d.title}</Text>
                <Text variant="caption" muted>{d.dow}, {d.day} ноября{d.minutes ? ` · ${d.minutes} мин` : ''}</Text>
              </View>
            </Card>
          </Reveal>
        ))}
      </View>
    </Screen>
  );
}
