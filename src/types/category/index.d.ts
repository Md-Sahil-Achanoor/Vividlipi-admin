import { IStore, ReqQuery } from "../common";

export interface ICategory {
  title: string;
}

export interface CategoryPayload extends ICategory {}

export interface CategoryResponse extends ICategory {
  id: number;
}

export interface CategoryQuery extends ReqQuery {
  cat1: number;
}

export interface ISubCategory<T> extends ICategory {
  category: T | null;
}

export type SubCategory = ISubCategory<CategoryResponse>;

export interface SubCategoryPayload extends ISubCategory<number> {}

export interface SubCategoryResponse extends ISubCategory<number> {
  id: number;
}

export interface CategoryState extends IStore {
  selectedCategory: CategoryResponse | null;
}
