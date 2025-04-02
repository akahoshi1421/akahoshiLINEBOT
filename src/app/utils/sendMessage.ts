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
}
