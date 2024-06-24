import {
  IHomeFeatureProduct,
  IHomeFeatureSlider,
  IHomeFeatureSubSlider,
} from '@/models/home'
import { IStore, ReqQuery } from '../common'
import { ProductResponse } from '../product'

/**
 * @module Feature Slider
 */
export interface FeatureSliderPayload extends IHomeFeatureSlider {}

export interface FeatureSliderResponse extends IHomeFeatureSlider {
  id: string | number
  imageurl: string
  home_text?: string
  contentpostion_X?: number | string
}

export interface FeatureSliderQuery extends ReqQuery {
  id: string
}

/**
 * @module Feature Sub Slider
 */
export interface FeatureSubSliderPayload extends IHomeFeatureSubSlider {}

export interface FeatureSubSliderResponse extends IHomeFeatureSubSlider {
  id: string | number
  image: string
}

export interface FeatureSubSliderQuery extends ReqQuery {
  id: string
}

/**
 * @module Feature Product
 */
export interface FeatureProductPayload extends IHomeFeatureProduct {
  productId: string | number
  position?: number
}

export interface FeatureProductResponse extends IHomeFeatureProduct {
  id: string | number
  productDetails?: ProductResponse | null
  position?: number
  products?: number
}

export interface FeatureProductQuery extends ReqQuery {
  id: string
  status: string | number
}

/**
 * @module Home State
 */
export interface HomeState extends IStore {
  selectedFeatureSlider: FeatureSliderResponse | null
  selectedFeatureSubSlider: FeatureSubSliderResponse | null
  selectedFeatureProduct: FeatureProductResponse | null
}
