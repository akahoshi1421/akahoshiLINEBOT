import { newScheduleSchema } from "./schema/newScheduleSchema";
import type { LineMessageData } from "./types/lineMessageData";

export function doPost(e: GoogleAppsScript.Events.DoPost) {
  const messageData: LineMessageData = JSON.parse(e.postData.contents);
  const eventText = messageData.events[0]?.message.text || "";

  const isMatch = eventText.match(/^あかほしBOT:/);

  if (!isMatch) return;
}

export function testFunc() {
  const hoge = {
    various: "",
    eventName: "",
    eventDate: new Date("2025/4/10 10:00"),
    participants: "あかほし",
  };

  const data = newScheduleSchema.parse(hoge);
  console.log(data);
}
