import type { NotifySchedule } from "../types/lineMessageData";
import { SendMessageController } from "./sendMessage";
import { SheetController } from "./sheetController";

export const doGetAndSendSchedules = () => {
  const schedules = SheetController.getAllFutureScheduleData();
  const schedulesAll: NotifySchedule[] = schedules.map((schedule) => {
    const participants = SheetController.getParticipants(schedule.イベント名);
    return { schedule, participants };
  });

  const sendMessageController = new SendMessageController();
};
