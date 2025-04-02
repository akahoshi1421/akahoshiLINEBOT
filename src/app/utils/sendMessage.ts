import type { Gassmaスケジュール一覧CreateReturn } from "gassma";

export class SendMessageController {
  private readonly URL: string = "https://api.line.me/v2/bot/message/push";
  private readonly accessToken: string;
  private readonly groupId: string;

  constructor() {
    this.accessToken =
      PropertiesService.getScriptProperties().getProperty(
        "CHANNEL_ACCESS_TOKEN"
      ) || "";
    this.groupId =
      PropertiesService.getScriptProperties().getProperty("GROUP_ID") || "";
  }

  private getHeaders() {
    return {
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.accessToken,
    };
  }

  public sendErrorMessage(messages: string[]) {
    const headers = this.getHeaders();

    const postData = {
      to: this.groupId,
      messages: [{ type: "text", text: messages.join("\n") }],
    };

    const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
      method: "post",
      headers: headers,
      payload: JSON.stringify(postData),
    };

    UrlFetchApp.fetch(this.URL, options);
  }

  public changeMessage(
    preSchedule: Gassmaスケジュール一覧CreateReturn,
    preParticipants: string[],
    schedule: Gassmaスケジュール一覧CreateReturn,
    participants: string[]
  ) {
    const {
      イベント名: preEventName,
      集合時間: preEventDate,
      備考: preRemarks,
    } = preSchedule;

    const {
      イベント名: eventName,
      集合時間: eventDate,
      備考: remarks,
    } = schedule;

    const message = `
以下のスケジュールを変更しました。

変更前:
イベント名: ${preEventName}
${
  preEventDate
    ? "集合時間: " +
      Utilities.formatDate(preEventDate, "JST", "yyyy-MM-dd HH:mm")
    : ""
}
  ${preParticipants.length ? "参加者: " + preParticipants.join(",") : ""}
  ${preRemarks ? "備考: " + preRemarks : ""}

=================================

変更後:
イベント名: ${eventName}
${
  eventDate
    ? "集合時間: " + Utilities.formatDate(eventDate, "JST", "yyyy-MM-dd HH:mm")
    : ""
}
${participants.length ? "参加者: " + participants.join(",") : ""}
${remarks ? "備考: " + remarks : ""}
`;

    const headers = this.getHeaders();

    const postData = {
      to: this.groupId,
      messages: [{ type: "text", text: message }],
    };

    const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
      method: "post",
      headers: headers,
      payload: JSON.stringify(postData),
    };

    UrlFetchApp.fetch(this.URL, options);
  }

  public deleteMessage(
    schedule: Gassmaスケジュール一覧CreateReturn,
    participants: string[]
  ) {
    const {
      イベント名: eventName,
      集合時間: eventDate,
      備考: remarks,
    } = schedule;

    const message = `
以下のスケジュールを削除しました。

イベント名: ${eventName}
${
  eventDate
    ? "集合時間: " + Utilities.formatDate(eventDate, "JST", "yyyy-MM-dd HH:mm")
    : ""
}
${participants.length ? "参加者: " + participants.join(",") : ""}
${remarks ? "備考: " + remarks : ""}
`;

    const headers = this.getHeaders();

    const postData = {
      to: this.groupId,
      messages: [{ type: "text", text: message }],
    };

    const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
      method: "post",
      headers: headers,
      payload: JSON.stringify(postData),
    };

    UrlFetchApp.fetch(this.URL, options);
  }
}
