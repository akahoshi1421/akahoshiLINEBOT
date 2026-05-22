import type { ScheduleRecord } from "./gassma";

type MessageData = {
  message: {
    text: string;
  };
};

export type LineMessageData = {
  events: MessageData[];
};

export type NotifySchedule = {
  schedule: ScheduleRecord;
  participants: string[];
};
