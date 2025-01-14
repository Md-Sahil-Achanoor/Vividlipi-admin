import { IManageAuthor } from '@/models'
import { IStore, ReqQuery } from '../common'

export interface AuthorPayload extends IManageAuthor {}

export interface AuthorResponse extends IManageAuthor {
  id: string | number
}

export interface AuthorQuery extends ReqQuery {
  id: string
  cid: string
}

export interface AuthorState extends IStore {
  selectedAuthor: AuthorResponse | null
  singleAuthor: IManageAuthor | null
}
