import { z } from "zod";
import {
  eventDateSchema,
  eventNameSchema,
  participantsSchema,
  variousSchema,
} from "./commonSchema";

export const newScheduleSchema = z.object({
  various: variousSchema,
  eventName: eventNameSchema,
  eventDate: eventDateSchema,
  participants: participantsSchema,
});
