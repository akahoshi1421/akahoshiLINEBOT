// NOTE: 2週間前, 1週間前, 3日前, 1日前に通知

import type { NotifySchedule } from "./types/lineMessageData";
import { getScheduleFilter } from "./utils/scheduleFilter";
import { SendMessageController } from "./utils/sendMessage";
import { SheetController } from "./utils/sheetController";

export function notify() {
  const twoWeeksSchedules = getScheduleFilter("2weeks");
  const oneWeekSchedules = getScheduleFilter("1weeks");
  const threeDaysSchedules = getScheduleFilter("3days");
  const oneDaySchedules = getScheduleFilter("1day");

  const twoWeeksSchedulesAll: NotifySchedule[] = twoWeeksSchedules.map(
    (schedule) => {
      const participants = SheetController.getParticipants(schedule.イベント名);
      return { schedule, participants };
    }
  );
  const oneWeekSchedulesAll: NotifySchedule[] = oneWeekSchedules.map(
    (schedule) => {
      const participants = SheetController.getParticipants(schedule.イベント名);
      return { schedule, participants };
    }
  );
  const threeDaysSchedulesAll: NotifySchedule[] = threeDaysSchedules.map(
    (schedule) => {
      const participants = SheetController.getParticipants(schedule.イベント名);
      return { schedule, participants };
    }
  );
  const oneDaySchedulesAll: NotifySchedule[] = oneDaySchedules.map(
    (schedule) => {
      const participants = SheetController.getParticipants(schedule.イベント名);
      return { schedule, participants };
    }
  );

  const sendMessageController = new SendMessageController();
  sendMessageController.notifyScheduleMessage(
    twoWeeksSchedulesAll,
    oneWeekSchedulesAll,
    threeDaysSchedulesAll,
    oneDaySchedulesAll
  );
}
