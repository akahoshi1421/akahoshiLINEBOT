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

  const sendMessageController = new SendMessageController();

  if (!newShceduleSchemaResult.success) {
    const errors = newShceduleSchemaResult.error.errors;
    const errorMessages = errors.map((error) => error.message);
    sendMessageController.sendErrorMessage(errorMessages);

    return false;
  }
  const data = SheetController.getData(newShceduleSchemaData.eventName);

  if (data.schedule) {
    sendMessageController.sendErrorMessage(["そのイベント名は登録済みです"]);
    return false;
  }

  SheetController.addSchedule(newShceduleSchemaData);

  sendMessageController.newMessage(newShceduleSchemaData);

  return true;
};
