import { useAppSelector } from '@/app/store'
import { RolePermission } from '@/types'
import { Navigate } from 'react-router-dom'

interface AccessLayoutProps {
  children: React.ReactNode
  access: keyof RolePermission
  type: string | string[]
}
export default function AccessLayout({
  children,
  access,
  type,
}: AccessLayoutProps) {
  type Type = keyof RolePermission[typeof access]
  const { roleDetails, user } = useAppSelector((state) => state.auth)
  const check =
    typeof roleDetails === 'object'
      ? typeof type === 'string'
        ? roleDetails?.[access]?.[type as Type] === 1
        : type.some((t) => roleDetails?.[access]?.[t as Type] === 1)
      : false

  if (user && check) {
    return children
  }

  return <Navigate to='/' replace />
}
