import { CategoryResponse } from "../category";

export interface IProduct<T> {
  bookTitle: string;
  thumbnail: string;
  description: string;
  authorName: string;
  publisher: string;
  releaseDate: string;
  digitalProductURL: string;
  salePrice: string | number;
  saleQuantity: number | string;
  price: string | number;
  inventory: string | number;
  commission: string;
  firstYearCommission: string | number;
  secondYearCommission: string | number;
  thereAfterCommission: string | number;
  commissionGoesTo: string;
  tax: string | number;
  shipping: string | number;
  genre: string;
  tags: string[];
  bookFormat: number;
  translated: string; // Yes /No
  translatorName: string; // if yes then required
  language: string;
  category: T[];
  allowComments: boolean; // Yes / No
}

export type Product = IProduct<CategoryResponse>;

export interface ProductPayload extends IProduct<string> {}

export interface ProductResponse extends IProduct<CategoryResponse> {
  id: string;
  createdAt: string;
}
