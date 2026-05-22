import type { NotifySchedule } from "../types/lineMessageData";
import { MessageCreate } from "./messageCreate";

export const getAllInOneNotifyScheduleMessage = (
  schedulesAll: NotifySchedule[]
) => {
  const messageCreate = new MessageCreate();

  const schedulesMessages = schedulesAll.reduce((pre, schedule) => {
    const {
      eventName,
      eventDate,
      remarks,
    } = schedule.schedule;

    return (
      pre +
      `
${messageCreate.getEventNameMessage(eventName)}${messageCreate.getDateMessage(
        eventDate
      )}${messageCreate.getParticipantsMessage(
        schedule.participants
      )}${messageCreate.getRemakrsMessage(remarks)}`
    );
  }, "スケジュール予定一覧\n");

  return schedulesAll.length
    ? schedulesMessages
    : "スケジュールが登録されていません";
};
