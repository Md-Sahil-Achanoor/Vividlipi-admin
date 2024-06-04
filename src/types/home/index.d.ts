import { IHomeFeatureSlider } from "@/models/home";
import { IStore, ReqQuery } from "../common";

export interface HomePayload extends IHomeFeatureSlider {}

export interface FeatureSliderResponse extends IHomeFeatureSlider {
  id: string | number;
  imageurl: string;
}

export interface FeatureSliderQuery extends ReqQuery {
  id: string;
}

export interface HomeState extends IStore {
  selectedFeatureSlider: FeatureSliderResponse | null;
}
