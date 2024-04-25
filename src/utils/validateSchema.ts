import { Schema } from "yup";

const validateSchema = <T>(
  schema: Schema,
  object: T
): Promise<Schema["__outputType"]> => {
  return schema.validate(object, { abortEarly: false }).catch((err) => {
    return err;
  });
};

export default validateSchema;
