import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { useRouter } from 'expo-router';

import { Button, Card, Header, Reveal, Screen, Text } from '@/components';
import { Portrait } from '@/components/art/Portrait';
import data from '@/data/barber.json';
import { tabs } from '@/navigation';
import { useTheme } from '@/themes/ThemeProvider';

const yearsLabel = (n: number) => `${n} ${n % 10 === 1 && n !== 11 ? 'год' : n % 10 >= 2 && n % 10 <= 4 && (n < 10 || n > 20) ? 'года' : 'лет'}`;

export default function Masters() {
  const t = useTheme();
  const router = useRouter();
  const [selected, setSelected] = useState('m1');

  return (
    <Screen
      tabs={tabs.barber}
      footer={<Button title="Выбрать время" icon="arrow-forward" onPress={() => router.replace('/barber/time')} />}
    >
      <Header eyebrow="Шаг 2 из 4" title={'Выберите\nмастера'} />
      <View style={{ gap: t.spacing.sm + 2 }}>
        {data.masters.map((m, i) => {
          const active = selected === m.id;
          return (
            <Reveal key={m.id} index={i}>
              <Card
                style={{ flexDirection: 'row', alignItems: 'center', gap: t.spacing.md, borderWidth: 2, borderColor: active ? t.colors.accent : t.colors.border }}
              >
                <Pressable
                  accessibilityRole="button"
                  onPress={() => setSelected(m.id)}
                  style={{ flexDirection: 'row', alignItems: 'center', gap: t.spacing.md, flex: 1 }}
                >
                  <View style={{ borderRadius: t.radius.lg, overflow: 'hidden' }}>
                    <Portrait
                      size={88}
                      square
                      look={{ skin: m.skin, hair: m.hair, shirt: m.shirt, background: m.bg, beard: m.beard, hairStyle: m.hairStyle as 0 | 1 | 2 | 3, glasses: m.glasses }}
                    />
                  </View>
                  <View style={{ flex: 1, gap: 4 }}>
                    <Text variant="bodyStrong" numberOfLines={1}>{m.name}</Text>
                    <Text variant="caption" muted>{m.role}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 2 }}>
                      <Ionicons name="star" size={15} color={t.colors.accent} />
                      <Text variant="caption" style={{ fontFamily: t.fonts.bodyBold }}>{m.rating.toFixed(1)}</Text>
                      <Text variant="caption" muted>· {m.reviews} отзывов</Text>
                    </View>
                    <Text variant="caption" muted>Опыт {yearsLabel(m.years)}</Text>
                  </View>
                </Pressable>
                {active ? <Ionicons name="checkmark-circle" size={26} color={t.colors.accent} /> : null}
              </Card>
            </Reveal>
          );
        })}
      </View>
    </Screen>
  );
}
