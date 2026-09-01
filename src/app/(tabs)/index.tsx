import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Avatar } from '@/components/avatar';
import { useSettings } from '@/context/settings';
import { CHATS, lastMessage, type Chat } from '@/data/chats';
import { translateFor } from '@/lib/translate';
import { Colors, Fonts, Radius, Spacing } from '@/constants/theme';

type Filter = 'all' | 'unread' | 'favourite';

export default function ChatList() {
  const { nativeLanguage } = useSettings();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('all');

  const chats = useMemo(() => {
    return CHATS.filter((c) => {
      if (filter === 'unread' && c.unread === 0) return false;
      if (filter === 'favourite' && !c.favourite) return false;
      if (query && !c.name.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [filter, query]);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>チャット</Text>
        <View style={styles.addButton}>
          <Feather name="plus" size={16} color={Colors.primary} />
        </View>
      </View>

      <View style={styles.searchBox}>
        <Feather name="search" size={14} color={Colors.textMuted} />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="検索"
          placeholderTextColor={Colors.textMuted}
          style={styles.searchInput}
        />
      </View>

      <View style={styles.chips}>
        {(
          [
            ['all', 'すべて'],
            ['unread', '未読'],
            ['favourite', 'お気に入り'],
          ] as const
        ).map(([key, label]) => (
          <Pressable key={key} onPress={() => setFilter(key)} style={[styles.chip, filter === key && styles.chipActive]}>
            <Text style={[styles.chipLabel, filter === key && styles.chipLabelActive]}>{label}</Text>
          </Pressable>
        ))}
      </View>

      <FlatList
        data={chats}
        keyExtractor={(c) => c.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => <ChatRow chat={item} previewLang={nativeLanguage} />}
      />
    </SafeAreaView>
  );
}

function ChatRow({ chat, previewLang }: { chat: Chat; previewLang: Parameters<typeof translateFor>[1] }) {
  const last = lastMessage(chat);
  const preview = last ? translateFor(last, previewLang).text : '';

  return (
    <Pressable
      onPress={() => router.push({ pathname: '/chat/[id]', params: { id: chat.id } })}
      style={({ pressed }) => [styles.row, pressed && { backgroundColor: Colors.backgroundSoft }]}>
      <View>
        <Avatar initial={chat.initial} bg={chat.avatarBg} color={chat.avatarColor} />
        {chat.online && <View style={styles.onlineDot} />}
      </View>
      <View style={styles.rowBody}>
        <View style={styles.rowTop}>
          <Text style={styles.rowName}>{chat.name}</Text>
          <Text style={styles.rowTime}>{last?.time}</Text>
        </View>
        <Text numberOfLines={1} style={styles.rowPreview}>
          {preview}
        </Text>
      </View>
      {chat.unread > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{chat.unread}</Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.sm,
  },
  title: { fontFamily: Fonts.black, fontSize: 24, color: Colors.text },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.tint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.chipBg,
    borderRadius: Radius.pill,
    marginHorizontal: Spacing.xl,
    marginTop: Spacing.md,
    paddingHorizontal: Spacing.md,
    height: 36,
  },
  searchInput: { flex: 1, fontFamily: Fonts.regular, fontSize: 13, color: Colors.text },
  chips: { flexDirection: 'row', gap: Spacing.xs, paddingHorizontal: Spacing.xl, marginTop: Spacing.md },
  chip: { paddingVertical: 6, paddingHorizontal: Spacing.md, borderRadius: Radius.pill, backgroundColor: Colors.tint },
  chipActive: { backgroundColor: Colors.primary },
  chipLabel: { fontFamily: Fonts.bold, fontSize: 11, color: Colors.textWarm },
  chipLabelActive: { color: '#fff' },
  listContent: { paddingTop: Spacing.md, paddingBottom: Spacing.xxl },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
  },
  onlineDot: {
    position: 'absolute',
    right: -1,
    bottom: -1,
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: Colors.success,
    borderWidth: 2,
    borderColor: '#fff',
  },
  rowBody: { flex: 1, gap: 3 },
  rowTop: { flexDirection: 'row', justifyContent: 'space-between', gap: Spacing.sm },
  rowName: { fontFamily: Fonts.bold, fontSize: 14.5, color: Colors.text },
  rowTime: { fontFamily: Fonts.regular, fontSize: 11, color: Colors.textMuted },
  rowPreview: { fontFamily: Fonts.regular, fontSize: 12.5, color: Colors.textSecondary },
  badge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    paddingHorizontal: 6,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: { fontFamily: Fonts.bold, fontSize: 10.5, color: '#fff' },
});
