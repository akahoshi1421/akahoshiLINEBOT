import { z } from "zod";

export const variousSchema = z.object({
  various: z.string().regex(/^(登録|変更|削除|取得)$/, {
    message: "種類は「登録」、「変更」、「削除」、「取得」いずれかです",
  }),
});
