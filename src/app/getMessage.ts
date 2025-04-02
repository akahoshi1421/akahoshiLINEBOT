import { newScheduleSchema } from "./schema/newScheduleSchema";
import type { LineMessageData } from "./types/lineMessageData";
import { doValidation } from "./utils/doValidation";
import { changeToArrayData } from "./utils/changeToArrayData";

export function doPost(e: GoogleAppsScript.Events.DoPost) {
  const messageData: LineMessageData = JSON.parse(e.postData.contents);
  const eventText = messageData.events[0]?.message.text || "";

  const isMatch = eventText.match(/^あかほしBOT:\n/);

  if (!isMatch) return;

  const changedArrayData = changeToArrayData(eventText.split("\n"));
  const isSuccessValidation = doValidation(changedArrayData);

  if (!isSuccessValidation) return;
}

export function testFunc() {
  const hoge = {
    various: "",
    eventName: "",
    eventDate: new Date("2025/4/10 10:00"),
    participants: "あかほし",
  };

  const data = newScheduleSchema.safeParse(hoge);
  console.log(data.error?.errors[0]);
}
