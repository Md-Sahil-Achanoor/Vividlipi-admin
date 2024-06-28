import { IManageAuthor } from '@/models/author'
import { IStore, ReqQuery } from '../common'

export interface AuthorPayload extends IManageAuthor {}

export interface AuthorResponse extends IManageAuthor {
  id: string | number
}

export interface AuthorQuery extends ReqQuery {
  id: string
}

export interface AuthorState extends IStore {
  selectedAuthor: AuthorResponse | null
  singleAuthor: IManageAuthor | null
}
