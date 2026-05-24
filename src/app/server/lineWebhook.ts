// LINE Webhook ハンドラ。
// 「BOT」(大文字小文字問わず)を含むメッセージを受け取ったら、
// GAS Web アプリの URL（スクリプトプロパティ WEB_APP_URL）をグループへ push する。
// URL はデプロイごとに変わるため、コードに埋め込まずプロパティから読み出す。

import { SendMessageController } from "../utils/sendMessage";

// Web アプリ URL を保持するスクリプトプロパティのキー
const WEB_APP_URL_KEY = "WEB_APP_URL";

type LineWebhookEvent = {
  type: string;
  message?: { type: string; text?: string };
};

type LineWebhookBody = {
  events?: LineWebhookEvent[];
};

const getWebAppMessage = () => {
  const url =
    PropertiesService.getScriptProperties().getProperty(WEB_APP_URL_KEY) || "";

  return url
    ? `スケジュール管理ページはこちら👇\n${url}`
    : `Web アプリの URL が未設定です。スクリプトプロパティ「${WEB_APP_URL_KEY}」を設定してください。`;
};

const includesBot = (event: LineWebhookEvent) =>
  event.type === "message" &&
  event.message?.type === "text" &&
  // 「BOT」を含むか（大文字小文字問わず）
  /bot/i.test(event.message.text ?? "");

export function doPost(e: GoogleAppsScript.Events.DoPost) {
  const body: LineWebhookBody = JSON.parse(e.postData.contents);

  if ((body.events ?? []).some(includesBot)) {
    new SendMessageController().pushMessage(getWebAppMessage());
  }

  return ContentService.createTextOutput(
    JSON.stringify({ status: "ok" })
  ).setMimeType(ContentService.MimeType.JSON);
}
