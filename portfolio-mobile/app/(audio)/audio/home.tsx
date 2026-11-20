import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, View } from 'react-native';

import { Card, Header, Reveal, Screen, Text } from '@/components';
import { Cover, CoverStyle } from '@/components/art/Cover';
import data from '@/data/audio.json';
import { tabs } from '@/navigation';
import { useTheme } from '@/themes/ThemeProvider';

const find = (id: string) => data.items.find((i) => i.id === id)!;

export default function Home() {
  const t = useTheme();
  const router = useRouter();
  const cont = find(data.continue.id);

  return (
    <Screen tabs={tabs.audio}>
      <Header eyebrow="Добрый вечер" title={`${data.user.name}, что послушаем?`} action={{ icon: 'search' }} />

      <Reveal index={0}>
        <Pressable accessibilityRole="button" onPress={() => router.replace('/audio/player')}>
          <Card raised style={{ flexDirection: 'row', gap: t.spacing.md, padding: t.spacing.md, alignItems: 'center' }}>
            <Cover look={cont.cover as CoverStyle} size={84} radius={t.radius.md} />
            <View style={{ flex: 1, gap: 4 }}>
              <Text variant="label" accent>Продолжить слушать</Text>
              <Text variant="heading" numberOfLines={2}>{cont.title}</Text>
              <Text variant="caption" muted numberOfLines={1}>{data.continue.chapter}</Text>
              <View style={{ height: 4, borderRadius: 2, backgroundColor: t.colors.surfaceAlt, marginTop: 6 }}>
                <View style={{ width: `${data.continue.progress * 100}%`, height: 4, borderRadius: 2, backgroundColor: t.colors.accent }} />
              </View>
              <Text variant="caption" muted style={{ fontSize: 12, lineHeight: 16 }}>Осталось {data.continue.left}</Text>
            </View>
            <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: t.colors.accent, alignItems: 'center', justifyContent: 'center' }}>
              <Ionicons name="play" size={22} color={t.colors.accentText} style={{ marginLeft: 3 }} />
            </View>
          </Card>
        </Pressable>
      </Reveal>

      {data.collections.map((col, ci) => (
        <Reveal key={col.title} index={ci + 1} style={{ gap: t.spacing.md }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <Text variant="heading">{col.title}</Text>
            <Text variant="caption" accent style={{ fontFamily: t.fonts.bodyBold }}>Все</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginHorizontal: -t.spacing.gutter }} contentContainerStyle={{ paddingHorizontal: t.spacing.gutter, gap: t.spacing.md }}>
            {col.ids.map((id) => {
              const item = find(id);
              return (
                <Pressable key={id} accessibilityRole="button" onPress={() => router.replace('/audio/book')} style={{ width: 128, gap: 8 }}>
                  <View style={t.shadow.card}>
                    <Cover look={item.cover as CoverStyle} size={128} radius={t.radius.md} />
                  </View>
                  <View>
                    <Text variant="bodyStrong" numberOfLines={1} style={{ fontSize: 14 }}>{item.title}</Text>
                    <Text variant="caption" muted numberOfLines={1} style={{ fontSize: 13 }}>{item.author}</Text>
                  </View>
                </Pressable>
              );
            })}
          </ScrollView>
        </Reveal>
      ))}
    </Screen>
  );
}
