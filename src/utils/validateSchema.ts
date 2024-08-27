import { Schema } from 'yup'
import { toCapitalize } from './capitalize'

const validateSchema = <T>(
  schema: Schema,
  object: T,
): Promise<Schema['__outputType']> => {
  return schema.validate(object, { abortEarly: false }).catch((err) => {
    return err
  })
}

export function convertPermissionIntoObject(
  permissions: { value: string; label: string }[],
) {
  return permissions.reduce((acc, current) => {
    return {
      ...acc,
      [current.value]: 1,
    }
  }, {})
}

export function filterPermissionObject(permissions: Record<string, number>) {
  return Object.keys(permissions || {}).reduce((acc, current) => {
    return {
      ...acc,
      [current]: permissions[current],
    }
  }, {})
}

export function filterPermission(permission: Record<string, number>) {
  return Object.keys(permission || {})
    .filter((key) => permission[key] === 1)
    .map((key) => ({
      label: toCapitalize(key.replace(/_/g, ' ')),
      value: key,
    }))
}

export default validateSchema
