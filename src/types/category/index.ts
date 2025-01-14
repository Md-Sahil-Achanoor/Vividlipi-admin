import { IManageCategory } from '@/models'
import { IStore, ReqQuery } from '../common'

export interface CategoryPayload extends IManageCategory {}

export interface CategoryResponse extends IManageCategory {
  id: number
}

export interface CategoryQuery extends ReqQuery {
  cat1: number
  cid: string
}

/**
 * @module SubCategory { ISubCategory } @public
 */
export interface ISubCategory<T> extends IManageCategory {
  category: T | null
}

export type SubCategory = ISubCategory<CategoryResponse>

export interface SubCategoryPayload extends ISubCategory<number> {}

export interface SubCategoryResponse extends ISubCategory<number> {
  id: number
}

export interface CategoryState extends IStore {
  selectedCategory: CategoryResponse | null
  selectedSubCategory: CategoryResponse | null
  singleCategory: Pick<CategoryResponse, 'title' | 'Slug'> | null
  singleSubCategory: Pick<
    SubCategoryResponse,
    'title' | 'category' | 'Slug'
  > | null
}
