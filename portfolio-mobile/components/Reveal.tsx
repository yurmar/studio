import { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

interface Props {
  index?: number;
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
}

/** Плавное появление блока; index задаёт задержку каскада. */
export function Reveal({ index = 0, style, children }: Props) {
  return (
    <Animated.View entering={FadeInDown.delay(60 + index * 70).duration(420)} style={style}>
      {children}
    </Animated.View>
  );
}
