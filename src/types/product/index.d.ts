import { CategoryResponse } from "../category";
import { IStore, ReqQuery } from "../common";

export interface IProduct<T> {
  book_title: string;
  thumbnail: string;
  cat1: T | null;
  cat2: T | null;
  description: string;
  author_name: string;
  publisher: string;
  release_date: string;
  digital_product_url: string;
  sale_price: string | number;
  sale_quantity: number | string;
  price: string | number;
  inventory: string | number;
  commission: string;
  first_year_commission: string | number;
  second_year_commission: string | number;
  there_after_commission: string | number;
  commission_goes_to: string;
  tax: string | number;
  shipping: string | number;
  genre: string;
  tags: string[];
  book_format: number;
  translated: string; // Yes /No
  translator_name: string | null; // if yes then required
  language: string;
  category: T[];
  allow_comments: string; // Yes / No
}

export type Product = IProduct<CategoryResponse>;

export interface ProductPayload extends IProduct<number> {}

export interface ProductResponse extends IProduct<CategoryResponse> {
  id: string;
  createdAt: string;
  isDeleted: Number;
}

export interface ProductQuery extends ReqQuery {
  productid: string;
  searchKeyword: string;
  page: number;
}

export interface ProductState extends IStore {
  selectedProduct: ProductResponse | null;
}
