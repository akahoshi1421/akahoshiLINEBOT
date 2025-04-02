import { z } from "zod";
import {
  eventDateSchema,
  eventNameSchema,
  participantsSchema,
  remarksSchema,
} from "./commonSchema";

export const changeScheduleSchema = z.object({
  eventName: eventNameSchema,
  eventDate: eventDateSchema,
  participantAdd: participantsSchema,
  participantRemove: participantsSchema,
  remarks: remarksSchema,
});
