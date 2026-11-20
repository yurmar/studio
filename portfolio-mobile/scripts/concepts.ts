export type Scheme = 'light' | 'dark';

export interface ConceptShots {
  id: string;
  title: string;
  scheme: Scheme;
  /** Цвет фона обложки: мягкий однотонный. */
  coverBg: string;
  screens: { name: string; path: string }[];
}

export const concepts: ConceptShots[] = [
  {
    id: 'habits',
    title: 'Шаг',
    scheme: 'light',
    coverBg: '#DCEBDD',
    screens: [
      { name: '1-onboarding', path: '/habits/welcome' },
      { name: '2-today', path: '/habits/today' },
      { name: '3-habit', path: '/habits/detail' },
      { name: '4-add', path: '/habits/add' },
    ],
  },
  {
    id: 'barber',
    title: 'Ловко',
    scheme: 'dark',
    coverBg: '#E7DFCF',
    screens: [
      { name: '1-services', path: '/barber/services' },
      { name: '2-masters', path: '/barber/masters' },
      { name: '3-time', path: '/barber/time' },
      { name: '4-confirm', path: '/barber/confirm' },
    ],
  },
  {
    id: 'grocery',
    title: 'Корзинка',
    scheme: 'light',
    coverBg: '#FBE3CC',
    screens: [
      { name: '1-home', path: '/grocery/home' },
      { name: '2-catalog', path: '/grocery/catalog' },
      { name: '3-product', path: '/grocery/product' },
      { name: '4-cart', path: '/grocery/cart' },
    ],
  },
  {
    id: 'fitness',
    title: 'Пульс',
    scheme: 'dark',
    coverBg: '#DDE3CB',
    screens: [
      { name: '1-plan', path: '/fitness/plan' },
      { name: '2-workout', path: '/fitness/workout' },
      { name: '3-history', path: '/fitness/history' },
      { name: '4-profile', path: '/fitness/profile' },
    ],
  },
  {
    id: 'audio',
    title: 'Слушай',
    scheme: 'dark',
    coverBg: '#D6DCEA',
    screens: [
      { name: '1-home', path: '/audio/home' },
      { name: '2-book', path: '/audio/book' },
      { name: '3-player', path: '/audio/player' },
      { name: '4-library', path: '/audio/library' },
    ],
  },
];
