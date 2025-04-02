import { z } from "zod";
import { eventNameSchema, variousSchema } from "./commonSchema";

export const removeScheduleSchema = z.object({
  various: variousSchema,
  eventName: eventNameSchema,
});
