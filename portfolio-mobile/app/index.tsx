import { Link } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ConceptId, specs } from '@/themes';

const concepts: { id: ConceptId; path: string; name: string; note: string }[] = [
  { id: 'habits', path: '/habits', name: 'Шаг', note: 'Трекер привычек' },
  { id: 'barber', path: '/barber/services', name: 'Ловко', note: 'Запись в барбершоп' },
  { id: 'grocery', path: '/grocery/home', name: 'Корзинка', note: 'Доставка продуктов' },
  { id: 'fitness', path: '/fitness/plan', name: 'Пульс', note: 'Фитнес и тренировки' },
  { id: 'audio', path: '/audio/home', name: 'Слушай', note: 'Аудиокниги и подкасты' },
];

/** Навигационный экран для разработки; в портфолио не используется. */
export default function Index() {
  const insets = useSafeAreaInsets();
  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={{ padding: 20, paddingTop: insets.top + 24, gap: 12 }}
    >
      <Text style={styles.title}>Концепты</Text>
      <Text style={styles.caption}>Пять мобильных приложений для портфолио</Text>
      {concepts.map((c) => {
        const palette = specs[c.id][specs[c.id].signature];
        return (
          <Link key={c.id} href={c.path as never} asChild>
            <Pressable style={[styles.row, { backgroundColor: palette.bg }]}>
              <View style={[styles.dot, { backgroundColor: palette.accent }]} />
              <View style={{ flex: 1 }}>
                <Text style={[styles.name, { color: palette.text }]}>{c.name}</Text>
                <Text style={[styles.note, { color: palette.textMuted }]}>{c.note}</Text>
              </View>
            </Pressable>
          </Link>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F2F2F0' },
  title: { fontSize: 32, fontWeight: '800', color: '#1B1B1A' },
  caption: { fontSize: 15, color: '#6B6B67', marginBottom: 8 },
  row: { minHeight: 72, borderRadius: 20, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 16, borderWidth: 1, borderColor: '#0000001A' },
  dot: { width: 40, height: 40, borderRadius: 20 },
  name: { fontSize: 20, fontWeight: '700' },
  note: { fontSize: 14, marginTop: 2 },
});
