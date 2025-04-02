import { z } from "zod";
import { newScheduleSchema } from "../schema/newScheduleSchema";
import { changeScheduleSchema } from "../schema/changeScheduleSchema";
import { deleteScheduleSchema } from "../schema/deleteScheduleSchema";

export type NewSchedule = z.infer<typeof newScheduleSchema>;
export type ChangeSchedule = z.infer<typeof changeScheduleSchema>;
export type DeleteSchedule = z.infer<typeof deleteScheduleSchema>;
