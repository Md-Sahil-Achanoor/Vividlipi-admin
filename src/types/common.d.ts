import { MouseEventHandler } from "react";
import { NavigateFunction } from "react-router-dom";

export type SampleObject = {
  [key: string]: never;
};

export interface ISelectedItem {
  id: string;
  name: string;
  status: string;
  type: string;
}

export interface StoreData<T> {
  name: string;
  data: T;
}

export interface StoreDispatchData<T, State> {
  name: keyof State;
  data: T;
}

export interface IStatistics {
  status: string;
  _count: { status: number };
}
export interface StudentStatistics {
  activecount: string | number;
  inactivecount: string | number;
}

export interface RouterQuery {
  ref: string;
}

export interface ListResponse<T> {
  limit: number;
  current_page: number;
  data: T[];
  per_page: number;
  total: number;
  last_page: number;
}

export interface ApiResponse<T> {
  data: T;
  profile?: T;
  error?: never;
  count: number;
  status: number;
  message: string;
  current_page: number;
}

/**
 *  @type { api error type }
 * */
export interface RTKError<T> {
  error: T;
  isUnhandledError: boolean;
  meta: any;
}

/**
 *  @type { api response type }
 * */
export interface ErrorResponse<T> {
  data: T;
  status: number;
}

export type ErrorType = ErrorResponse<ErrorData>;

export type RtkErrorType = RTKError<ErrorResponse<ErrorData>>;

export interface ErrorData {
  message: string;
  status: string;
  code: number;
  error: any;
}

export interface RouterPush {
  pathname: string;
  state?: SampleObject;
  query: SampleObject;
}

export interface ErrorData {
  message?: string;
  code?: number;
}

export interface ErrorResponse {
  data?: ErrorData;
}

export interface AxiosError {
  response?: string;
  status?: number;
  statusText?: string;
}

export interface SubmitOption {
  router?: HistoryType;
  id?: string;
}

/** @type {next router history} */
export interface HistoryType {
  pathname: string;
  asPath: string;
  push: (p: string | RouterPush) => void;
  back: () => void;
  route: string;
}

/** @type {formik form submit prop} */
export interface FormikSubmitOption {
  setSubmitting: (e: boolean) => void;
  resetForm: () => void;
  router?: NavigateFunction;
  id?: string;
  message?: boolean;
  conditions?: Record<string, any>;
}

/** @type {formik form submit payload} */
export interface FormikSubmitPayload<T> {
  data: T;
  options: FormikSubmitOption;
}

/** @type {normal form submit payload} */

export interface FormSubmitPayload<T> {
  data: T;
  options: SubmitOption;
}

export interface FormDataPayload<T> {
  formData: T;
  id: string;
}

export interface ReqQuery {
  page: number;
  limit: number;
  status: string;
  id: string | number;
  isActive: string;
  order: string;
}

export interface IStore {
  // loading: boolean;
  // adding: boolean;
  // error: string;
  // reRender: boolean;
  singleRerender?: boolean;
}

export interface IModalView<T> {
  data: T;
  type: string;
}

// table filter
export interface TabItem {
  name: string;
  type: string;
  color?: string;
  index?: number;
}
// table filter
export interface TableFilter {
  activeTab?: string;
  totalCount?: number;
  handleTab?: MouseEventHandler;
  inputProps?: InputType;
  tabOption?: never;
  isSearch?: boolean;
  tabItems?: TabItem[];
  itemValues?: number[];
  handleFilterTab?: (item: TabItem) => void;
  selectedItem?: string;
  loading?: boolean;
}

export interface BreadCrumbItem {
  name: string;
  link: string;
}

export interface FilterItem {
  name: string;
  id: string;
}

export interface CardHeaderProps {
  title: string;
  isBreadcrumb?: boolean;
  breadcrumbItems?: BreadCrumbItem[];
  isHandler?: boolean;
  isDeleting?: boolean;
  handleEdit?: () => void;
  handleDelete?: () => void;
  isEdit?: boolean;
  buttonText?: string;
  isDelete?: boolean;
}

interface DropdownItem {
  name: string;
  value: string;
}

interface DropdownProps {
  items: DropdownItem[];
  isIcon: boolean;
  name: string;
  handleSelectedOption: (i: Item) => void;
  isSelected: boolean | string;
  isOpen: boolean;
  extraClass?: string;
  buttonClass?: string;
  listClass?: string;
  isDisabled?: (i: Item) => boolean;
  isAdded?: (i: Item) => boolean;
}

const route = {
  home: "/",
  login: "/login",
  register: "/register",
} as const;

// export type Routes = keyof typeof route;
export type Routes = (typeof route)[keyof typeof route];

export type Status = {
  [key: string]: number;
};

export interface ModalToggle {
  type: string;
  open?: boolean;
}

export interface Classes {
  top: string;
  body: string;
}

export interface ModalProps extends React.PropsWithChildren {
  classes: Classes;
  handleModal: (status: string) => void;
  outSideClick?: boolean;
  isModalHeader?: boolean;
  headText?: string;
  wrapperClass?: string;
  headClass?: string;
}

// export type Local = Omit<LocalStoreKey, "isLoggedIn">;
/**
 * @type {Omit by key}
 */
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * @type { Manage Update or create module Base Payload }
 */
export interface ManagePayload<T, Q = {}> {
  id?: string | number;
  data: T;
  query?: Partial<Q>;
  options?: FormikSubmitOption;
  secondId?: string;
}

/**
 * @type { Manage Delete module Base Payload }
 */
export interface ManagePayloadQuery<Q> {
  id?: string | number;
  query?: Partial<Q>;
  options?: FormikSubmitOption;
  secondId?: string;
  type?: string;
}

/**
 * @type { Manage Get module Base Payload }
 */
export interface ManageQuery<Q, U = {}> {
  query?: Partial<Q>;
  urlParams?: U;
  options?: FormikSubmitOption;
  conditions?: Record<string, any>;
}

/**
 * @type { Dynamic module access object }
 * @module { Multi Select Filter, Table capsule }
 */
export type AccessObject = {
  name: string;
  courseName: string;
  programName: string;
  batchName: string;
  id: string;
  Title: string;
  image: string;
  label: string;
  value: string;
};

export type AccessObjectKey = keyof AccessObject;

/**
 * @type { Update status payload for all apis }
 */
export interface UpdateStatusPayload {
  status: StatusEnum;
}

export type StatusEnum = "Active" | "Inactive";

/**
 * @type { Bulk Upload Return type }
 */
export interface BulkUploadReturn<T = {}> {
  failed: string;
  message: string;
  result: T[];
  isSuccess: boolean;
  errors?: string[];
}
