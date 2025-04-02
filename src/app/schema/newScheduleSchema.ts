import { z } from "zod";

export const newScheduleSchema = z.object({
  various: z
    .string()
    .min(1, { message: "種類は必須です。" })
    .regex(/^(登録|変更|削除)$/, {
      message: "種類は「登録」、「変更」、「削除」いずれかです",
    }),
  eventName: z.string().min(1, { message: "イベント名は必須です" }),
  eventDate: z
    .date({ message: "日付のデータが正しくありません" })
    .refine(
      (time) => {
        const now = new Date();
        return now < time;
      },
      { message: "現在時刻より後の日程を入力してください" }
    )
    .nullable(),
  participants: z.string().nullable(),
});
