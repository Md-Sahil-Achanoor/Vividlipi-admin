import {
  AssetPayload,
  AssetResponse,
  BrandResponse,
  EmployeePayload,
  EmployeeResponse,
  OperatorResponse,
  PosResponse,
  PostBulkPayload,
  RouteResponse,
  StagePayload,
  StageResponse,
  VendorResponse,
} from "..";

export interface CommonState {
  progress: number;
  uploading: boolean;
  totalPage: number;
  reRenderBulk: boolean;
}

export interface ImageResponse {
  image_link: string;
}

export type bulkUploadPayload =
  | EmployeePayload[]
  | StagePayload[]
  | AssetPayload[]
  | PostBulkPayload;

export interface BulkUploadQuery {
  endpoint: string;
  type?: string;
}

export interface GlobalSearchResponse {
  Employees: EmployeeResponse[];
  Assets: AssetResponse[];
  Stages: StageResponse[];
  Route: RouteResponse[];
  Operator: OperatorResponse[];
  EventManager: EmployeeResponse[];
  AdPartner: [];
  Vendors: VendorResponse[];
  Brands: BrandResponse[];
  POS: PosResponse[];
}

export interface GlobalSearchPayload {
  Keyword: string;
}
