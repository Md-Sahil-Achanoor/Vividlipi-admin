import { AssignOrderType, ManageOrderUserType } from '@/models'
import { ReqQuery } from '../common'

export type IOrderUser = Omit<ManageOrderUserType, 'countryInfo'>

export interface IOrderUserPayload extends ManageOrderUserType {}

export interface OrderUserPayload
  extends Omit<IOrderUserPayload, 'countryInfo' | 'confirmPassword'> {
  CountryCode: string
}

export interface OrderUserResponse extends IOrderUserPayload {
  id: number
  CountryCode: string
  uid: string | number
}

export interface OrderUserQuery extends ReqQuery {}

export interface IAssignOrderPayload extends AssignOrderType {
  Total: number
}

export interface AssignOrderResponse extends IAssignOrderPayload {
  id: number
}

export interface AssignOrderQuery extends ReqQuery {}

export interface OrderUserManagementState {
  singleOrderUser: IOrderUserPayload | null
  selectedOrderUser: OrderUserResponse | null
  selectedAssignOrder: AssignOrderResponse | null
  singleAssignOrder: IAssignOrderPayload | null
}
