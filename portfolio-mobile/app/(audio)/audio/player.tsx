import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, View } from 'react-native';

import { Chip, Reveal, Screen, Text } from '@/components';
import { Cover, CoverStyle } from '@/components/art/Cover';
import data from '@/data/audio.json';
import { tabs } from '@/navigation';
import { useTheme } from '@/themes/ThemeProvider';

export default function Player() {
  const t = useTheme();
  const item = data.items.find((i) => i.id === data.continue.id)!;
  const p = data.player;
  const [playing, setPlaying] = useState(true);
  const [sleep, setSleep] = useState(true);

  const round = (name: 'play-back' | 'play-forward' | 'play-skip-back' | 'play-skip-forward') => (
    <Pressable accessibilityRole="button" style={{ width: 52, height: 52, alignItems: 'center', justifyContent: 'center' }}>
      <Ionicons name={name} size={26} color={t.colors.text} />
    </Pressable>
  );

  return (
    <Screen tabs={tabs.audio} contentStyle={{ alignItems: 'stretch' }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: t.spacing.md }}>
        <Ionicons name="chevron-down" size={26} color={t.colors.text} />
        <Text variant="label" muted>Сейчас играет</Text>
        <Ionicons name="ellipsis-horizontal" size={22} color={t.colors.text} />
      </View>

      <Reveal index={0} style={{ alignItems: 'center' }}>
        <View style={t.shadow.raised}>
          <Cover look={item.cover as CoverStyle} size={218} radius={t.radius.xl} />
        </View>
      </Reveal>

      <Reveal index={1} style={{ alignItems: 'center', gap: 4 }}>
        <Text variant="title" style={{ textAlign: 'center', fontSize: 26 }}>{item.title}</Text>
        <Text variant="caption" muted>Глава 7 · Утренний прилив</Text>
      </Reveal>

      <Reveal index={2} style={{ gap: 8 }}>
        <View style={{ height: 24, justifyContent: 'center' }}>
          <View style={{ height: 4, borderRadius: 2, backgroundColor: t.colors.surfaceAlt }}>
            <View style={{ width: `${p.ratio * 100}%`, height: 4, borderRadius: 2, backgroundColor: t.colors.accent }} />
          </View>
          <View style={{ position: 'absolute', left: `${p.ratio * 100}%`, marginLeft: -8, width: 16, height: 16, borderRadius: 8, backgroundColor: t.colors.accent }} />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text variant="caption" muted>{p.position}</Text>
          <Text variant="caption" muted>−{p.total}</Text>
        </View>
      </Reveal>

      <Reveal index={3} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        {round('play-skip-back')}
        <Pressable accessibilityRole="button" style={{ width: 52, height: 52, alignItems: 'center', justifyContent: 'center' }}>
          <Ionicons name="refresh" size={26} color={t.colors.text} style={{ transform: [{ scaleX: -1 }] }} />
        </Pressable>
        <Pressable
          accessibilityRole="button"
          onPress={() => setPlaying((v) => !v)}
          style={[{ width: 72, height: 72, borderRadius: 36, backgroundColor: t.colors.accent, alignItems: 'center', justifyContent: 'center' }, t.shadow.card]}
        >
          <Ionicons name={playing ? 'pause' : 'play'} size={32} color={t.colors.accentText} style={{ marginLeft: playing ? 0 : 4 }} />
        </Pressable>
        <Pressable accessibilityRole="button" style={{ width: 52, height: 52, alignItems: 'center', justifyContent: 'center' }}>
          <Ionicons name="refresh" size={26} color={t.colors.text} />
        </Pressable>
        {round('play-skip-forward')}
      </Reveal>

      <Reveal index={4} style={{ flexDirection: 'row', gap: t.spacing.sm }}>
        <Chip label={`Скорость ${p.speed}`} icon="speedometer-outline" style={{ flex: 1 }} selected />
        <Chip label={`Сон · ${p.sleep}`} icon="moon-outline" selected={sleep} onPress={() => setSleep((v) => !v)} style={{ flex: 1 }} />
      </Reveal>
    </Screen>
  );
}
