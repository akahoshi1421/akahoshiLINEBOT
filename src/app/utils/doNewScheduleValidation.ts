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

  // id を主キーとしたため同名イベントの重複登録を許可する
  SheetController.addSchedule(newShceduleSchemaData);

  sendMessageController.newMessage(newShceduleSchemaData);

  return true;
};
