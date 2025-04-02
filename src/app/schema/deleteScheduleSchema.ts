import { z } from "zod";
import { eventNameSchema, variousSchema } from "./commonSchema";

export const deleteScheduleSchema = z.object({
  various: variousSchema,
  eventName: eventNameSchema,
});
