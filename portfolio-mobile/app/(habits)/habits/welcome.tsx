import { Ionicons } from '@expo/vector-icons';
import { useRef, useState } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, ScrollView, View, useWindowDimensions } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useRouter } from 'expo-router';

import { Button, Screen, Text } from '@/components';
import { IconName } from '@/components/icons';
import data from '@/data/habits.json';
import { tabs } from '@/navigation';
import { useTheme } from '@/themes/ThemeProvider';

export default function Welcome() {
  const t = useTheme();
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [page, setPage] = useState(0);
  const scroller = useRef<{ scrollTo: (o: { x: number; animated: boolean }) => void } | null>(null);
  const last = page === data.slides.length - 1;

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setPage(Math.round(e.nativeEvent.contentOffset.x / width));
  };
  const next = () => {
    if (last) router.replace('/habits/today');
    else scroller.current?.scrollTo({ x: width * (page + 1), animated: true });
  };

  return (
    <Screen
      tabs={tabs.habits}
      scroll={false}
      contentStyle={{ paddingHorizontal: 0 }}
      footer={<Button title={last ? 'Начать' : 'Далее'} icon={last ? 'leaf' : 'arrow-forward'} onPress={next} />}
    >
      <ScrollView ref={(r) => { scroller.current = r as unknown as typeof scroller.current; }} horizontal pagingEnabled showsHorizontalScrollIndicator={false} onScroll={onScroll} scrollEventThrottle={16} style={{ flex: 1 }}>
        {data.slides.map((s, i) => (
          <View key={s.id} style={{ width, paddingHorizontal: t.spacing.gutter, alignItems: 'center', justifyContent: 'center', gap: t.spacing.lg, paddingTop: 40 }}>
            <Animated.View entering={FadeIn.delay(100 + i * 40).duration(500)} style={{ alignItems: 'center', gap: t.spacing.xl }}>
              <View style={{ width: 208, height: 208, borderRadius: 104, backgroundColor: t.colors.accentSoft, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ width: 148, height: 148, borderRadius: 74, backgroundColor: t.colors.surface, alignItems: 'center', justifyContent: 'center' }}>
                  <Ionicons name={s.icon as IconName} size={68} color={t.colors.accent} />
                </View>
                <View style={{ position: 'absolute', top: 18, right: 24, width: 28, height: 28, borderRadius: 14, backgroundColor: t.colors.tones[1] }} />
                <View style={{ position: 'absolute', bottom: 30, left: 14, width: 18, height: 18, borderRadius: 9, backgroundColor: t.colors.tones[2] }} />
              </View>
              <View style={{ gap: t.spacing.sm, alignItems: 'center' }}>
                <Text variant="title" style={{ textAlign: 'center' }}>{s.title}</Text>
                <Text variant="body" muted style={{ textAlign: 'center', maxWidth: 320 }}>{s.text}</Text>
              </View>
            </Animated.View>
          </View>
        ))}
      </ScrollView>
      <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 8, paddingBottom: 8 }}>
        {data.slides.map((s, i) => (
          <View key={s.id} style={{ width: i === page ? 28 : 8, height: 8, borderRadius: 4, backgroundColor: i === page ? t.colors.accent : t.colors.border }} />
        ))}
      </View>
    </Screen>
  );
}
