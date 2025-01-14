import { IManagePublisher } from '@/models'
import { IStore, ReqQuery } from '../common'

export interface PublisherPayload extends IManagePublisher {}

export interface PublisherResponse extends IManagePublisher {
  id: string | number
}

export interface PublisherQuery extends ReqQuery {
  id: string
  cid: string
}

export interface PublisherState extends IStore {
  selectedPublisher: PublisherResponse | null
  singlePublisher: IManagePublisher | null
}
