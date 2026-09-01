import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useSettings } from '@/context/settings';
import { languageByCode } from '@/data/languages';
import { Colors, Fonts, Radius, Spacing } from '@/constants/theme';

const MENU = [
  { icon: 'settings' as const, label: 'アカウント設定' },
  { icon: 'globe' as const, label: '言語設定' },
  { icon: 'bell' as const, label: '通知設定' },
  { icon: 'shield' as const, label: 'セキュリティ' },
  { icon: 'slash' as const, label: 'ブロックリスト' },
  { icon: 'help-circle' as const, label: 'ヘルプ・お問い合わせ' },
];

export default function Profile() {
  const { nativeLanguage } = useSettings();
  const lang = languageByCode(nativeLanguage);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView>
        <LinearGradient colors={[Colors.gradientStart, Colors.gradientEnd]} style={styles.hero}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>Y</Text>
          </View>
          <Text style={styles.name}>Yuki Tanaka</Text>
          <Text style={styles.lang}>
            {lang.flag} {lang.nameJa}
          </Text>
        </LinearGradient>

        <View style={styles.menu}>
          {MENU.map((item, i) => (
            <Pressable key={item.label} style={[styles.menuRow, i > 0 && styles.menuRowBorder]}>
              <View style={styles.menuLeft}>
                <Feather name={item.icon} size={16} color={Colors.textSecondary} />
                <Text style={styles.menuLabel}>{item.label}</Text>
              </View>
              <Feather name="chevron-right" size={16} color={Colors.textMuted} />
            </Pressable>
          ))}
        </View>

        <Pressable style={styles.logout} onPress={() => router.replace('/')}>
          <Text style={styles.logoutText}>ログアウト</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  hero: { alignItems: 'center', gap: 8, paddingVertical: Spacing.xxl },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.75)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { fontFamily: Fonts.bold, fontSize: 26, color: '#fff' },
  name: { fontFamily: Fonts.black, fontSize: 17, color: '#fff' },
  lang: { fontFamily: Fonts.medium, fontSize: 12, color: 'rgba(255,255,255,0.9)' },
  menu: { marginTop: Spacing.lg },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: Spacing.xl,
  },
  menuRowBorder: { borderTopWidth: 1, borderTopColor: Colors.divider },
  menuLeft: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  menuLabel: { fontFamily: Fonts.regular, fontSize: 13.5, color: Colors.text },
  logout: { marginTop: Spacing.lg, marginBottom: Spacing.xxl, alignItems: 'center' },
  logoutText: { fontFamily: Fonts.bold, fontSize: 13, color: Colors.danger },
});
