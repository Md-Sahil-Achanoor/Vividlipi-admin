import { IStore, ReqQuery } from '../common'
import { ProductResponse } from '../product'

export type Comment<T> = {
  Bookid: T
  Message: string
  star: number
}

export interface CommentResponse extends Comment<ProductResponse> {
  id: string | number
  approve: number
  time: string
}

export interface CommentQuery extends ReqQuery {
  id: string
  unapproved: number
}

export interface CommentState extends IStore {
  selectedComment: CommentResponse | null
}
