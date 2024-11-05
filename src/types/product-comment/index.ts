import { IStore, ReqQuery } from '../common'
import { ProductResponse } from '../product'

export type Comment<T> = {
  Bookid: T
  Message: string
}

export interface CommentResponse extends Comment<ProductResponse> {
  id: string | number
}

export interface CommentQuery extends ReqQuery {
  id: string
}

export interface CommentState extends IStore {
  selectedComment: CommentResponse | null
}
