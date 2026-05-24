import type { ScheduleRecord } from "./gassma";

export type NotifySchedule = {
  schedule: ScheduleRecord;
  participants: string[];
};
