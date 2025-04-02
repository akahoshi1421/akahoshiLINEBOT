import { newScheduleSchema } from "../schema/newScheduleSchema";
import { getKeyData } from "./getKeyData";

export const doNewScheduleValidation = (arrayData: string[][]) => {
  const newShceduleSchemaData = {
    ...getKeyData(arrayData, "eventName", ""),
    ...getKeyData(arrayData, "eventData", null),
    ...getKeyData(arrayData, "participants", null),
  };

  const newShceduleSchemaResult = newScheduleSchema.safeParse(
    newShceduleSchemaData
  );

  if (!newShceduleSchemaResult.success) {
    const errors = newShceduleSchemaResult.error.errors;
    const errorMessages = errors.map((error) => error.message);

    return false;
  }

  return true;
};
