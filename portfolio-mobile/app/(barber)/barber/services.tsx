import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';

import { Button, Header, ListItem, Reveal, Screen, Text } from '@/components';
import { IconName } from '@/components/icons';
import data from '@/data/barber.json';
import { money } from '@/lib';
import { tabs } from '@/navigation';
import { useTheme } from '@/themes/ThemeProvider';


export default function Services() {
  const t = useTheme();
  const router = useRouter();
  const [selected, setSelected] = useState('s2');
  const current = data.services.find((s) => s.id === selected)!;

  return (
    <Screen
      tabs={tabs.barber}
      footer={<Button title={`Далее · ${money(current.price)}`} icon="arrow-forward" onPress={() => router.replace('/barber/masters')} />}
    >
      <Header eyebrow="Шаг 1 из 4" title={'Выберите\nуслугу'} />
      <View style={{ gap: t.spacing.sm + 2 }}>
        {data.services.map((s, i) => (
          <Reveal key={s.id} index={i}>
            <ListItem
              title={s.title}
              subtitle={s.note}
              selected={selected === s.id}
              onPress={() => setSelected(s.id)}
              leading={
                <View style={{ width: 44, height: 44, borderRadius: t.radius.md, backgroundColor: t.colors.accentSoft, alignItems: 'center', justifyContent: 'center' }}>
                  <Ionicons name={s.icon as IconName} size={22} color={t.colors.accent} />
                </View>
              }
              trailing={
                <View style={{ alignItems: 'flex-end', gap: 2 }}>
                  <Text variant="bodyStrong" accent>{money(s.price)}</Text>
                  <Text variant="caption" muted style={{ fontSize: 12 }}>{s.minutes} мин</Text>
                </View>
              }
            />
          </Reveal>
        ))}
      </View>
    </Screen>
  );
}
