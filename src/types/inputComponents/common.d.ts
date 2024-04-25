import { FieldProps } from "formik";
import { InputType } from "./index";

export type ExceptFile = {
  [key: string]: string[];
};

export type OptionValue = string | number;

export type Options<T extends OptionValue> = {
  value: T;
  name: string;
};

export interface IFormik extends FieldProps {
  id?: string;
  label?: string;
  name: string;
  type: string;
  placeholder?: string;
  disabled?: boolean;
  isRequired?: boolean;
  className?: string;
}

export interface UploadProgress {
  loaded: number;
  total: number;
}

export interface TableHeadProps {
  checkbox?: InputType;
  isCheckbox?: boolean;
  teacher?: boolean;
}
