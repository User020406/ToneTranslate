import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors, Fonts, Radius, Spacing } from '@/constants/theme';

function ProviderButton({ label, icon }: { label: string; icon: React.ReactNode }) {
  return (
    <Pressable
      onPress={() => router.replace('/(tabs)')}
      style={({ pressed }) => [styles.providerButton, pressed && { opacity: 0.7 }]}>
      {icon}
      <Text style={styles.providerLabel}>{label}</Text>
    </Pressable>
  );
}

export default function Login() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.content}>
        <View style={styles.brandRow}>
          <View style={styles.logoMark}>
            <View style={styles.logoRing} />
          </View>
          <Text style={styles.brand}>ToneTranslate</Text>
        </View>
        <Text style={styles.subtitle}>アカウントで始める</Text>

        <View style={styles.buttons}>
          <ProviderButton label="Appleで続ける" icon={<View style={styles.appleIcon} />} />
          <ProviderButton label="Googleで続ける" icon={<View style={styles.googleIcon} />} />
          <ProviderButton label="メールで登録" icon={<View style={styles.mailIcon} />} />
        </View>

        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>または</Text>
          <View style={styles.dividerLine} />
        </View>

        <Pressable
          onPress={() => router.replace('/(tabs)')}
          style={({ pressed }) => [styles.emailButton, pressed && { opacity: 0.85 }]}>
          <Text style={styles.emailButtonLabel}>メールアドレスで登録</Text>
        </Pressable>

        <Pressable onPress={() => router.replace('/(tabs)')} hitSlop={8} style={styles.loginLink}>
          <Text style={styles.loginLinkText}>
            すでにアカウントをお持ちの方は <Text style={styles.loginLinkAccent}>ログイン</Text>
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  content: { flex: 1, justifyContent: 'center', paddingHorizontal: Spacing.xl, gap: Spacing.md },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.xs,
  },
  logoMark: {
    width: 32,
    height: 32,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoRing: { width: 16, height: 16, borderRadius: 8, borderWidth: 2, borderColor: '#fff' },
  brand: { fontFamily: Fonts.black, fontSize: 20, color: Colors.primary },
  subtitle: {
    fontFamily: Fonts.medium,
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  buttons: { gap: Spacing.md },
  providerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.borderMuted,
    borderRadius: Radius.md,
    paddingVertical: 15,
    paddingHorizontal: Spacing.lg,
  },
  providerLabel: { fontFamily: Fonts.medium, fontSize: 14, color: Colors.text },
  appleIcon: { width: 18, height: 18, borderRadius: 5, backgroundColor: '#222' },
  googleIcon: { width: 18, height: 18, borderRadius: 9, backgroundColor: Colors.borderMuted },
  mailIcon: { width: 18, height: 13, borderRadius: 3, backgroundColor: Colors.borderStrong },
  dividerRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginVertical: Spacing.xs },
  dividerLine: { flex: 1, height: 1, backgroundColor: Colors.borderMuted },
  dividerText: { fontFamily: Fonts.regular, fontSize: 11, color: Colors.textMuted },
  emailButton: {
    backgroundColor: Colors.tint,
    borderRadius: Radius.md,
    paddingVertical: 15,
    alignItems: 'center',
  },
  emailButtonLabel: { fontFamily: Fonts.bold, fontSize: 14, color: Colors.primary },
  loginLink: { marginTop: Spacing.md, alignItems: 'center' },
  loginLinkText: { fontFamily: Fonts.regular, fontSize: 12, color: Colors.textMuted },
  loginLinkAccent: { fontFamily: Fonts.bold, color: Colors.primary },
});
