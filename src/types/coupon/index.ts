import { IManageCoupon } from '@/models'
import { IStore, ReqQuery } from '../common'

export interface CouponPayload extends IManageCoupon {}

export interface CouponResponse extends IManageCoupon {
  id: string | number
}

export interface CouponQuery extends ReqQuery {
  id: string
}

export interface CouponState extends IStore {
  selectedCoupon: CouponResponse | null
  singleCoupon: IManageCoupon | null
}
