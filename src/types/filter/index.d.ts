export interface HandleModal {
  open: boolean;
  type: string;
}

export interface SelectItem {
  name: string;
  value: string | number;
  id?: number;
}
