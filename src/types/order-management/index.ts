import { ManageOrderUserType } from '@/models'
import { ReqQuery } from '../common'
import { ProductResponse } from '../product'

export type GuestUserResponse = {
  Shipping_FirstName: string
  Shipping_LastName: string
  Shipping_Email: string
  Shipping_Mobile: string
  Shipping_Address1: string
  Shipping_Country: string
  Shipping_State: string
  Shipping_City: string
  Shipping_PostCode: string
  Shipping_Address2: string
  Billing_FirstName: string
  Billing_LastName: string
  Billing_Email: string
  Billing_Mobile: string
  Billing_Address1: string
  Billing_Country: string
  Billing_State: string
  Billing_City: string
  Billing_PostCode: string
  Billing_Address2: string
}

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
  UserDetails?: U | null
  GuestDetails?: U | null
}

export type AssignOrder = IAssignOrder<OrderUserResponse, ProductResponse>

export interface IAssignOrderPayload extends IAssignOrder<number, number> {
  Total: number
}

export interface AssignOrderResponse extends AssignOrder {
  id: number
  Total: number
  status: string
  UserType: number
}

export interface AssignOrderQuery extends ReqQuery {}

export interface OrderUserManagementState {
  singleOrderUser: IOrderUserPayload | null
  selectedOrderUser: OrderUserResponse | null
  selectedAssignOrder: AssignOrderResponse | null
  singleAssignOrder: AssignOrderResponse | null
}
