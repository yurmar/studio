import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { useRouter } from 'expo-router';

import { Button, Header, Reveal, Screen, Text } from '@/components';
import data from '@/data/barber.json';
import { tabs } from '@/navigation';
import { useTheme } from '@/themes/ThemeProvider';

export default function Time() {
  const t = useTheme();
  const router = useRouter();
  const [date, setDate] = useState('d21');
  const [slot, setSlot] = useState('14:30');
  const chosen = data.dates.find((d) => d.id === date)!;

  return (
    <Screen
      tabs={tabs.barber}
      footer={<Button title={`${chosen.day} ${chosen.month} · ${slot}`} icon="arrow-forward" onPress={() => router.replace('/barber/confirm')} />}
    >
      <Header eyebrow="Шаг 3 из 4" title={'Дата\nи время'} />

      <Reveal index={0} style={{ marginHorizontal: -t.spacing.gutter }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: t.spacing.gutter, gap: t.spacing.sm }}>
          {data.dates.map((d) => {
            const active = d.id === date;
            return (
              <Pressable
                key={d.id}
                accessibilityRole="button"
                onPress={() => setDate(d.id)}
                style={{
                  width: 64,
                  height: 88,
                  borderRadius: t.radius.lg,
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                  backgroundColor: active ? t.colors.accent : t.colors.surface,
                  borderWidth: 1,
                  borderColor: active ? t.colors.accent : t.colors.border,
                }}
              >
                <Text variant="label" color={active ? t.colors.accentText : t.colors.textMuted}>{d.dow}</Text>
                <Text variant="number" color={active ? t.colors.accentText : t.colors.text}>{d.day}</Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </Reveal>

      <Reveal index={1} style={{ gap: t.spacing.md }}>
        <Text variant="heading">Свободное время</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: t.spacing.sm + 2 }}>
          {data.slots.map((s) => {
            const active = s.time === slot;
            return (
              <Pressable
                key={s.time}
                accessibilityRole="button"
                disabled={!s.free}
                onPress={() => setSlot(s.time)}
                style={{
                  width: '31%',
                  flexGrow: 1,
                  height: 52,
                  borderRadius: t.radius.md,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: active ? t.colors.accent : t.colors.surface,
                  borderWidth: 1,
                  borderColor: active ? t.colors.accent : t.colors.border,
                  opacity: s.free ? 1 : 0.4,
                }}
              >
                <Text variant="bodyStrong" color={active ? t.colors.accentText : t.colors.text} style={{ textDecorationLine: s.free ? 'none' : 'line-through' }}>
                  {s.time}
                </Text>
              </Pressable>
            );
          })}
        </View>
        <Text variant="caption" muted>Зачёркнутое время уже занято. Запись можно перенести за 3 часа.</Text>
      </Reveal>
    </Screen>
  );
}
