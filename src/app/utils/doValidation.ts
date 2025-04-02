import { variousSchema } from "../schema/variousSchema";
import { doNewScheduleValidation } from "./doNewScheduleValidation";

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

    return false;
  }

  switch (validationVarious[1]) {
    case "登録":
      return doNewScheduleValidation(arrayData);
  }

  return true;
};
