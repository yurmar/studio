import { audioTheme } from './audio';
import { barberTheme } from './barber';
import { fitnessTheme } from './fitness';
import { groceryTheme } from './grocery';
import { habitsTheme } from './habits';
import { ThemeSpec } from './types';

export type ConceptId = 'habits' | 'barber' | 'grocery' | 'fitness' | 'audio';

export const specs: Record<ConceptId, ThemeSpec> = {
  habits: habitsTheme,
  barber: barberTheme,
  grocery: groceryTheme,
  fitness: fitnessTheme,
  audio: audioTheme,
};

export * from './types';
