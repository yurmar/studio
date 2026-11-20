import { Ionicons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import { View } from 'react-native';

import { Button, Card, Chip, Header, Reveal, Screen, Stepper, Text } from '@/components';
import { Product, ProductKind } from '@/components/art/Product';
import data from '@/data/grocery.json';
import { money } from '@/lib';
import { tabs } from '@/navigation';
import { useTheme } from '@/themes/ThemeProvider';

export default function Cart() {
  const t = useTheme();
  const [qty, setQty] = useState<Record<string, number>>(() => Object.fromEntries(data.cart.map((c) => [c.productId, c.qty])));
  const [slot, setSlot] = useState(data.slots[1]);

  const lines = useMemo(
    () => data.cart.map((c) => ({ product: data.products.find((p) => p.id === c.productId)!, qty: qty[c.productId] })).filter((l) => l.qty > 0),
    [qty],
  );
  const subtotal = lines.reduce((sum, l) => sum + l.product.price * l.qty, 0);
  const discount = lines.reduce((sum, l) => sum + ((l.product.old ?? l.product.price) - l.product.price) * l.qty, 0);
  const delivery = subtotal >= data.freeFrom ? 0 : data.deliveryFee;
  const total = subtotal + delivery;

  return (
    <Screen tabs={tabs.grocery} footer={<Button title={`Оформить заказ · ${money(total)}`} icon="checkmark" />}>
      <Header eyebrow={`${lines.length} товара · доставка сегодня`} title="Корзина" />

      <View style={{ gap: t.spacing.sm }}>
        {lines.map((l, i) => (
          <Reveal key={l.product.id} index={i}>
            <Card padded={false} style={{ flexDirection: 'row', alignItems: 'center', paddingRight: 4 }}>
              <Product kind={l.product.kind as ProductKind} size={72} background={l.product.bg} />
              <View style={{ flex: 1, paddingHorizontal: t.spacing.md, gap: 2 }}>
                <Text variant="bodyStrong" numberOfLines={1} style={{ fontSize: 15 }}>{l.product.title}</Text>
                <Text variant="caption" muted style={{ fontSize: 13 }}>{l.product.weight}</Text>
                <Text variant="bodyStrong" accent>{money(l.product.price * l.qty)}</Text>
              </View>
              <Stepper value={l.qty} onChange={(v) => setQty((q) => ({ ...q, [l.product.id]: v }))} />
            </Card>
          </Reveal>
        ))}
      </View>

      <Reveal index={4} style={{ gap: t.spacing.sm }}>
        <Text variant="heading">Доставка</Text>
        <Card style={{ flexDirection: 'row', alignItems: 'center', gap: t.spacing.md }}>
          <View style={{ width: 44, height: 44, borderRadius: t.radius.md, backgroundColor: t.colors.accentSoft, alignItems: 'center', justifyContent: 'center' }}>
            <Ionicons name="location" size={22} color={t.colors.accent} />
          </View>
          <View style={{ flex: 1 }}>
            <Text variant="caption" muted>Адрес доставки</Text>
            <Text variant="bodyStrong" numberOfLines={1} style={{ fontSize: 15 }}>{data.user.address}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={t.colors.textMuted} />
        </Card>
        <View style={{ flexDirection: 'row', gap: t.spacing.sm }}>
          {data.slots.map((s) => (
            <Chip key={s} label={s} selected={slot === s} onPress={() => setSlot(s)} style={{ flex: 1, paddingHorizontal: 4 }} />
          ))}
        </View>
      </Reveal>

      <Reveal index={5}>
        <Card tone="alt" style={{ gap: 8 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text variant="caption" muted>Товары</Text>
            <Text variant="caption">{money(subtotal + discount)}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text variant="caption" muted>Скидка</Text>
            <Text variant="caption" color={t.colors.success}>− {money(discount)}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text variant="caption" muted>Доставка</Text>
            <Text variant="caption">{delivery === 0 ? 'Бесплатно' : money(delivery)}</Text>
          </View>
          <View style={{ height: 1, backgroundColor: t.colors.border }} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text variant="heading">Итого</Text>
            <Text variant="number" accent numberOfLines={1}>{money(total)}</Text>
          </View>
        </Card>
      </Reveal>
    </Screen>
  );
}
