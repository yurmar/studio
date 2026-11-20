import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';

import { Button, Card, Chip, Header, Reveal, Screen, Text } from '@/components';
import { IconName } from '@/components/icons';
import data from '@/data/habits.json';
import { tabs } from '@/navigation';
import { useTheme } from '@/themes/ThemeProvider';

export default function Add() {
  const t = useTheme();
  const [name, setName] = useState('Растяжка перед сном');
  const [icon, setIcon] = useState('moon');
  const [tone, setTone] = useState(3);
  const [days, setDays] = useState<string[]>(['Пн', 'Ср', 'Пт', 'Вс']);
  const [reminder, setReminder] = useState('Вечер');
  const toggleDay = (day: string) => setDays((p) => (p.includes(day) ? p.filter((x) => x !== day) : [...p, day]));
  const color = t.colors.tones[tone];

  return (
    <Screen
      tabs={tabs.habits}
      footer={<Button title="Создать привычку" icon="checkmark" />}
    >
      <Header eyebrow="Новая привычка" title="Что хотите закрепить?" />

      <Reveal index={0}>
        <Card style={{ flexDirection: 'row', alignItems: 'center', gap: t.spacing.md }}>
          <View style={{ width: 56, height: 56, borderRadius: 18, backgroundColor: color + '33', alignItems: 'center', justifyContent: 'center' }}>
            <Ionicons name={icon as IconName} size={28} color={color} />
          </View>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Название привычки"
            placeholderTextColor={t.colors.textMuted}
            style={{ flex: 1, minHeight: 44, fontFamily: t.fonts.bodyBold, fontSize: 18, color: t.colors.text, outlineStyle: 'none' } as never}
          />
        </Card>
      </Reveal>

      <Reveal index={1} style={{ gap: t.spacing.sm }}>
        <Text variant="label" muted>Иконка</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: t.spacing.sm }}>
          {data.icons.map((name_) => {
            const active = name_ === icon;
            return (
              <Pressable
                key={name_}
                accessibilityRole="button"
                onPress={() => setIcon(name_)}
                style={{ width: 72, height: 56, borderRadius: 18, alignItems: 'center', justifyContent: 'center', backgroundColor: active ? color : t.colors.surface, borderWidth: 1, borderColor: active ? color : t.colors.border }}
              >
                <Ionicons name={name_ as IconName} size={24} color={active ? '#FFFFFF' : t.colors.textMuted} />
              </Pressable>
            );
          })}
        </View>
      </Reveal>

      <Reveal index={2} style={{ gap: t.spacing.sm }}>
        <Text variant="label" muted>Цвет</Text>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          {t.colors.tones.map((c, i) => (
            <Pressable
              key={c}
              accessibilityRole="button"
              onPress={() => setTone(i)}
              style={{ width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: i === tone ? t.colors.text : 'transparent' }}
            >
              <View style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: c }} />
            </Pressable>
          ))}
        </View>
      </Reveal>

      <Reveal index={3} style={{ gap: t.spacing.sm }}>
        <Text variant="label" muted>Расписание</Text>
        <View style={{ flexDirection: 'row', gap: 6 }}>
          {data.schedule.map((day) => (
            <Chip key={day} label={day} selected={days.includes(day)} onPress={() => toggleDay(day)} style={{ flex: 1, paddingHorizontal: 0 }} />
          ))}
        </View>
        <View style={{ flexDirection: 'row', gap: t.spacing.sm }}>
          {data.reminders.map((r) => (
            <Chip key={r} label={r} icon="alarm-outline" selected={reminder === r} onPress={() => setReminder(r)} style={{ flex: 1 }} />
          ))}
        </View>
      </Reveal>
    </Screen>
  );
}
