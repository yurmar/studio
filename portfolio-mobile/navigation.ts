import { TabItem } from '@/components/TabBar';
import { ConceptId } from '@/themes';

const tab = (
  base: string,
  slug: string,
  label: string,
  icon: TabItem['icon'],
  activeIcon: TabItem['activeIcon'],
): TabItem => ({
  label,
  icon,
  activeIcon,
  href: `/${base}/${slug}` as TabItem['href'],
  path: `/${base}/${slug}`,
});

export const tabs: Record<ConceptId, TabItem[]> = {
  habits: [
    tab('habits', 'today', 'Сегодня', 'checkmark-circle-outline', 'checkmark-circle'),
    tab('habits', 'detail', 'Серия', 'flame-outline', 'flame'),
    tab('habits', 'add', 'Новая', 'add-circle-outline', 'add-circle'),
    tab('habits', 'welcome', 'Старт', 'leaf-outline', 'leaf'),
  ],
  barber: [
    tab('barber', 'services', 'Услуги', 'cut-outline', 'cut'),
    tab('barber', 'masters', 'Мастера', 'people-outline', 'people'),
    tab('barber', 'time', 'Время', 'calendar-outline', 'calendar'),
    tab('barber', 'confirm', 'Запись', 'checkmark-done-outline', 'checkmark-done'),
  ],
  grocery: [
    tab('grocery', 'home', 'Главная', 'home-outline', 'home'),
    tab('grocery', 'catalog', 'Каталог', 'grid-outline', 'grid'),
    tab('grocery', 'product', 'Товар', 'nutrition-outline', 'nutrition'),
    tab('grocery', 'cart', 'Корзина', 'bag-handle-outline', 'bag-handle'),
  ],
  fitness: [
    tab('fitness', 'plan', 'План', 'calendar-outline', 'calendar'),
    tab('fitness', 'workout', 'Тренировка', 'barbell-outline', 'barbell'),
    tab('fitness', 'history', 'История', 'stats-chart-outline', 'stats-chart'),
    tab('fitness', 'profile', 'Профиль', 'person-outline', 'person'),
  ],
  audio: [
    tab('audio', 'home', 'Главная', 'home-outline', 'home'),
    tab('audio', 'book', 'Книга', 'book-outline', 'book'),
    tab('audio', 'player', 'Плеер', 'play-circle-outline', 'play-circle'),
    tab('audio', 'library', 'Библиотека', 'library-outline', 'library'),
  ],
};
