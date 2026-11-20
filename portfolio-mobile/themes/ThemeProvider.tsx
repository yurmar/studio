import { createContext, ReactNode, useContext, useMemo } from 'react';
import { useColorScheme } from 'react-native';

import { ConceptId, specs } from './index';
import { resolveTheme, Theme } from './types';

const ThemeContext = createContext<Theme | null>(null);

interface Props {
  concept: ConceptId;
  children: ReactNode;
}

export function ThemeProvider({ concept, children }: Props) {
  const system = useColorScheme();
  const spec = specs[concept];
  const theme = useMemo(
    () => resolveTheme(spec, system ?? spec.signature),
    [spec, system],
  );
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

export function useTheme(): Theme {
  const theme = useContext(ThemeContext);
  if (!theme) throw new Error('useTheme вне ThemeProvider');
  return theme;
}
