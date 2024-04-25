import { ChangeEventHandler, InputHTMLAttributes } from "react";
import { Accept, FileRejection } from "react-dropzone";
import { ExceptFile, IFormik, OptionValue, Options } from "./common";

/**
 * @type { Formik with callback }
 * @module { Input, Select, Checkbox, Radio, File Upload, Phone Input }
 */
export interface FormikWithCallback<T> extends IFormik {
  onChangeCallback?: T | ChangeEventHandler;
  onBlurCallback?: T | ChangeEventHandler;
}

/**
 * @type { Formik Input Type  }
 * @module { Input, Select, Checkbox, Radio, File Upload, Phone Input }
 */
export interface CustomInputCom extends IFormik {
  isArray?: boolean;
  isPassword?: boolean;
  isTel?: boolean;
  handleViewPassword?: () => void;
  onChangeCallback?: ChangeEventHandler;
  onBlurCallback?: ChangeEventHandler;
  isIcon?: boolean;
  hideError?: boolean;
  className?: string;
  desc?: string;
  leftIcon?: () => React.ReactNode;
  rightIcon?: () => React.ReactNode;
}

/**
 * @type { Infinite Scroll filter Type  }
 * @module { All filter and infinite scroll }
 */
export interface InfiniteSelect<T extends object> extends IFormik {
  listRef: never;
  onChangeCallback: (e: T) => void;
  onCloseCallback?: () => void;
  renderItem: (e: T) => React.ReactNode;
  renderName: (e: T[]) => React.ReactNode;
  renderTitle: (e: T | string) => string;
  isIcon?: boolean;
  isArray?: boolean;
  items: T[];
  isActive: (e: T) => boolean;
  url: string;
  extraQuery: string;
  rerenderDep: string;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
  reload: () => void;
  isReCall: boolean;
  renderData: T[];
  clearData: () => void;
  isSelected: boolean;
  isAuth?: boolean;
  loadMore?: () => void;
  isInsideSearch?: boolean;
  searchProps?: InputType;
}

/**
 * @type { Formik Checkbox Type  }
 * @module { Checkbox }
 */
export interface InputCheckbox extends IFormik {
  onChangeCallback?: ChangeEventHandler;
  isTerms?: boolean;
  checked: boolean;
}

/**
 * @type { Input select Type  }
 * @module { Select }
 */
export interface InputSelect<T extends OptionValue> extends IFormik {
  items: Options<T>[];
  isArray?: boolean;
  onChangeCallback: (e: React.FormEvent) => void;
  onBlurCallback: (e: React.FormEvent) => void;
  [key: string]: never;
}

/**
 * @type { File upload Type  }
 * @module { Select }
 */
export interface FormikFileUpload extends IFormik {
  isRequired?: boolean;
  imageId?: string;
  isArray?: boolean | string;
  isUpload?: boolean;
  isRemoveAble?: boolean;
  onChangeCallback?: ChangeEventHandler;
  uploadFor?: string;
  acceptFile?: ExceptFile;
  disabled?: boolean;
}

/**
 * @type { Formik Phone number Type  }
 * @module { Phone Input }
 */
export interface PhoneInputType extends IFormik {
  disabled?: boolean;
  onChangeCallback: (e: string) => void;
  [key: string]: never;
}

/**
 * @type { Checkbox items Type  }
 * @module { Checkbox }
 */
export interface CheckboxItem {
  key: string;
  value: string | number;
}

/**
 * @type { Checkbox Group Type  }
 * @module { Checkbox }
 */
export interface CheckboxGroupProps<T = CheckboxItem> extends InputType {
  label?: string;
  name: string;
  options: T[];
  isMulti: boolean;
  isRequired?: boolean;
  onChangeCallback?: (data: T, e?: ChangeEventType) => void;
  disabledProps?: (data: T) => boolean;
  labelClass?: string;
  itemsclass?: string;
  isAuth?: boolean;
}

/**
 * @type { File Upload Type  }
 * @module { File Upload }
 */
export interface FileUploadProps {
  onDropCallBack: (accept: File[], reject: FileRejection[]) => void;
  dropZoneClass?: string;
  acceptFile: Accept;
  isDisabled?: boolean;
  isMultiple?: boolean;
  dropText?: string;
  reRender?: boolean;
  isBrowse?: boolean;
  imageDefault?: boolean;
  maxFileSize?: number;
}

/**
 * @type { Formik File Upload Type  }
 * @module { Formik File Upload }
 */

export interface FormikFileUploadProps extends IFormik, FileUploadProps {
  uploadCallBack?: (e: any) => void;
  disabled: boolean;
  isUpload?: boolean;
  resolution?: string;
  supportedString?: string; // "jpg, png, jpeg"
  isEdit?: boolean;
  isProfile?: boolean;
  isSuggestion?: boolean;
}

/**
 * @type {Input Type}
 *
 */
export type InputType = InputHTMLAttributes<HTMLInputElement>;

/**
 * @type {Button Click Type}
 *
 */
export type ClickType = React.MouseEventHandler<HTMLButtonElement>;

/**
 * @type {Button Type}
 *
 */
export type ButtonType = React.ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * @type {Anchor Type}
 *
 * */
export type AnchorType = React.AnchorHTMLAttributes<HTMLAnchorElement>;

/**
 * @type {Form Type}
 *
 */
export type FormType = React.FormHTMLAttributes<HTMLFormElement>;

/**
 * @type {Select Type}
 *
 */
export type SelectType = React.SelectHTMLAttributes<HTMLSelectElement>;

/**
 * @type {TextArea Type}
 *
 */
export type TextAreaType = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

/**
 * @type {Label Type}
 *
 */
export type LabelType = React.LabelHTMLAttributes<HTMLLabelElement>;

/**
 * @type {Html Type}
 *
 */
export type HtmlType = React.HTMLAttributes<HTMLElement>;

/**
 * @type {Change Event Type}
 * */
export type ChangeEventType = React.ChangeEvent<HTMLInputElement>;

/**
 * @type {Change Event Type}
 * */
export type ChangeEventTypeTextArea = React.ChangeEvent<HTMLTextAreaElement>;
