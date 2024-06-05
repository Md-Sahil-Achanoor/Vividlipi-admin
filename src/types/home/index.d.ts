import {
  IHomeFeatureProduct,
  IHomeFeatureSlider,
  IHomeFeatureSubSlider,
} from "@/models/home";
import { IStore, ReqQuery } from "../common";

/**
 * @module Feature Slider
 */
export interface FeatureSliderPayload extends IHomeFeatureSlider {}

export interface FeatureSliderResponse extends IHomeFeatureSlider {
  id: string | number;
  imageurl: string;
}

export interface FeatureSliderQuery extends ReqQuery {
  id: string;
}

/**
 * @module Feature Sub Slider
 */
export interface FeatureSubSliderPayload extends IHomeFeatureSubSlider {}

export interface FeatureSubSliderResponse extends IHomeFeatureSubSlider {
  id: string | number;
}

export interface FeatureSubSliderQuery extends ReqQuery {
  id: string;
}

/**
 * @module Feature Product
 */
export interface FeatureProductPayload extends IHomeFeatureProduct {
  productId: string | number;
}

export interface FeatureProductResponse extends IHomeFeatureProduct {
  id: string | number;
}

export interface FeatureProductQuery extends ReqQuery {
  id: string;
}

/**
 * @module Home State
 */
export interface HomeState extends IStore {
  selectedFeatureSlider: FeatureSliderResponse | null;
  selectedFeatureSubSlider: FeatureSubSliderResponse | null;
  selectedFeatureProduct: FeatureProductResponse | null;
}
