import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';

import { Button, Card, Reveal, Screen, Stepper, Text } from '@/components';
import { Product, ProductKind } from '@/components/art/Product';
import data from '@/data/grocery.json';
import { money } from '@/lib';
import { tabs } from '@/navigation';
import { useTheme } from '@/themes/ThemeProvider';

export default function ProductScreen() {
  const t = useTheme();
  const router = useRouter();
  const [qty, setQty] = useState(2);
  const p = data.products.find((x) => x.id === data.detail.productId)!;

  return (
    <Screen
      tabs={tabs.grocery}
      contentStyle={{ paddingTop: 0, paddingHorizontal: 0, gap: 0 }}
      footer={<Button title={`В корзину · ${money(p.price * qty)}`} icon="bag-handle" onPress={() => router.replace('/grocery/cart')} />}
    >
      <View style={{ backgroundColor: p.bg, alignItems: 'center', paddingTop: 52, paddingBottom: 8, borderBottomLeftRadius: t.radius.xl, borderBottomRightRadius: t.radius.xl }}>
        <Product kind={p.kind as ProductKind} size={250} background={p.bg} />
        <View style={{ position: 'absolute', top: 56, left: t.spacing.gutter, right: t.spacing.gutter, flexDirection: 'row', justifyContent: 'space-between' }}>
          {(['chevron-back', 'heart-outline'] as const).map((icon) => (
            <View key={icon} style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: t.colors.surface, alignItems: 'center', justifyContent: 'center' }}>
              <Ionicons name={icon} size={22} color={t.colors.text} />
            </View>
          ))}
        </View>
      </View>

      <View style={{ padding: t.spacing.gutter, gap: t.spacing.lg }}>
        <Reveal index={0} style={{ gap: 6 }}>
          <Text variant="title">{p.title}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Ionicons name="star" size={16} color={t.colors.tones[2]} />
            <Text variant="caption" style={{ fontFamily: t.fonts.bodyBold }}>{data.detail.rating.toFixed(1)}</Text>
            <Text variant="caption" muted>· {data.detail.reviews} отзывов · {p.weight}</Text>
          </View>
        </Reveal>

        <Reveal index={1} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View>
            <Text variant="number" accent>{money(p.price)}</Text>
            {p.old ? <Text variant="caption" muted style={{ textDecorationLine: 'line-through' }}>{money(p.old)}</Text> : null}
          </View>
          <Card tone="alt" padded={false} style={{ borderRadius: t.radius.lg }}>
            <Stepper value={qty} onChange={setQty} min={1} />
          </Card>
        </Reveal>

        <Reveal index={2}>
          <Text variant="body" muted>{data.detail.description}</Text>
        </Reveal>

        <Reveal index={3} style={{ flexDirection: 'row', gap: t.spacing.sm }}>
          {data.detail.nutrition.map((n) => (
            <Card key={n.label} tone="alt" style={{ flex: 1, alignItems: 'center', padding: t.spacing.sm + 2, gap: 2, borderRadius: t.radius.lg }}>
              <Text variant="bodyStrong">{n.value}</Text>
              <Text variant="caption" muted style={{ fontSize: 12, lineHeight: 16 }}>{n.label}</Text>
            </Card>
          ))}
        </Reveal>

        <Reveal index={4} style={{ gap: t.spacing.sm }}>
          <Text variant="heading">Состав</Text>
          {data.detail.ingredients.map((line) => (
            <View key={line} style={{ flexDirection: 'row', alignItems: 'center', gap: t.spacing.sm }}>
              <Ionicons name="checkmark-circle" size={18} color={t.colors.success} />
              <Text variant="caption">{line}</Text>
            </View>
          ))}
        </Reveal>
      </View>
    </Screen>
  );
}
