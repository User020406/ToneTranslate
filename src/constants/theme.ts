/**
 * ToneTranslate visual theme, ported from the marketing landing page.
 * Single light palette — the LP does not define a dark variant.
 */

export const Colors = {
  primary: '#FF6B00',
  primaryDark: '#E85F00',
  primaryLight: '#FFB07A',
  gradientStart: '#FF8A3D',
  gradientEnd: '#FF6B00',

  background: '#FFFFFF',
  backgroundSoft: '#FFF8F3',
  backgroundChat: '#FFFDFC',
  surface: '#FFFFFF',
  tint: '#FFF1E7',
  tintStrong: '#FFE1CC',

  border: '#FFEADB',
  borderStrong: '#FFD9BC',
  borderMuted: '#F0EAE6',
  divider: '#F4F0EE',

  text: '#222222',
  textSecondary: '#777777',
  textMuted: '#B6ADA8',
  textWarm: '#A08877',

  bubbleMine: '#FF6B00',
  bubbleMineText: '#FFFFFF',
  bubbleTheirs: '#FFFFFF',
  bubbleTheirsText: '#222222',

  success: '#8ECF9E',
  danger: '#E5484D',

  chipBg: '#F6F2F0',
  chipText: '#B6ADA8',

  dark: '#151515',
} as const;

export const Fonts = {
  regular: 'NotoSansJP_400Regular',
  medium: 'NotoSansJP_500Medium',
  bold: 'NotoSansJP_700Bold',
  black: 'NotoSansJP_900Black',
} as const;

export const Radius = {
  sm: 12,
  md: 18,
  lg: 24,
  xl: 32,
  pill: 999,
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;
