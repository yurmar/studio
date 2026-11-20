import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { useRouter } from 'expo-router';

import { Card, Chip, Header, Reveal, Screen, Text } from '@/components';
import { Product, ProductKind } from '@/components/art/Product';
import data from '@/data/grocery.json';
import { money } from '@/lib';
import { tabs } from '@/navigation';
import { useTheme } from '@/themes/ThemeProvider';

export default function Catalog() {
  const t = useTheme();
  const router = useRouter();
  const [filter, setFilter] = useState('Все');
  const [added, setAdded] = useState<string[]>(['p3']);

  const items = data.products.filter((p) => {
    if (filter === 'Со скидкой') return !!p.old;
    if (filter === 'Органик') return p.tag === 'Органик';
    if (filter === 'Новинки') return p.tag === 'Новинка';
    return true;
  });

  return (
    <Screen tabs={tabs.grocery}>
      <Header eyebrow="Каталог" title="Овощи и фрукты" action={{ icon: 'options-outline' }} />

      <Reveal index={0} style={{ marginHorizontal: -t.spacing.gutter }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: t.spacing.gutter, gap: t.spacing.sm }}>
          {data.filters.map((f) => (
            <Chip key={f} label={f} selected={filter === f} onPress={() => setFilter(f)} />
          ))}
        </ScrollView>
      </Reveal>

      {items.length === 0 ? (
        <Card tone="alt" style={{ alignItems: 'center', gap: t.spacing.sm, padding: t.spacing.xl }}>
          <Ionicons name="basket-outline" size={40} color={t.colors.accent} />
          <Text variant="heading">Пока ничего нет</Text>
          <Text variant="caption" muted style={{ textAlign: 'center' }}>Попробуйте другой фильтр — скоро добавим новинки.</Text>
        </Card>
      ) : (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: t.spacing.md }}>
          {items.map((p, i) => (
            <Reveal key={p.id} index={i} style={{ width: '47.5%', flexGrow: 1 }}>
              <Card padded={false}>
                  <Pressable accessibilityRole="button" onPress={() => router.replace('/grocery/product')}>
                    <Product kind={p.kind as ProductKind} size={170} background={p.bg} />
                    {p.tag ? (
                      <View style={{ position: 'absolute', top: 10, left: 10, backgroundColor: p.tag.startsWith('−') ? t.colors.danger : t.colors.surface, borderRadius: t.radius.pill, paddingHorizontal: 10, height: 24, justifyContent: 'center' }}>
                        <Text variant="caption" color={p.tag.startsWith('−') ? '#FFFFFF' : t.colors.accent} style={{ fontSize: 12, lineHeight: 16, fontFamily: t.fonts.bodyBold }}>{p.tag}</Text>
                      </View>
                    ) : null}
                  </Pressable>
                  <View style={{ padding: t.spacing.md, paddingTop: 12, gap: 2 }}>
                    <Text variant="bodyStrong" numberOfLines={1} style={{ fontSize: 15 }}>{p.title}</Text>
                    <Text variant="caption" muted style={{ fontSize: 13 }}>{p.weight}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 }}>
                      <View>
                        <Text variant="bodyStrong" accent>{money(p.price)}</Text>
                        {p.old ? <Text variant="caption" muted style={{ fontSize: 12, lineHeight: 14, textDecorationLine: 'line-through' }}>{money(p.old)}</Text> : null}
                      </View>
                      <Pressable
                        accessibilityRole="button"
                        onPress={() => setAdded((a) => (a.includes(p.id) ? a.filter((x) => x !== p.id) : [...a, p.id]))}
                        style={{ width: 44, height: 44, alignItems: 'center', justifyContent: 'center', marginRight: -6 }}
                      >
                        <View style={{ width: 36, height: 36, borderRadius: t.radius.md, backgroundColor: added.includes(p.id) ? t.colors.success : t.colors.accent, alignItems: 'center', justifyContent: 'center' }}>
                          <Ionicons name={added.includes(p.id) ? 'checkmark' : 'add'} size={22} color="#FFFFFF" />
                        </View>
                      </Pressable>
                    </View>
                  </View>
              </Card>
            </Reveal>
          ))}
        </View>
      )}
    </Screen>
  );
}
