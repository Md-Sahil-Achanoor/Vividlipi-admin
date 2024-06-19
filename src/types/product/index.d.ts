import { IBulkProduct } from '@/models/product'
import { CategoryResponse } from '../category'
import { IStore, ReqQuery } from '../common'
import { PublisherResponse } from '../publisher'

export interface IProduct<T, P> {
  book_title: string
  thumbnail: string
  url_slug: string
  cat1: T | null
  cat2: T | null
  description: string
  author_name: string
  publisher: P | null
  release_date: string
  digital_product_url: string
  // sale_price: string | number;
  // sale_quantity: number | string;
  // price: string | number;
  // inventory: string | number;
  commission: string
  HardCopyPrice: string | number
  AudioPrice: string | number
  EbookPrice: string | number
  Stock: string | number
  Audio_URL: string
  File_URL: string
  first_year_commission: string | number
  second_year_commission: string | number
  there_after_commission: string | number
  commission_goes_to: string
  tax: string | number
  shipping: string | number
  genre: string
  tags: string[]
  book_format: number[]
  translated: string // Yes /No
  translator_name: string | null // if yes then required
  language: string
  category: T[]
  allow_comments: string // Yes / No
}

export type Product = IProduct<CategoryResponse, PublisherResponse>

export interface ProductPayload
  extends IProduct<number | string, number | string, number> {}

export type BulkProduct = Omit<IBulkProduct, 'translator_name'> & {
  translator_name?: string
  category?: []
  cat1?: string
  cat2?: string
}

export interface ProductResponse
  extends IProduct<CategoryResponse, PublisherResponse> {
  id: string | number
  createdAt: string
  isDeleted: number
}

export interface ProductQuery extends ReqQuery {
  productid: string
  search: string
  page: number
}

export interface ProductState extends IStore {
  selectedProduct: ProductResponse | null
}
