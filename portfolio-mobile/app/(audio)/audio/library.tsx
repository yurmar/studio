import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { View } from 'react-native';

import { Card, Chip, Header, ProgressRing, Reveal, Screen, Text } from '@/components';
import { Cover, CoverStyle } from '@/components/art/Cover';
import data from '@/data/audio.json';
import { tabs } from '@/navigation';
import { useTheme } from '@/themes/ThemeProvider';

export default function Library() {
  const t = useTheme();
  const lib = data.library;
  const [tab, setTab] = useState('Все');
  const rows = lib.rows.filter((r) => {
    const kind = data.items.find((i) => i.id === r.id)!.kind;
    if (tab === 'Скачано') return r.state === 'downloaded';
    if (tab === 'Подкасты') return kind === 'podcast';
    return true;
  });

  return (
    <Screen tabs={tabs.audio}>
      <Header eyebrow="Моя полка" title="Библиотека" action={{ icon: 'filter' }} />

      <Reveal index={0} style={{ flexDirection: 'row', gap: t.spacing.sm }}>
        {lib.tabs.map((name) => (
          <Chip key={name} label={name} selected={tab === name} onPress={() => setTab(name)} style={{ flex: 1 }} />
        ))}
      </Reveal>

      <Reveal index={1}>
        <Card tone="alt" style={{ gap: 8 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text variant="caption" muted>Скачано на устройство</Text>
            <Text variant="caption" style={{ fontFamily: t.fonts.bodyBold }}>{lib.storage.used.toString().replace('.', ',')} ГБ из {lib.storage.total} ГБ</Text>
          </View>
          <View style={{ height: 6, borderRadius: 3, backgroundColor: t.colors.border }}>
            <View style={{ width: `${(lib.storage.used / lib.storage.total) * 100}%`, height: 6, borderRadius: 3, backgroundColor: t.colors.accent }} />
          </View>
        </Card>
      </Reveal>

      <View style={{ gap: t.spacing.sm }}>
        {rows.length === 0 ? (
          <Card style={{ alignItems: 'center', gap: 8, padding: t.spacing.xl }}>
            <Ionicons name="cloud-download-outline" size={36} color={t.colors.accent} />
            <Text variant="heading">Пока пусто</Text>
          </Card>
        ) : null}
        {rows.map((r, i) => {
          const item = data.items.find((x) => x.id === r.id)!;
          return (
            <Reveal key={r.id} index={i + 2}>
              <Card style={{ flexDirection: 'row', alignItems: 'center', gap: t.spacing.md, padding: 10 }}>
                <Cover look={item.cover as CoverStyle} size={56} radius={t.radius.sm} />
                <View style={{ flex: 1, gap: 2 }}>
                  <Text variant="bodyStrong" numberOfLines={1} style={{ fontSize: 15 }}>{item.title}</Text>
                  <Text variant="caption" muted numberOfLines={1} style={{ fontSize: 13 }}>{item.author}</Text>
                  <Text variant="caption" accent={r.state !== 'cloud'} muted={r.state === 'cloud'} numberOfLines={1} style={{ fontSize: 12, lineHeight: 16 }}>{r.meta}</Text>
                </View>
                <View style={{ width: 44, height: 44, alignItems: 'center', justifyContent: 'center' }}>
                  {r.state === 'downloading' ? (
                    <ProgressRing progress={r.progress ?? 0} size={36} stroke={4}>
                      <Ionicons name="close" size={14} color={t.colors.text} />
                    </ProgressRing>
                  ) : (
                    <Ionicons name={r.state === 'downloaded' ? 'checkmark-circle' : 'cloud-download-outline'} size={26} color={r.state === 'downloaded' ? t.colors.success : t.colors.textMuted} />
                  )}
                </View>
              </Card>
            </Reveal>
          );
        })}
      </View>
    </Screen>
  );
}
