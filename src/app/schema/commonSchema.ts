import { z } from "zod";

export const eventNameSchema = z
  .string()
  .min(1, { message: "イベント名は必須です" });

export const eventDateSchema = z
  .date({ message: "日付のデータが正しくありません" })
  .refine(
    (time) => {
      const now = new Date();
      return now < time;
    },
    { message: "現在時刻より後の日程を入力してください" }
  )
  .nullable();

export const participantsSchema = z.string().nullable();

export const remarksSchema = z.string().nullable();
