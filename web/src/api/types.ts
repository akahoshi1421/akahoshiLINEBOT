// サーバ(src/app/server/web.ts)の DTO と対応する型。
// google.script.run 越しにやり取りするため Date は ISO 文字列。
export type ScheduleDTO = {
  id: number;
  eventName: string;
  eventDate: string | null;
  remarks: string;
};

export type ScheduleDetailDTO = ScheduleDTO & {
  participants: string[];
};

export type ScheduleInputDTO = {
  eventName: string;
  eventDate: string | null;
  remarks: string;
};
