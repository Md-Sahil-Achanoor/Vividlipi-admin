export interface IProduct {
  bootTitle: string;
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
  category: string[];
  allowComments: boolean; // Yes / No
}

export interface ProductPayload extends IProduct {}

export interface ProductResponse extends IProduct {
  id: string;
  createdAt: string;
}
