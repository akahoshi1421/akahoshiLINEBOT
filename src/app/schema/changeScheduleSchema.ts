import { z } from "zod";
import {
  eventDateSchema,
  eventNameSchema,
  participantsSchema,
  variousSchema,
} from "./commonSchema";

export const changeScheduleSchema = z.object({
  various: variousSchema,
  eventName: eventNameSchema,
  eventDate: eventDateSchema,
  participantAdd: participantsSchema,
  participantRemove: participantsSchema,
});
