import { z } from "zod";
import { eventNameSchema } from "./commonSchema";

export const deleteScheduleSchema = z.object({
  eventName: eventNameSchema,
});
