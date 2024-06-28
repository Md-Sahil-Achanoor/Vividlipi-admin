import { FeatureSliderResponse } from '..'

export interface CommonState {
  progress: number
  uploading: boolean
  totalPage: number
  reRenderBulk: boolean
}

export interface ImageResponse {
  image_link: string
}

export type bulkUploadPayload = []

export interface BulkUploadQuery {
  endpoint: string
  type?: string
}

export type TabItemData = Partial<FeatureSliderResponse>
