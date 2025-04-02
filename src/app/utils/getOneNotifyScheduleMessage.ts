import type { NotifySchedule } from "../types/lineMessageData";

export const getOneNotifyScheduleMessage = (
  schedulesAll: NotifySchedule[],
  ago: "2週間前" | "1週間前" | "3日前" | "1日前"
) => {
  const schedulesMessages = schedulesAll.reduce((pre, schedule) => {
    const {
      イベント名: eventName,
      集合時間: eventDate,
      備考: remarks,
    } = schedule.schedule;

    return (
      pre +
      `
  イベント名: ${eventName}
  ${
    eventDate
      ? "集合時間: " +
        Utilities.formatDate(eventDate, "JST", "yyyy-MM-dd HH:mm")
      : ""
  }
  ${
    schedule.participants.length
      ? "参加者: " + schedule.participants.join(",")
      : ""
  }
  ${remarks ? "備考: " + remarks : ""}
  `
    );
  }, `以下のスケジュールが${ago}です\n`);

  return schedulesAll.length ? schedulesMessages : "";
};
