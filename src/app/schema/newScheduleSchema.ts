import { z } from "zod";
import {
  eventDateSchema,
  eventNameSchema,
  participantsSchema,
} from "./commonSchema";

export const newScheduleSchema = z.object({
  eventName: eventNameSchema,
  eventDate: eventDateSchema,
  participants: participantsSchema,
});
