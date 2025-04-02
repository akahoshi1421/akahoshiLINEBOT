import { changeScheduleSchema } from "../schema/changeScheduleSchema";
import { getKeyData } from "./getKeyData";

export const doChangeScheduleValidation = (arrayData: string[][]) => {
  const changeScheduleSchemaData = {
    ...getKeyData(arrayData, "eventName", ""),
    ...getKeyData(arrayData, "eventDate", null),
    ...getKeyData(arrayData, "participantAdd", null),
    ...getKeyData(arrayData, "participantRemove", null),
  };

  const changeScheduleSchemaResult = changeScheduleSchema.safeParse(
    changeScheduleSchemaData
  );

  if (!changeScheduleSchemaResult.success) {
    const errors = changeScheduleSchemaResult.error.errors;
    const errorMessages = errors.map((error) => error.message);

    return false;
  }

  return true;
};
