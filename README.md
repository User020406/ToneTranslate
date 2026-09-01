# ToneTranslate

母国語のまま、世界中と話せる自動翻訳メッセージアプリ。[ToneTranslate LP](./) のデザイン・コンセプトをベースにした Expo (React Native) 製アプリです。

## できること

- **チャット一覧** — 会話ごとの未読・オンライン状態・検索/フィルタ
- **1対1チャット** — 送信・受信を自動翻訳。3つの表示モードを切り替え可能
  - 自動翻訳 — 翻訳結果のみ表示（原文はタップで確認）
  - 原文＋翻訳 — 原文と翻訳を並べて表示
  - 原文のみ — 原文のみ表示（翻訳はタップで表示）
- **翻訳設定** — 母国語 / 表示言語 / 翻訳不要の言語 / 初期モード / 対応言語の優先順位
- **プロフィール** — アカウント関連メニュー
- 対応言語（MVP）: 日本語・英語・韓国語・中国語・スペイン語

## 開発を始める

```bash
npm install
npx expo start
```

`w` で Web、`i` / `a` で iOS / Android シミュレータを起動できます（file-based routing, `src/app` 配下）。

## 実装メモ

- ナビゲーション: `expo-router`（オンボーディング → ログイン → タブ → チャット詳細）
- 状態管理: 軽量な React Context（`src/context/settings.tsx`）。永続化はまだ行っていません
- **翻訳はモックです。** `src/data/chats.ts` に会話ごとの原文とあらかじめ用意した翻訳文を保持し、`src/lib/translate.ts` の `translateFor()` がそれを返します。実際の翻訳 API（例: DeepL, Google Cloud Translation など）やバックエンドに接続する場合は、この関数の実装を差し替えてください
- フォント: `Noto Sans JP`（`@expo-google-fonts/noto-sans-jp`）
- カラーパレット: `src/constants/theme.ts`（LPのオレンジ基調デザインを踏襲）

## ディレクトリ構成

```
src/
  app/                 expo-router のルート
    index.tsx          オンボーディング
    login.tsx          ログイン・登録
    (tabs)/            チャット / 連絡先 / 翻訳設定 / プロフィール
    chat/[id].tsx       チャット詳細（3モード切替）
  components/          Avatar, PillButton など共通UI
  context/settings.tsx 翻訳設定の状態管理
  data/                モックデータ（言語・チャット）
  lib/translate.ts     翻訳ロジック（モック）
  constants/theme.ts   カラー・フォント・余白
```
