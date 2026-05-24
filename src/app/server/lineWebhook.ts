// LINE Webhook ハンドラ。
// 「BOT」(大文字小文字問わず)を含むメッセージを受け取ったら、
// GAS Web アプリの URL（スクリプトプロパティ WEB_APP_URL）を返信する。
// URL はデプロイごとに変わるため、コードに埋め込まずプロパティから読み出す。

const LINE_REPLY_URL = "https://api.line.me/v2/bot/message/reply";

// Web アプリ URL を保持するスクリプトプロパティのキー
const WEB_APP_URL_KEY = "WEB_APP_URL";

type LineWebhookEvent = {
  type: string;
  replyToken?: string;
  message?: { type: string; text?: string };
};

type LineWebhookBody = {
  events?: LineWebhookEvent[];
};

const reply = (replyToken: string, text: string) => {
  const accessToken =
    PropertiesService.getScriptProperties().getProperty(
      "CHANNEL_ACCESS_TOKEN"
    ) || "";

  const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
    payload: JSON.stringify({
      replyToken,
      messages: [{ type: "text", text }],
    }),
  };

  UrlFetchApp.fetch(LINE_REPLY_URL, options);
};

const getWebAppMessage = () => {
  const url =
    PropertiesService.getScriptProperties().getProperty(WEB_APP_URL_KEY) || "";

  return url
    ? `スケジュール管理ページはこちら👇\n${url}`
    : `Web アプリの URL が未設定です。スクリプトプロパティ「${WEB_APP_URL_KEY}」を設定してください。`;
};

export function doPost(e: GoogleAppsScript.Events.DoPost) {
  const body: LineWebhookBody = JSON.parse(e.postData.contents);

  body.events?.forEach((event) => {
    if (event.type !== "message" || event.message?.type !== "text") return;
    if (!event.replyToken) return;

    const text = event.message.text ?? "";
    // 「BOT」を含むか（大文字小文字問わず）
    if (!/bot/i.test(text)) return;

    reply(event.replyToken, getWebAppMessage());
  });

  return ContentService.createTextOutput(
    JSON.stringify({ status: "ok" })
  ).setMimeType(ContentService.MimeType.JSON);
}
