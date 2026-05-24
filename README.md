# LINE スケジュール通知くん

スケジュールを管理し、予定が近づくと LINE に通知する Google Apps Script (GAS) アプリです。

- **操作**（一覧表示・登録・編集・削除・参加者管理）は **GAS 上の React Web アプリ**で行います
- **LINE は通知専用**。予定のリマインド通知と、「BOT」を含むメッセージへの Web アプリ URL 返信のみを担います

データは Google スプレッドシートに保存し、[GASsma](https://www.npmjs.com/package/gassma)（Prisma 風に Sheets を扱うライブラリ）経由でアクセスします。

## 機能

### Web アプリ（React）

GAS の `doGet` で配信される SPA。`google.script.run` でサーバの API を呼びます。

- **トップ `/`**: 日程未定＋未来のスケジュール一覧。イベント名・集合時間・備考をインライン編集（onBlur 保存）、最下行から新規追加、行削除。イベント名から詳細ページへ
- **詳細 `/:id`**: タイトル・集合時間・備考の表示と、参加者の追加・削除
- **過去 `/past`**: 過去のスケジュール一覧（詳細へ遷移可）

### LINE 通知

- `notify`: 2 週間前・1 週間前・3 日前・1 日前の予定をグループへ push 通知（時間トリガーで定期実行）
- `doPost`: 「BOT」（大文字小文字問わず）を含むメッセージを受け取ると、Web アプリの URL をグループへ push 返信

## 技術スタック

- **サーバ (GAS)**: TypeScript + webpack（`gas-webpack-plugin`）+ Babel、GASsma
- **フロント**: Vite + React + Chakra UI + React Router(MemoryRouter) + jotai / jotai-tanstack-query、date-fns
  - `vite-plugin-singlefile` で単一 HTML 化し、GAS の HTML として配信

## ディレクトリ構成

```
gassma/schema.prisma      # スプレッドシートのスキーマ定義（GASsma）
src/                      # GAS サーバ（webpack で bundle.js に）
  index.ts                # global 登録（doGet / doPost / notify / api*）
  app/server/             # doGet・google.script.run 用 API・LINE Webhook
  app/utils/              # SheetController（GASsma）・通知メッセージ生成 ほか
  generated/gassma/       # gassma generate の生成物（gitignore）
web/                      # React Web アプリ（Vite）
  src/pages/{top,detail,past}/   # ページと配下の components/
  src/hooks/              # ページ・フォーム用カスタムフック
  src/atoms/              # jotai-tanstack-query の query / mutation
  src/api/                # google.script.run ラッパ（GAS 外では mock）
```

## セットアップ

### 1. 依存インストール

```bash
npm install
```

### 2. スプレッドシート

以下の 2 シートを用意します（列名は `gassma/schema.prisma` の `@map`/`@@map` に対応）。

- **スケジュール一覧**: `id`（自動採番） / `イベント名` / `集合時間` / `備考`
- **参加者**: `イベントid` / `参加者名`

`イベントid` がスケジュールの `id` を指す 1 対多リレーションです。

### 3. スクリプトプロパティ

GAS のスクリプトプロパティに設定します。

| キー | 用途 |
| --- | --- |
| `CHANNEL_ACCESS_TOKEN` | LINE Messaging API のチャネルアクセストークン |
| `GROUP_ID` | 通知・返信先のグループ ID |
| `WEB_APP_URL` | デプロイ後の Web アプリ URL（「BOT」返信で表示。デプロイごとに更新） |

### 4. GAS ライブラリ

GASsma を GAS ライブラリとして追加します（`appsscript.json` で設定済み）。リレーション対応の v1 が必要です。

## ビルド & デプロイ

```bash
npm run build   # gassma generate → webpack → vite build を実行し dist/ を生成
npm run push    # build 後に clasp push（GAS へ反映）
```

`dist/` には GAS サーバ（`bundle.js`）と Web アプリ（単一 HTML の `index.html`）、`appsscript.json` が出力されます。

デプロイ後の対応:

1. GAS で**ウェブアプリとしてデプロイ**（アクセス権・実行ユーザーは用途に応じて設定）
2. 発行された URL をスクリプトプロパティ `WEB_APP_URL` に設定
3. `notify` を時間主導型トリガーに登録

## ローカル開発

```bash
npm run dev   # Vite 開発サーバ
```

GAS 外では `google.script.run` が無いため、`web/src/api/mock.ts` のインメモリ実装に自動でフォールバックします（UI を単体で確認可能）。

## スキーマ変更

`gassma/schema.prisma` を編集したら、`npm run build`（内部で `gassma generate`）で型安全なクライアントが再生成されます。
