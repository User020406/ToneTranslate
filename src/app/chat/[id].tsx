import { Feather } from '@expo/vector-icons';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Avatar } from '@/components/avatar';
import { useSettings, type DisplayMode } from '@/context/settings';
import { chatById, type Message } from '@/data/chats';
import { languageByCode } from '@/data/languages';
import { translateFor } from '@/lib/translate';
import { Colors, Fonts, Radius, Spacing } from '@/constants/theme';

const MODE_LABEL: Record<DisplayMode, string> = { auto: '自動翻訳', both: '原文＋翻訳', orig: '原文のみ' };
const MODES: DisplayMode[] = ['auto', 'both', 'orig'];

export default function ChatDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { nativeLanguage, defaultMode } = useSettings();
  const chat = chatById(id);

  const [mode, setMode] = useState<DisplayMode>(defaultMode);
  const [messages, setMessages] = useState<Message[]>(chat?.messages ?? []);
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [draft, setDraft] = useState('');

  const partnerLangName = useMemo(() => (chat ? languageByCode(chat.lang).nameJa : ''), [chat]);

  if (!chat) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text>チャットが見つかりません</Text>
      </SafeAreaView>
    );
  }

  const toggleReveal = (id: string) => setRevealed((r) => ({ ...r, [id]: !r[id] }));

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    setMessages((prev) => [
      ...prev,
      {
        id: `local-${Date.now()}`,
        sender: 'me',
        lang: nativeLanguage,
        text,
        translations: {},
        time: new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setDraft('');
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={10} style={styles.backButton}>
          <Feather name="chevron-left" size={22} color={Colors.text} />
        </Pressable>
        <Avatar initial={chat.initial} bg={chat.avatarBg} color={chat.avatarColor} size={34} />
        <View style={styles.headerBody}>
          <Text style={styles.headerName}>{chat.name}</Text>
          <Text style={styles.headerStatus}>{chat.online ? 'オンライン' : 'オフライン'}</Text>
        </View>
      </View>

      <View style={styles.modeSwitch}>
        {MODES.map((m) => (
          <Pressable key={m} onPress={() => setMode(m)} style={[styles.modeTab, mode === m && styles.modeTabActive]}>
            <Text style={[styles.modeTabLabel, mode === m && styles.modeTabLabelActive]}>{MODE_LABEL[m]}</Text>
          </Pressable>
        ))}
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={90}>
        <FlatList
          data={messages}
          keyExtractor={(m) => m.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <Bubble
              message={item}
              mode={mode}
              nativeLanguage={nativeLanguage}
              partnerLangName={partnerLangName}
              revealed={!!revealed[item.id]}
              onToggleReveal={() => toggleReveal(item.id)}
            />
          )}
        />

        <View style={styles.inputRow}>
          <View style={styles.plusButton}>
            <Feather name="plus" size={16} color={Colors.textMuted} />
          </View>
          <TextInput
            value={draft}
            onChangeText={setDraft}
            placeholder="メッセージを入力"
            placeholderTextColor={Colors.textMuted}
            style={styles.input}
            multiline
          />
          <Pressable onPress={send} style={styles.sendButton}>
            <Feather name="arrow-up" size={16} color="#fff" />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function Bubble({
  message,
  mode,
  nativeLanguage,
  partnerLangName,
  revealed,
  onToggleReveal,
}: {
  message: Message;
  mode: DisplayMode;
  nativeLanguage: Parameters<typeof translateFor>[1];
  partnerLangName: string;
  revealed: boolean;
  onToggleReveal: () => void;
}) {
  const isMine = message.sender === 'me';

  if (isMine) {
    return (
      <View style={[styles.bubbleWrap, styles.bubbleWrapMine]}>
        <View style={[styles.bubble, styles.bubbleMine]}>
          <Text style={styles.bubbleTextMine}>{message.text}</Text>
        </View>
        <Text style={[styles.bubbleTime, styles.bubbleTimeMine]}>{message.time}</Text>
      </View>
    );
  }

  const { text: translated, wasTranslated } = translateFor(message, nativeLanguage);

  if (mode === 'both') {
    return (
      <View style={[styles.bubbleWrap, styles.bubbleWrapTheirs]}>
        <View style={[styles.bubble, styles.bubbleTheirs]}>
          <Text style={styles.metaLabel}>ORIGINAL ・ {partnerLangName}</Text>
          <Text style={styles.bubbleTextTheirs}>{message.text}</Text>
          {wasTranslated && (
            <>
              <View style={styles.dashDivider} />
              <Text style={styles.metaLabel}>TRANSLATION</Text>
              <Text style={styles.bubbleTextTheirs}>{translated}</Text>
            </>
          )}
        </View>
        <Text style={styles.bubbleTime}>{message.time}</Text>
      </View>
    );
  }

  const showOriginal = mode === 'orig' ? !revealed : revealed;
  const primaryText = showOriginal ? message.text : translated;
  const footerLabel =
    mode === 'orig'
      ? revealed
        ? '原文に戻す'
        : '翻訳を表示'
      : revealed
        ? '翻訳に戻す'
        : `${partnerLangName}から自動翻訳 ・ 原文を見る`;

  return (
    <View style={[styles.bubbleWrap, styles.bubbleWrapTheirs]}>
      <View style={[styles.bubble, styles.bubbleTheirs]}>
        <Text style={styles.bubbleTextTheirs}>{primaryText}</Text>
        {wasTranslated && (
          <Pressable onPress={onToggleReveal}>
            <View style={styles.dashDivider} />
            <Text style={styles.footerLink}>{footerLabel}</Text>
          </Pressable>
        )}
      </View>
      <Text style={styles.bubbleTime}>{message.time}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  safe: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  backButton: { padding: 2 },
  headerBody: { flex: 1 },
  headerName: { fontFamily: Fonts.bold, fontSize: 14, color: Colors.text },
  headerStatus: { fontFamily: Fonts.medium, fontSize: 10.5, color: Colors.success },
  modeSwitch: {
    flexDirection: 'row',
    gap: 6,
    backgroundColor: Colors.backgroundSoft,
    margin: Spacing.md,
    padding: 5,
    borderRadius: Radius.pill,
  },
  modeTab: { flex: 1, borderRadius: Radius.pill, paddingVertical: 9, alignItems: 'center' },
  modeTabActive: { backgroundColor: Colors.primary },
  modeTabLabel: { fontFamily: Fonts.bold, fontSize: 11.5, color: Colors.textWarm },
  modeTabLabelActive: { color: '#fff' },
  listContent: { padding: Spacing.md, gap: Spacing.md },
  bubbleWrap: { maxWidth: '84%', marginBottom: Spacing.sm },
  bubbleWrapMine: { alignSelf: 'flex-end', alignItems: 'flex-end' },
  bubbleWrapTheirs: { alignSelf: 'flex-start', alignItems: 'flex-start' },
  bubble: { borderRadius: Radius.md, paddingVertical: 11, paddingHorizontal: 14 },
  bubbleMine: { backgroundColor: Colors.bubbleMine, borderBottomRightRadius: 5 },
  bubbleTheirs: {
    backgroundColor: Colors.bubbleTheirs,
    borderWidth: 1,
    borderColor: Colors.borderMuted,
    borderBottomLeftRadius: 5,
  },
  bubbleTextMine: { fontFamily: Fonts.regular, fontSize: 13.5, color: Colors.bubbleMineText, lineHeight: 20 },
  bubbleTextTheirs: { fontFamily: Fonts.regular, fontSize: 13.5, color: Colors.bubbleTheirsText, lineHeight: 20 },
  bubbleTime: { fontFamily: Fonts.regular, fontSize: 10, color: Colors.textMuted, marginTop: 4 },
  bubbleTimeMine: { textAlign: 'right' },
  metaLabel: { fontFamily: Fonts.bold, fontSize: 9, color: Colors.textMuted, letterSpacing: 0.6 },
  dashDivider: { height: 1, borderTopWidth: 1, borderTopColor: Colors.divider, borderStyle: 'dashed', marginVertical: 7 },
  footerLink: { fontFamily: Fonts.bold, fontSize: 10.5, color: Colors.primary },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: Spacing.sm,
    padding: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
  },
  plusButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.chipBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    maxHeight: 100,
    backgroundColor: Colors.chipBg,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.md,
    paddingVertical: 8,
    fontFamily: Fonts.regular,
    fontSize: 13,
    color: Colors.text,
  },
  sendButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
