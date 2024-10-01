import { ManageOrderUserType } from '@/models'
import { ReqQuery } from '../common'
import { ProductResponse } from '../product'

export type IOrderUser = Omit<ManageOrderUserType, 'countryInfo'>

export interface IOrderUserPayload extends ManageOrderUserType {}

export interface OrderUserPayload
  extends Omit<IOrderUserPayload, 'countryInfo' | 'confirmPassword'> {
  CountryCode: string
}

export interface OrderUserResponse extends IOrderUserPayload {
  id: number
  CountryCode: string
}

export interface OrderUserQuery extends ReqQuery {}

export interface ProductData<T> {
  id: T | null
  ProductDetails?: T
  selectedFormat: string
  selectedFormatPrice: number
  quantity: number
}

export interface IAssignOrder<U, P> {
  Productdatas: ProductData<P>[]
  userid: U | null
  UserDetails?: U
}

export type AssignOrder = IAssignOrder<OrderUserResponse, ProductResponse>

export interface IAssignOrderPayload extends IAssignOrder<number, number> {
  Total: number
}

export interface AssignOrderResponse extends AssignOrder {
  id: number
  Total: number
  status: string
}

export interface AssignOrderQuery extends ReqQuery {}

export interface OrderUserManagementState {
  singleOrderUser: IOrderUserPayload | null
  selectedOrderUser: OrderUserResponse | null
  selectedAssignOrder: AssignOrderResponse | null
  singleAssignOrder: AssignOrderResponse | null
}
