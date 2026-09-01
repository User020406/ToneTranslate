import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PillButton } from '@/components/pill-button';
import { Colors, Fonts, Radius, Spacing } from '@/constants/theme';

export default function Onboarding() {
  return (
    <LinearGradient
      colors={[Colors.gradientStart, Colors.gradientEnd]}
      start={{ x: 0.1, y: 0 }}
      end={{ x: 0.9, y: 1 }}
      style={styles.container}>
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <View style={styles.logoMark}>
            <View style={styles.logoRing} />
            <View style={styles.logoBar} />
          </View>
          <Text style={styles.title}>ToneTranslate</Text>
          <Text style={styles.tagline}>母国語のまま、{'\n'}世界中と話せる。</Text>

          <View style={styles.dots}>
            <View style={[styles.dot, styles.dotActive]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        </View>

        <View style={styles.actions}>
          <Link href="/login" asChild>
            <PillButton label="はじめる" variant="light" style={styles.startButton} />
          </Link>
          <Link href="/login" asChild>
            <PillButton label="ログイン" variant="outlineLight" />
          </Link>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safe: { flex: 1, paddingHorizontal: Spacing.xl, justifyContent: 'space-between' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: Spacing.md },
  logoMark: {
    width: 84,
    height: 84,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.16)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  logoRing: { width: 40, height: 40, borderRadius: 20, borderWidth: 3, borderColor: '#fff' },
  logoBar: { position: 'absolute', width: 40, height: 3, backgroundColor: '#fff', borderRadius: 2 },
  title: { fontFamily: Fonts.black, fontSize: 26, color: '#fff', letterSpacing: -0.5 },
  tagline: {
    fontFamily: Fonts.medium,
    fontSize: 15,
    lineHeight: 26,
    color: 'rgba(255,255,255,0.92)',
    textAlign: 'center',
    marginTop: Spacing.sm,
  },
  dots: { flexDirection: 'row', gap: 6, marginTop: Spacing.lg },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.5)' },
  dotActive: { width: 16, backgroundColor: '#fff' },
  actions: { gap: Spacing.md, paddingBottom: Spacing.xl },
  startButton: {},
});
