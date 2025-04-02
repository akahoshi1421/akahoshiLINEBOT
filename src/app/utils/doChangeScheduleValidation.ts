import { changeScheduleSchema } from "../schema/changeScheduleSchema";
import { getKeyData } from "./getKeyData";
import { SendMessageController } from "./sendMessage";
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
    const sendMessageControllerError = new SendMessageController();
    sendMessageControllerError.sendErrorMessage(errorMessages);

    return false;
  }
  const {
    schedule: preSchedule,
    participantsStringArray: preParticipantsStringArray,
  } = SheetController.getData(changeScheduleSchemaData.eventName);

  SheetController.changeSchedule(changeScheduleSchemaData);

  const { schedule, participantsStringArray } = SheetController.getData(
    changeScheduleSchemaData.eventName
  );

  const sendMessageController = new SendMessageController();
  sendMessageController.changeMessage(
    preSchedule,
    preParticipantsStringArray,
    schedule,
    participantsStringArray
  );

  return true;
};
