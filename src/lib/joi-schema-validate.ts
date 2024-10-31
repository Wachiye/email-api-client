import Joi, { ObjectSchema } from "joi";
import { AppError } from "../common/common.interface";

export const joiSchemaValidate = <T>(
  data: T,
  schema: ObjectSchema<T>,
  options?: Joi.ValidationOptions
): T => {
  const { error, value } = schema.validate(data, {
    ...options,
    abortEarly: false,
  });
  if (error) {
    const fields: Record<string, string> = error.details.reduce(
      (acc, detail) => {
        acc[detail.context?.key as string] = detail.message.replace(/"/g, "");
        return acc;
      },
      {} as Record<string, string>
    );

    throw new AppError(error.details[0]?.message ?? `Invalid inputs`, {
      reason: Object.values(fields)[0],
      status: 400,
    });
  }
  return value as T;
};
