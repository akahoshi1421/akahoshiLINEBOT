import type { NotifySchedule } from "../types/lineMessageData";
import { MessageCreate } from "./messageCreate";

export const getOneNotifyScheduleMessage = (
  schedulesAll: NotifySchedule[],
  ago: "2週間前" | "1週間前" | "3日前" | "1日前"
) => {
  const messageCreate = new MessageCreate();

  const schedulesMessages = schedulesAll.reduce((pre, schedule) => {
    const {
      イベント名: eventName,
      集合時間: eventDate,
      備考: remarks,
    } = schedule.schedule;

    return (
      pre +
      `
${messageCreate.getEventNameMessage(eventName)}${messageCreate.getDateMessage(
        eventDate
      )}${messageCreate.getParticipantsMessage(
        schedule.participants
      )}${messageCreate.getRemakrsMessage(remarks)}
`
    );
  }, `以下のスケジュールが${ago}です\n`);

  return schedulesAll.length ? schedulesMessages : "";
};
