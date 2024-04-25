export interface ICategory {
  name: string;
  description: string;
}

export interface CategoryPayload extends ICategory {}

export interface CategoryResponse extends ICategory {
  id: string;
}
