import { RolePermission } from '@/types'
import { Schema } from 'yup'
import { toCapitalize } from './capitalize'

export interface AccessPermission {
  rolePermissions: RolePermission
  access: keyof RolePermission
  type: string | string[]
}

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
  // console.log(permissions)
  return permissions.reduce((acc, current) => {
    return {
      ...acc,
      [current.value]: 1,
    }
  }, {})
}

export const checkPermission = ({
  access,
  type,
  rolePermissions,
}: AccessPermission) => {
  if (typeof rolePermissions === 'string' && rolePermissions === 'All Access') {
    return true
  }
  type Type = keyof RolePermission[typeof access]
  return rolePermissions?.[access]?.[type as Type] === 1
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
