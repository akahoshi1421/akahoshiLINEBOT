import type { LineMessageData } from "./types/lineMessageData";

export function doPost(e: GoogleAppsScript.Events.DoPost) {
  const messageData: LineMessageData = JSON.parse(e.postData.contents);
  const eventText = messageData.events[0]?.message.text || "";
}
