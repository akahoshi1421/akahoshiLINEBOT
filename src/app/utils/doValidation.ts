import { variousSchema } from "../schema/variousSchema";
import { doChangeScheduleValidation } from "./doChangeScheduleValidation";
import { doDeleteScheduleValidation } from "./doDeleteScheduleValidation";
import { doNewScheduleValidation } from "./doNewScheduleValidation";
import { SendMessageController } from "./sendMessage";

export const doValidation = (arrayData: string[][]) => {
  const validationVarious = arrayData.find(
    (oneArrayData) => oneArrayData[0] === "various"
  );

  if (!validationVarious) return false;

  const variousSchemaResult = variousSchema.safeParse({
    various: validationVarious[1],
  });

  if (!variousSchemaResult.success) {
    const errors = variousSchemaResult.error.errors;
    const errorMessages = errors.map((error) => error.message);
    const sendMessageControllerError = new SendMessageController();
    sendMessageControllerError.sendErrorMessage(errorMessages);

    return false;
  }

  switch (validationVarious[1]) {
    case "登録":
      return doNewScheduleValidation(arrayData);
    case "変更":
      return doChangeScheduleValidation(arrayData);
    case "削除":
      return doDeleteScheduleValidation(arrayData);
    default:
      return false;
  }
};
