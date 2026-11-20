import { Ionicons } from '@expo/vector-icons';
import { ComponentProps } from 'react';
import { Pressable, StyleProp, View, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import { useTheme } from '@/themes/ThemeProvider';

import { Text } from './Text';

type IconName = ComponentProps<typeof Ionicons>['name'];

interface Props {
  title: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  icon?: IconName;
  small?: boolean;
  style?: StyleProp<ViewStyle>;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function Button({ title, onPress, variant = 'primary', icon, small, style }: Props) {
  const t = useTheme();
  const scale = useSharedValue(1);
  const animated = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  const filled = variant === 'primary';
  const background = filled ? t.colors.accent : variant === 'secondary' ? t.colors.surfaceAlt : 'transparent';
  const foreground = filled ? t.colors.accentText : t.colors.text;
  const height = small ? 44 : t.ui.buttonHeight;

  return (
    <AnimatedPressable
      accessibilityRole="button"
      onPress={onPress}
      onPressIn={() => scale.set(withSpring(0.96, { damping: 18, stiffness: 320 }))}
      onPressOut={() => scale.set(withSpring(1, { damping: 14, stiffness: 260 }))}
      style={[
        animated,
        {
          height,
          minWidth: 44,
          paddingHorizontal: small ? t.spacing.md : t.spacing.lg,
          borderRadius: t.ui.buttonRadius,
          backgroundColor: background,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          gap: t.spacing.sm,
        },
        filled && t.shadow.card,
        style,
      ]}
    >
      {icon ? <Ionicons name={icon} size={20} color={foreground} /> : null}
      <Text
        variant="bodyStrong"
        color={foreground}
        numberOfLines={1}
        style={{
          fontSize: small ? 14 : t.ui.buttonUppercase ? 14 : 16,
          letterSpacing: t.ui.buttonUppercase ? 1 : 0,
          textTransform: t.ui.buttonUppercase ? 'uppercase' : 'none',
        }}
      >
        {title}
      </Text>
      <View />
    </AnimatedPressable>
  );
}
