import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';

import { Avatar, Card, Header, ListItem, ProgressRing, Reveal, Screen, Text } from '@/components';
import data from '@/data/fitness.json';
import { tabs } from '@/navigation';
import { useTheme } from '@/themes/ThemeProvider';

export default function Profile() {
  const t = useTheme();
  const { main, goals, user } = data;
  const progress = (main.from - main.now) / (main.from - main.to);

  return (
    <Screen tabs={tabs.fitness}>
      <Header eyebrow="Профиль" title="Мои цели" action={{ icon: 'settings-outline' }} />

      <Reveal index={0} style={{ flexDirection: 'row', alignItems: 'center', gap: t.spacing.md }}>
        <Avatar name={user.name} size={64} />
        <View style={{ flex: 1 }}>
          <Text variant="heading">{user.name}</Text>
          <Text variant="caption" muted>{user.level} · {user.height} см · {user.weight} кг</Text>
        </View>
      </Reveal>

      <Reveal index={1}>
        <Card raised style={{ flexDirection: 'row', alignItems: 'center', gap: t.spacing.lg, padding: t.spacing.lg }}>
          <ProgressRing progress={progress} size={104} stroke={11}>
            <Text variant="number">{Math.round(progress * 100)}%</Text>
          </ProgressRing>
          <View style={{ flex: 1, gap: 4 }}>
            <Text variant="label" accent>Главная цель</Text>
            <Text variant="heading">{main.title}</Text>
            <Text variant="caption" muted>Сейчас {main.now} кг, осталось {(main.now - main.to).toFixed(1)} кг</Text>
          </View>
        </Card>
      </Reveal>

      <View style={{ gap: t.spacing.sm }}>
        <Text variant="heading">Сегодня и на неделе</Text>
        {goals.map((g, i) => {
          const ratio = Math.min(g.value / g.target, 1);
          return (
            <Reveal key={g.id} index={i + 2}>
              <Card style={{ gap: 10 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text variant="bodyStrong">{g.title}</Text>
                  <Text variant="caption" muted>{g.value.toLocaleString('ru-RU')} / {g.target.toLocaleString('ru-RU')}{g.unit}</Text>
                </View>
                <View style={{ height: 8, borderRadius: 4, backgroundColor: t.colors.surfaceAlt, overflow: 'hidden' }}>
                  <View style={{ width: `${ratio * 100}%`, height: 8, borderRadius: 4, backgroundColor: t.colors.accent }} />
                </View>
              </Card>
            </Reveal>
          );
        })}
      </View>

      <View style={{ gap: t.spacing.sm }}>
        {data.settings.slice(0, 2).map((s, i) => (
          <Reveal key={s.title} index={i + 5}>
            <ListItem
              title={s.title}
              chevron
              leading={<Ionicons name={s.icon as 'notifications-outline'} size={22} color={t.colors.accent} />}
            />
          </Reveal>
        ))}
      </View>
    </Screen>
  );
}
