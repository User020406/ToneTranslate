import type { LanguageCode } from './languages';

export type Message = {
  id: string;
  sender: 'me' | 'them';
  lang: LanguageCode;
  text: string;
  /** Pre-translated text keyed by target language (mocked — no live API). */
  translations: Partial<Record<LanguageCode, string>>;
  time: string;
};

export type Chat = {
  id: string;
  name: string;
  initial: string;
  avatarBg: string;
  avatarColor: string;
  lang: LanguageCode;
  online: boolean;
  unread: number;
  favourite?: boolean;
  messages: Message[];
};

export const CHATS: Chat[] = [
  {
    id: 'sora',
    name: 'Sora Kim',
    initial: 'S',
    avatarBg: '#FFE1CC',
    avatarColor: '#FF6B00',
    lang: 'ko',
    online: true,
    unread: 2,
    favourite: true,
    messages: [
      {
        id: 'm1',
        sender: 'me',
        lang: 'ja',
        text: '来週、日本に来る予定ある？',
        translations: { ko: '다음 주에 일본에 올 예정이야?', en: 'Are you coming to Japan next week?' },
        time: '10:38',
      },
      {
        id: 'm2',
        sender: 'them',
        lang: 'ko',
        text: '응, 금요일에 도착해!',
        translations: { ja: 'うん、金曜日に着くよ！', en: 'Yeah, I arrive on Friday!' },
        time: '10:40',
      },
      {
        id: 'm3',
        sender: 'me',
        lang: 'ja',
        text: 'じゃあ、空港まで迎えに行くよ！',
        translations: { ko: '그럼 공항까지 마중 갈게!', en: "I'll pick you up at the airport then!" },
        time: '10:41',
      },
      {
        id: 'm4',
        sender: 'them',
        lang: 'ko',
        text: '응! 금요일에 도착해!',
        translations: { ja: 'うん！金曜日に到着するよ！', en: 'Yes! I arrive on Friday!' },
        time: '10:30',
      },
    ],
  },
  {
    id: 'emma',
    name: 'Emma Johnson',
    initial: 'E',
    avatarBg: '#FFE9D6',
    avatarColor: '#E07A28',
    lang: 'en',
    online: false,
    unread: 0,
    messages: [
      {
        id: 'm1',
        sender: 'them',
        lang: 'en',
        text: "Sure! Let's meet there.",
        translations: { ja: 'うん！そこで会おう。', ko: '좋아! 거기서 만나자.' },
        time: '9:15',
      },
      {
        id: 'm2',
        sender: 'me',
        lang: 'ja',
        text: '了解！11時でどう？',
        translations: { en: 'Got it! How about 11 AM?' },
        time: '9:16',
      },
    ],
  },
  {
    id: 'li',
    name: 'Li Wei',
    initial: 'L',
    avatarBg: '#FFF1E7',
    avatarColor: '#C98A4B',
    lang: 'zh',
    online: false,
    unread: 0,
    messages: [
      {
        id: 'm1',
        sender: 'them',
        lang: 'zh',
        text: '好的，我明天发给你。',
        translations: { ja: 'わかった、明日送るね。', en: "OK, I'll send it to you tomorrow." },
        time: '昨日',
      },
    ],
  },
  {
    id: 'carlos',
    name: 'Carlos García',
    initial: 'C',
    avatarBg: '#FFE1CC',
    avatarColor: '#FF6B00',
    lang: 'es',
    online: true,
    unread: 0,
    messages: [
      {
        id: 'm1',
        sender: 'them',
        lang: 'es',
        text: '¡Gracias! Nos vemos.',
        translations: { ja: 'ありがとう！また会おうね。', en: 'Thanks! See you.' },
        time: '昨日',
      },
    ],
  },
];

export function chatById(id: string): Chat | undefined {
  return CHATS.find((c) => c.id === id);
}

export function lastMessage(chat: Chat): Message | undefined {
  return chat.messages[chat.messages.length - 1];
}
