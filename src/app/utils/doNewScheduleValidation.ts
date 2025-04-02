import { newScheduleSchema } from "../schema/newScheduleSchema";
import { getKeyData } from "./getKeyData";
import { SendMessageController } from "./sendMessage";
import { SheetController } from "./sheetController";

export const doNewScheduleValidation = (arrayData: string[][]) => {
  const newShceduleSchemaData = {
    ...getKeyData(arrayData, "eventName", "", false),
    ...getKeyData(arrayData, "eventDate", null, true),
    ...getKeyData(arrayData, "participants", null, false),
    ...getKeyData(arrayData, "remarks", null, false),
  };

  const newShceduleSchemaResult = newScheduleSchema.safeParse(
    newShceduleSchemaData
  );

  if (!newShceduleSchemaResult.success) {
    const errors = newShceduleSchemaResult.error.errors;
    const errorMessages = errors.map((error) => error.message);

    return false;
  }

  SheetController.addSchedule(newShceduleSchemaData);

  const sendMessageController = new SendMessageController();
  sendMessageController.newMessage(newShceduleSchemaData);

  return true;
};
