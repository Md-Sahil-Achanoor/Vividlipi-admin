// import moment from "moment";
import moment from 'moment'
import { PropsWithChildren } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAppSelector } from '../../app/store'
import AuthLayout from '../../layout/authLayout'
import { Role } from '../../types'
import { checkTimeGapBetweenTwo } from '../../utils/time'

interface PrivateOutletProps extends PropsWithChildren {
  roles?: Role[]
}

const PrivateOutlet = ({ roles }: PrivateOutletProps) => {
  const { isLoggedIn, token, role, user } = useAppSelector(
    (state) => state.auth,
  )
  // console.log(`\n\n user:`, user, roles)
  const location = useLocation()

  const loggedIn = isLoggedIn

  const decodedToken = token ? JSON.parse(atob(token.split('.')[1])) : null
  // console.log(`\n\n decodedToken:`, decodedToken)
  const checkTokenTime = checkTimeGapBetweenTwo(
    moment().format(),
    decodedToken?.exp * 1000,
    'seconds',
  )
  // console.log(`\n\n checkTokenTime:`, checkTokenTime)
  const newRole =
    user?.subRole && user?.role === 'sub-admin'
      ? decodedToken?.role !== user?.subRole
      : decodedToken?.role !== role
  if (
    !loggedIn ||
    !token ||
    !roles?.includes(role) ||
    checkTokenTime < 0 ||
    newRole ||
    decodedToken?.sub != user?.Id
  ) {
    return <Navigate to='/account/login' state={{ from: location }} replace />
  }

  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  )
}

export default PrivateOutlet
