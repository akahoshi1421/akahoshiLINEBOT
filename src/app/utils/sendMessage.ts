import type { NotifySchedule } from "../types/lineMessageData";
import { getOneNotifyScheduleMessage } from "./getOneNotifyScheduleMessage";

export class SendMessageController {
  private readonly LINE_URL: string;
  private readonly accessToken: string;
  private readonly groupId: string;

  constructor() {
    this.LINE_URL = "https://api.line.me/v2/bot/message/push";
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

  // 単一テキストをグループへ push する
  public pushMessage(text: string) {
    const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
      method: "post",
      headers: this.getHeaders(),
      payload: JSON.stringify({
        to: this.groupId,
        messages: [{ type: "text", text }],
      }),
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
