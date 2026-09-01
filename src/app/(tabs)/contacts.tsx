import { router } from 'expo-router';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Avatar } from '@/components/avatar';
import { CHATS } from '@/data/chats';
import { languageByCode } from '@/data/languages';
import { Colors, Fonts, Spacing } from '@/constants/theme';

export default function Contacts() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>連絡先</Text>
      </View>
      <FlatList
        data={CHATS}
        keyExtractor={(c) => c.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => {
          const lang = languageByCode(item.lang);
          return (
            <Pressable
              onPress={() => router.push({ pathname: '/chat/[id]', params: { id: item.id } })}
              style={({ pressed }) => [styles.row, pressed && { backgroundColor: Colors.backgroundSoft }]}>
              <Avatar initial={item.initial} bg={item.avatarBg} color={item.avatarColor} />
              <View style={styles.rowBody}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.lang}>
                  {lang.flag} {lang.nameJa}
                </Text>
              </View>
            </Pressable>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: { paddingHorizontal: Spacing.xl, paddingTop: Spacing.sm },
  title: { fontFamily: Fonts.black, fontSize: 24, color: Colors.text },
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
  rowBody: { gap: 3 },
  name: { fontFamily: Fonts.bold, fontSize: 14.5, color: Colors.text },
  lang: { fontFamily: Fonts.regular, fontSize: 12, color: Colors.textSecondary },
});
