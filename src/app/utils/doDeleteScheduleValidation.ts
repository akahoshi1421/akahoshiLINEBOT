import { deleteScheduleSchema } from "../schema/deleteScheduleSchema";
import { getKeyData } from "./getKeyData";
import { SendMessageController } from "./sendMessage";
import { SheetController } from "./sheetController";

export const doDeleteScheduleValidation = (arrayData: string[][]) => {
  const deleteScheduleSchemaData = {
    ...getKeyData(arrayData, "eventName", "", false),
  };

  const deleteScheduleSchemaResult = deleteScheduleSchema.safeParse(
    deleteScheduleSchemaData
  );

  if (!deleteScheduleSchemaResult.success) {
    const errors = deleteScheduleSchemaResult.error.errors;
    const errorMessages = errors.map((error) => error.message);
    const sendMessageControllerError = new SendMessageController();
    sendMessageControllerError.sendErrorMessage(errorMessages);

    return false;
  }
  const { schedule, participantsStringArray } = SheetController.getData(
    deleteScheduleSchemaData.eventName
  );

  SheetController.deleteSchedule(deleteScheduleSchemaData);

  const sendMessageController = new SendMessageController();
  sendMessageController.deleteMessage(schedule, participantsStringArray);

  return true;
};
