import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { View } from 'react-native';

import { Button, Card, Header, Reveal, Screen, Text } from '@/components';
import { Portrait } from '@/components/art/Portrait';
import data from '@/data/barber.json';
import { tabs } from '@/navigation';
import { useTheme } from '@/themes/ThemeProvider';

export default function Confirm() {
  const t = useTheme();
  const [confirmed, setConfirmed] = useState(false);
  const service = data.services[1];
  const master = data.masters[0];

  const rows: { icon: 'calendar-outline' | 'time-outline' | 'cut-outline' | 'location-outline'; label: string; value: string }[] = [
    { icon: 'calendar-outline', label: 'Дата', value: 'Суббота, 21 ноября' },
    { icon: 'time-outline', label: 'Время', value: '14:30 – 16:00' },
    { icon: 'cut-outline', label: 'Услуга', value: service.title },
    { icon: 'location-outline', label: 'Где', value: 'Барбершоп «Ловко»' },
  ];

  return (
    <Screen
      tabs={tabs.barber}
      footer={<Button title={confirmed ? 'Запись подтверждена' : 'Подтвердить запись'} icon="checkmark" onPress={() => setConfirmed(true)} />}
    >
      <Header eyebrow="Шаг 4 из 4" title={'Проверьте\nзапись'} />

      <Reveal index={0}>
        <Card raised style={{ padding: 0 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: t.spacing.md, padding: t.spacing.md }}>
            <View style={{ borderRadius: t.radius.lg, overflow: 'hidden' }}>
              <Portrait
                size={64}
                square
                look={{ skin: master.skin, hair: master.hair, shirt: master.shirt, background: master.bg, beard: master.beard, hairStyle: master.hairStyle as 0 | 1 | 2 | 3 }}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text variant="caption" muted>Ваш мастер</Text>
              <Text variant="bodyStrong">{master.name}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <Ionicons name="star" size={15} color={t.colors.accent} />
              <Text variant="caption" style={{ fontFamily: t.fonts.bodyBold }}>{master.rating.toFixed(1)}</Text>
            </View>
          </View>
          <View style={{ height: 1, backgroundColor: t.colors.border }} />
          <View style={{ padding: t.spacing.md, gap: t.spacing.md }}>
            {rows.map((r) => (
              <View key={r.label} style={{ flexDirection: 'row', alignItems: 'center', gap: t.spacing.md }}>
                <Ionicons name={r.icon} size={20} color={t.colors.accent} />
                <Text variant="caption" muted style={{ width: 56 }}>{r.label}</Text>
                <Text variant="bodyStrong" style={{ flex: 1, fontSize: 15 }} numberOfLines={1}>{r.value}</Text>
              </View>
            ))}
          </View>
        </Card>
      </Reveal>

      <Reveal index={1}>
        <Card style={{ gap: t.spacing.sm }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text variant="body" muted>{service.title}</Text>
            <Text variant="body">2 900 ₽</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text variant="body" muted>Скидка постоянного гостя</Text>
            <Text variant="body" color={t.colors.success}>− 290 ₽</Text>
          </View>
          <View style={{ height: 1, backgroundColor: t.colors.border }} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text variant="heading">К оплате</Text>
            <Text variant="number" accent numberOfLines={1}>2 610 ₽</Text>
          </View>
        </Card>
      </Reveal>

      {confirmed ? (
        <Reveal index={0}>
          <Card tone="alt" style={{ flexDirection: 'row', alignItems: 'center', gap: t.spacing.md }}>
            <Ionicons name="checkmark-circle" size={28} color={t.colors.success} />
            <Text variant="caption" style={{ flex: 1 }}>Ждём вас в субботу. Напомним за 2 часа до визита.</Text>
          </Card>
        </Reveal>
      ) : null}
    </Screen>
  );
}
