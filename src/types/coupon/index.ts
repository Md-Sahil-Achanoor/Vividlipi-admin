import { IManageCoupon } from '@/models'
import { CategoryResponse } from '../category'
import { IStore, ReqQuery } from '../common'

export type Coupon = IManageCoupon

export interface CouponPayload
  extends Omit<
    IManageCoupon,
    'product_ids' | 'category_1' | 'category_2' | 'publisher_ids' | 'author_ids'
  > {
  product_ids: number[] | string[]
  category_1: number[] | string[]
  category_2: number[] | string[]
  publisher_ids: number[] | string[]
  author_ids: number[] | string[]
}

export interface CouponResponse extends Coupon {
  id: string | number
}

export interface CouponQuery extends ReqQuery {
  id: string
}

export interface CouponState extends IStore {
  selectedCoupon: CouponResponse | null
  singleCoupon: IManageCoupon | null
  selectedCategories: CategoryResponse[]
}
