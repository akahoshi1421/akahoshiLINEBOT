import type { Gassmaスケジュール一覧CreateReturn } from "gassma";
import type { NewSchedule } from "../types/schema";
import { NotifySchedule } from "../types/lineMessageData";
import { getOneNotifyScheduleMessage } from "./getOneNotifyScheduleMessage";
import { MessageCreate } from "./messageCreate";

export class SendMessageController {
  private readonly LINE_URL: string;
  private readonly accessToken: string;
  private readonly groupId: string;
  private readonly messageCreate: MessageCreate;

  constructor() {
    this.LINE_URL = "https://api.line.me/v2/bot/message/push";
    this.accessToken =
      PropertiesService.getScriptProperties().getProperty(
        "CHANNEL_ACCESS_TOKEN"
      ) || "";
    this.groupId =
      PropertiesService.getScriptProperties().getProperty("GROUP_ID") || "";
    this.messageCreate = new MessageCreate();
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

    UrlFetchApp.fetch(this.LINE_URL, options);
  }

  public newMessage(data: NewSchedule) {
    const { eventName, eventDate, remarks, participants } = data;

    const message = `以下のスケジュールを作成しました。

${this.messageCreate.getEventNameMessage(
  eventName
)}${this.messageCreate.getDateMessage(
      eventDate
    )}${this.messageCreate.getParticipantsStringMessage(
      participants
    )}${this.messageCreate.getRemakrsMessage(remarks)}
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

    UrlFetchApp.fetch(this.LINE_URL, options);
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

    const message = `以下のスケジュールを変更しました。

変更前:
${this.messageCreate.getEventNameMessage(
  preEventName
)}${this.messageCreate.getDateMessage(
      preEventDate
    )}${this.messageCreate.getParticipantsMessage(
      preParticipants
    )}${this.messageCreate.getRemakrsMessage(preRemarks)}

=================================

変更後:
${this.messageCreate.getEventNameMessage(
  eventName
)}${this.messageCreate.getDateMessage(
      eventDate
    )}${this.messageCreate.getParticipantsMessage(
      participants
    )}${this.messageCreate.getRemakrsMessage(remarks)}
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

    UrlFetchApp.fetch(this.LINE_URL, options);
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

    const message = `以下のスケジュールを削除しました。

${this.messageCreate.getEventNameMessage(
  eventName
)}${this.messageCreate.getDateMessage(
      eventDate
    )}${this.messageCreate.getParticipantsMessage(
      participants
    )}${this.messageCreate.getRemakrsMessage(remarks)}
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

    UrlFetchApp.fetch(this.LINE_URL, options);
  }

  public notifyScheduleMessage(
    twoWeeksSchedulesAll: NotifySchedule[],
    oneWeekSchedulesAll: NotifySchedule[],
    threeDaysSchedulesAll: NotifySchedule[],
    oneDaySchedulesAll: NotifySchedule[]
  ) {
    const twoWeeksSchedulesMessages = getOneNotifyScheduleMessage(
      twoWeeksSchedulesAll,
      "2週間前"
    );
    const oneWeekSchedulesMessages = getOneNotifyScheduleMessage(
      oneWeekSchedulesAll,
      "1週間前"
    );
    const threeDaysSchedulesMessages = getOneNotifyScheduleMessage(
      threeDaysSchedulesAll,
      "3日前"
    );
    const oneDaySchedulesMessages = getOneNotifyScheduleMessage(
      oneDaySchedulesAll,
      "1日前"
    );

    const headers = this.getHeaders();

    const postData = {
      to: this.groupId,
      messages: [
        { type: "text", text: twoWeeksSchedulesMessages },
        { type: "text", text: oneWeekSchedulesMessages },
        { type: "text", text: threeDaysSchedulesMessages },
        { type: "text", text: oneDaySchedulesMessages },
      ].filter((oneMessage) => oneMessage.text !== ""),
    };

    if (postData.messages.length === 0) return;

    const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
      method: "post",
      headers: headers,
      payload: JSON.stringify(postData),
    };

    UrlFetchApp.fetch(this.LINE_URL, options);
  }
}
