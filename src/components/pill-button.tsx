import { Pressable, StyleSheet, Text, type StyleProp, type ViewStyle } from 'react-native';

import { Colors, Fonts, Radius, Spacing } from '@/constants/theme';

type Props = {
  label: string;
  onPress?: () => void;
  variant?: 'solid' | 'outline' | 'ghost' | 'light' | 'outlineLight';
  style?: StyleProp<ViewStyle>;
};

export function PillButton({ label, onPress, variant = 'solid', style }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        variant === 'solid' && styles.solid,
        variant === 'outline' && styles.outline,
        variant === 'ghost' && styles.ghost,
        variant === 'light' && styles.light,
        variant === 'outlineLight' && styles.outlineLight,
        pressed && { opacity: 0.85 },
        style,
      ]}>
      <Text
        style={[
          styles.label,
          variant === 'solid' && styles.solidLabel,
          variant === 'outline' && styles.outlineLabel,
          variant === 'ghost' && styles.ghostLabel,
          variant === 'light' && styles.lightLabel,
          variant === 'outlineLight' && styles.outlineLightLabel,
        ]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: Radius.pill,
    paddingVertical: 16,
    paddingHorizontal: Spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  solid: {
    backgroundColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOpacity: 0.4,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
  },
  outline: {
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.borderStrong,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  light: {
    backgroundColor: '#fff',
  },
  outlineLight: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.6)',
  },
  label: {
    fontFamily: Fonts.bold,
    fontSize: 15,
  },
  solidLabel: { color: '#fff' },
  outlineLabel: { color: Colors.text },
  ghostLabel: { color: Colors.text },
  lightLabel: { color: Colors.primary },
  outlineLightLabel: { color: '#fff' },
});
