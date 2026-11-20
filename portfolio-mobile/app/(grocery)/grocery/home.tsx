import { Ionicons } from '@expo/vector-icons';
import { Pressable, ScrollView, View } from 'react-native';

import { Card, Header, Reveal, Screen, Text } from '@/components';
import { Product, ProductKind } from '@/components/art/Product';
import { IconName } from '@/components/icons';
import data from '@/data/grocery.json';
import { money } from '@/lib';
import { tabs } from '@/navigation';
import { useTheme } from '@/themes/ThemeProvider';

export default function Home() {
  const t = useTheme();
  const popular = data.products.slice(0, 4);

  return (
    <Screen tabs={tabs.grocery}>
      <Header eyebrow={data.eta} title={'Свежие продукты\nк вашему столу'} action={{ icon: 'notifications-outline' }} />

      <Reveal index={0}>
        <View style={{ height: 52, borderRadius: t.radius.lg, backgroundColor: t.colors.surface, borderWidth: 1, borderColor: t.colors.border, flexDirection: 'row', alignItems: 'center', paddingHorizontal: t.spacing.md, gap: t.spacing.sm }}>
          <Ionicons name="search" size={20} color={t.colors.textMuted} />
          <Text variant="body" muted>Найти авокадо, хлеб, молоко…</Text>
        </View>
      </Reveal>

      <Reveal index={1} style={{ marginHorizontal: -t.spacing.gutter }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: t.spacing.gutter, gap: t.spacing.md }}>
          {data.categories.map((c, i) => (
            <Pressable key={c.id} accessibilityRole="button" style={{ width: 72, alignItems: 'center', gap: 6 }}>
              <View style={{ width: 64, height: 64, borderRadius: 22, backgroundColor: i === 0 ? t.colors.accent : t.colors.accentSoft, alignItems: 'center', justifyContent: 'center' }}>
                <Ionicons name={c.icon as IconName} size={26} color={i === 0 ? t.colors.accentText : t.colors.accent} />
              </View>
              <Text variant="caption" style={{ fontFamily: t.fonts.bodyBold, fontSize: 13 }} numberOfLines={1}>{c.title}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </Reveal>

      <Reveal index={2} style={{ marginHorizontal: -t.spacing.gutter }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: t.spacing.gutter, gap: t.spacing.md }}>
          {data.banners.map((b) => (
            <View key={b.id} style={{ width: 300, height: 152, borderRadius: t.radius.xl, backgroundColor: b.bg, overflow: 'hidden', padding: t.spacing.lg, justifyContent: 'center' }}>
              <View style={{ position: 'absolute', right: -14, bottom: -14, opacity: 0.95 }}>
                <Product kind={b.kind as ProductKind} size={150} background="transparent" />
              </View>
              <View style={{ width: 170, gap: 6 }}>
                <Text variant="heading" color={b.ink} style={{ fontSize: 22, lineHeight: 26 }}>{b.title}</Text>
                <Text variant="caption" color={b.ink} style={{ opacity: 0.9 }}>{b.text}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </Reveal>

      <View style={{ gap: t.spacing.md }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <Text variant="heading">Популярное сегодня</Text>
          <Text variant="caption" accent style={{ fontFamily: t.fonts.bodyBold }}>Все</Text>
        </View>
        <View style={{ flexDirection: 'row', gap: t.spacing.md }}>
          {popular.slice(0, 2).map((p, i) => (
            <Reveal key={p.id} index={i + 3} style={{ flex: 1 }}>
              <Card padded={false}>
                <Product kind={p.kind as ProductKind} size={158} background={p.bg} />
                <View style={{ padding: t.spacing.md, gap: 2 }}>
                  <Text variant="bodyStrong" numberOfLines={1}>{p.title}</Text>
                  <Text variant="caption" muted>{p.weight}</Text>
                  <Text variant="bodyStrong" accent>{money(p.price)}</Text>
                </View>
              </Card>
            </Reveal>
          ))}
        </View>
      </View>
    </Screen>
  );
}
