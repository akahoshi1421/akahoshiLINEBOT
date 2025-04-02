import { changeScheduleSchema } from "../schema/changeScheduleSchema";
import { getKeyData } from "./getKeyData";
import { SheetController } from "./sheetController";

export const doChangeScheduleValidation = (arrayData: string[][]) => {
  const changeScheduleSchemaData = {
    ...getKeyData(arrayData, "eventName", "", false),
    ...getKeyData(arrayData, "eventDate", null, true),
    ...getKeyData(arrayData, "participantAdd", null, false),
    ...getKeyData(arrayData, "participantRemove", null, false),
    ...getKeyData(arrayData, "remarks", null, false),
  };

  const changeScheduleSchemaResult = changeScheduleSchema.safeParse(
    changeScheduleSchemaData
  );

  if (!changeScheduleSchemaResult.success) {
    const errors = changeScheduleSchemaResult.error.errors;
    const errorMessages = errors.map((error) => error.message);

    return false;
  }

  SheetController.changeSchedule(changeScheduleSchemaData);

  return true;
};
