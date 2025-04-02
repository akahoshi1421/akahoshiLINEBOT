import { z } from "zod";
import {
  eventDateSchema,
  eventNameSchema,
  participantsSchema,
  remarksSchema,
} from "./commonSchema";

export const newScheduleSchema = z.object({
  eventName: eventNameSchema,
  eventDate: eventDateSchema,
  participants: participantsSchema,
  remarks: remarksSchema,
});
