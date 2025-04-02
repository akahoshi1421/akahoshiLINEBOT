import { variousSchema } from "../schema/variousSchema";

export const doVariousValidation = (arrayData: string[][]) => {
  const validationVarious = arrayData.find(
    (oneArrayData) => oneArrayData[0] === "various"
  );

  if (!validationVarious) return false;

  const variousSchemaResult = variousSchema.safeParse({
    various: validationVarious[0],
  });

  if (!variousSchemaResult.success) {
    const errors = variousSchemaResult.error.errors;
    const errorMessages = errors.map((error) => error.message);

    return false;
  }

  return true;
};
