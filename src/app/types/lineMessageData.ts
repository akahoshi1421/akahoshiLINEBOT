import type { Gassmaスケジュール一覧CreateReturn } from "gassma";

type MessageData = {
  message: {
    text: string;
  };
};

export type LineMessageData = {
  events: MessageData[];
};

export type NotifySchedule = {
  schedule: Gassmaスケジュール一覧CreateReturn;
  participants: string[];
};
