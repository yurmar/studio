import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { View } from 'react-native';

import { Button, Reveal, Screen, Text } from '@/components';
import { Cover, CoverStyle } from '@/components/art/Cover';
import data from '@/data/audio.json';
import { hoursLabel } from '@/lib';
import { tabs } from '@/navigation';
import { useTheme } from '@/themes/ThemeProvider';

export default function Book() {
  const t = useTheme();
  const router = useRouter();
  const item = data.items.find((i) => i.id === data.book.id)!;

  return (
    <Screen tabs={tabs.audio}>
      <Reveal index={0} style={{ alignItems: 'center', paddingTop: t.spacing.md }}>
        <View style={t.shadow.raised}>
          <Cover look={item.cover as CoverStyle} size={168} radius={t.radius.lg} />
        </View>
      </Reveal>

      <Reveal index={1} style={{ alignItems: 'center', gap: 6 }}>
        <Text variant="title" style={{ textAlign: 'center' }}>{item.title}</Text>
        <Text variant="body" muted>{item.author}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: t.spacing.md, marginTop: 4 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Ionicons name="star" size={15} color={t.colors.accent} />
            <Text variant="caption" style={{ fontFamily: t.fonts.bodyBold }}>{item.rating.toFixed(1)}</Text>
          </View>
          <Text variant="caption" muted>{hoursLabel(item.hours)}</Text>
          <Text variant="caption" muted>Читает {item.narrator}</Text>
        </View>
      </Reveal>

      <Reveal index={2} style={{ flexDirection: 'row', gap: t.spacing.sm }}>
        <Button title="Слушать" icon="play" style={{ flex: 1 }} onPress={() => router.replace('/audio/player')} />
        <Button title="" icon="download-outline" variant="secondary" style={{ width: 56, paddingHorizontal: 0 }} />
      </Reveal>

      <Reveal index={3}>
        <Text variant="body" muted numberOfLines={3}>{data.book.about}</Text>
      </Reveal>

      <View style={{ gap: 4 }}>
        <Text variant="heading" style={{ marginBottom: 4 }}>Главы · {data.book.chapters.length}</Text>
        {data.book.chapters.map((c, i) => (
          <Reveal key={c.n} index={i + 4}>
            <View style={{ minHeight: 56, flexDirection: 'row', alignItems: 'center', gap: t.spacing.md, borderBottomWidth: 1, borderBottomColor: t.colors.border }}>
              <View style={{ width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center', backgroundColor: c.state === 'playing' ? t.colors.accent : 'transparent' }}>
                {c.state === 'playing' ? (
                  <Ionicons name="musical-notes" size={16} color={t.colors.accentText} />
                ) : c.state === 'done' ? (
                  <Ionicons name="checkmark" size={18} color={t.colors.success} />
                ) : (
                  <Text variant="caption" muted>{c.n}</Text>
                )}
              </View>
              <Text variant="bodyStrong" style={{ flex: 1, fontSize: 15 }} numberOfLines={1} muted={c.state === 'done'} accent={c.state === 'playing'}>{c.title}</Text>
              <Text variant="caption" muted>{c.time}</Text>
            </View>
          </Reveal>
        ))}
      </View>
    </Screen>
  );
}
