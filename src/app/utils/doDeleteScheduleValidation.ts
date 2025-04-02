import { deleteScheduleSchema } from "../schema/deleteScheduleSchema";
import { getKeyData } from "./getKeyData";

export const doDeleteScheduleValidation = (arrayData: string[][]) => {
  const deleteScheduleSchemaData = {
    ...getKeyData(arrayData, "eventName", ""),
  };

  const deleteScheduleSchemaResult = deleteScheduleSchema.safeParse(
    deleteScheduleSchemaData
  );

  if (!deleteScheduleSchemaResult.success) {
    const errors = deleteScheduleSchemaResult.error.errors;
    const errorMessages = errors.map((error) => error.message);

    return false;
  }

  return true;
};
