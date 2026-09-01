import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useSettings, type DisplayMode } from '@/context/settings';
import { LANGUAGES, type LanguageCode } from '@/data/languages';
import { Colors, Fonts, Radius, Spacing } from '@/constants/theme';

const MODE_LABEL: Record<DisplayMode, string> = { auto: '自動翻訳', both: '原文＋翻訳', orig: '原文のみ' };

function LanguagePicker({
  value,
  onChange,
  excludeNone,
}: {
  value: LanguageCode;
  onChange: (v: LanguageCode) => void;
  excludeNone?: boolean;
}) {
  return (
    <View style={styles.optionList}>
      {LANGUAGES.map((lang) => (
        <Pressable key={lang.code} onPress={() => onChange(lang.code)} style={styles.optionRow}>
          <Text style={styles.optionText}>
            {lang.flag} {lang.nameJa}
          </Text>
          {value === lang.code && <Feather name="check" size={16} color={Colors.primary} />}
        </Pressable>
      ))}
    </View>
  );
}

function SettingRow({
  label,
  valueLabel,
  valueColor,
  hint,
  expanded,
  onToggle,
  children,
}: {
  label: string;
  valueLabel: string;
  valueColor?: string;
  hint?: string;
  expanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.card}>
      <Pressable onPress={onToggle} style={styles.cardHeader}>
        <View>
          <Text style={styles.cardLabel}>{label}</Text>
          {hint && <Text style={styles.cardHint}>{hint}</Text>}
        </View>
        <View style={styles.cardValueRow}>
          <Text style={[styles.cardValue, valueColor && { color: valueColor }]}>{valueLabel}</Text>
          <Feather name={expanded ? 'chevron-up' : 'chevron-right'} size={16} color={Colors.textMuted} />
        </View>
      </Pressable>
      {expanded && children}
    </View>
  );
}

export default function TranslationSettings() {
  const settings = useSettings();
  const [open, setOpen] = useState<string | null>(null);
  const [showAllPriority, setShowAllPriority] = useState(false);

  const toggle = (key: string) => setOpen((cur) => (cur === key ? null : key));
  const nativeLang = LANGUAGES.find((l) => l.code === settings.nativeLanguage)!;
  const displayLang = LANGUAGES.find((l) => l.code === settings.displayLanguage)!;
  const noTranslateLang = LANGUAGES.find((l) => l.code === settings.noTranslateLanguage)!;

  const priorityList = showAllPriority ? settings.languagePriority : settings.languagePriority.slice(0, 3);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>翻訳設定</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.sectionLabel}>私の設定</Text>

        <SettingRow
          label="母国語"
          valueLabel={`${nativeLang.flag} ${nativeLang.nameJa}`}
          expanded={open === 'native'}
          onToggle={() => toggle('native')}>
          <LanguagePicker value={settings.nativeLanguage} onChange={settings.setNativeLanguage} />
        </SettingRow>

        <SettingRow
          label="表示言語"
          valueLabel={`${displayLang.flag} ${displayLang.nameJa}`}
          expanded={open === 'display'}
          onToggle={() => toggle('display')}>
          <LanguagePicker value={settings.displayLanguage} onChange={settings.setDisplayLanguage} />
        </SettingRow>

        <SettingRow
          label="翻訳不要の言語"
          hint="この言語のメッセージは翻訳しません"
          valueLabel={`${noTranslateLang.flag} ${noTranslateLang.nameJa}`}
          valueColor={Colors.primary}
          expanded={open === 'noTranslate'}
          onToggle={() => toggle('noTranslate')}>
          <LanguagePicker value={settings.noTranslateLanguage} onChange={settings.setNoTranslateLanguage} />
        </SettingRow>

        <SettingRow
          label="初期モード"
          valueLabel={MODE_LABEL[settings.defaultMode]}
          expanded={open === 'mode'}
          onToggle={() => toggle('mode')}>
          <View style={styles.optionList}>
            {(Object.keys(MODE_LABEL) as DisplayMode[]).map((mode) => (
              <Pressable key={mode} onPress={() => settings.setDefaultMode(mode)} style={styles.optionRow}>
                <Text style={styles.optionText}>{MODE_LABEL[mode]}</Text>
                {settings.defaultMode === mode && <Feather name="check" size={16} color={Colors.primary} />}
              </Pressable>
            ))}
          </View>
        </SettingRow>

        <Text style={styles.sectionLabel}>対応言語の優先順位</Text>
        <View style={styles.card}>
          {priorityList.map((code, i) => {
            const lang = LANGUAGES.find((l) => l.code === code)!;
            return (
              <View key={code} style={[styles.priorityRow, i > 0 && styles.priorityRowBorder]}>
                <Text style={styles.priorityIndex}>{i + 1}</Text>
                <Text style={styles.optionText}>
                  {lang.flag} {lang.nameJa}
                </Text>
              </View>
            );
          })}
        </View>
        <Pressable onPress={() => setShowAllPriority((v) => !v)}>
          <Text style={styles.showAll}>{showAllPriority ? '閉じる' : 'すべて表示'}</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.backgroundSoft },
  header: { paddingHorizontal: Spacing.xl, paddingTop: Spacing.sm, backgroundColor: Colors.background },
  title: { fontFamily: Fonts.black, fontSize: 24, color: Colors.text, paddingBottom: Spacing.md },
  scroll: { padding: Spacing.xl, gap: Spacing.sm },
  sectionLabel: {
    fontFamily: Fonts.bold,
    fontSize: 10.5,
    color: Colors.textMuted,
    letterSpacing: 0.6,
    marginTop: Spacing.sm,
    marginBottom: Spacing.xs,
  },
  card: {
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.borderMuted,
    borderRadius: Radius.md,
    overflow: 'hidden',
    marginBottom: Spacing.sm,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: Spacing.md,
  },
  cardLabel: { fontFamily: Fonts.medium, fontSize: 13, color: Colors.text },
  cardHint: { fontFamily: Fonts.regular, fontSize: 10.5, color: Colors.textMuted, marginTop: 3, maxWidth: 200 },
  cardValueRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  cardValue: { fontFamily: Fonts.medium, fontSize: 13, color: Colors.textSecondary },
  optionList: { borderTopWidth: 1, borderTopColor: Colors.divider },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
  },
  optionText: { fontFamily: Fonts.regular, fontSize: 13, color: Colors.text },
  priorityRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, paddingVertical: 11, paddingHorizontal: Spacing.md },
  priorityRowBorder: { borderTopWidth: 1, borderTopColor: Colors.divider },
  priorityIndex: { fontFamily: Fonts.medium, fontSize: 11, color: Colors.textMuted, width: 14 },
  showAll: { fontFamily: Fonts.bold, fontSize: 12, color: Colors.primary, textAlign: 'center', marginTop: Spacing.xs },
});
