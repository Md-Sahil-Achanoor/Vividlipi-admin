// import moment from "moment";
// import { manageAssetSchema } from "../../models/asset";
// import { employeeExcelSchema, employeeTypes } from "../../models/employee";
// import { managePosSchema } from "../../models/pos";
// import { manageStageSchema } from "../../models/stage";
// import { BulkUploadReturn } from "../../types";
// import { ExcelDateToJSDate, formatDate } from "../time";
// import validateSchema from "../validateSchema";

// const checkAsset = async <T extends AssetPayload>(
//   assets: T[]
// ): Promise<BulkUploadReturn<T>> => {
//   let failed = "";
//   let message = "";
//   let isSuccess = false;
//   let result: T[] = [];
//   let errors: string[] = [];
//   for (let i = 0; i < assets.length; i++) {
//     const asset = assets[i];
//     console.log(`\n\n ~ asset:`, asset);
//     let obj: T = { ...asset };
//     // asset model
//     const asset_model: string = String(asset?.asset_model);
//     // asset registration number
//     const asset_registration_number: string = String(
//       asset?.asset_registration_number
//     );
//     // manufacture_year 4 digit number
//     const manufacture_year = Number(asset?.manufacture_year);

//     let isDate = true;
//     let isMomentValidate =
//       typeof asset?.insurance_expiry_date === "string"
//         ? moment(asset?.insurance_expiry_date).isValid()
//         : false;
//     if (
//       (Number(asset?.insurance_expiry_date) < 1 &&
//         typeof asset?.insurance_expiry_date !== "number") ||
//       (!isMomentValidate && typeof asset?.insurance_expiry_date === "string")
//     ) {
//       message = `invalid insurance date in ${
//         i + 2
//       }. format should be (YYYY/MM/DD)`;
//       isDate = false;
//       break;
//     }

//     obj.insurance_expiry_date = isMomentValidate
//       ? formatDate(String(asset?.insurance_expiry_date)?.trim(), "YYYY-MM-DD")
//       : isDate
//       ? formatDate(
//           ExcelDateToJSDate(Number(asset?.insurance_expiry_date)),
//           "YYYY-MM-DD"
//         )
//       : "";

//     isDate = true;
//     isMomentValidate =
//       typeof asset?.emission_expiry_date === "string"
//         ? moment(asset?.emission_expiry_date).isValid()
//         : false;

//     if (
//       (Number(asset?.emission_expiry_date) < 1 &&
//         typeof asset?.emission_expiry_date !== "number") ||
//       (!isMomentValidate && typeof asset?.emission_expiry_date === "string")
//     ) {
//       message = `invalid emission date in ${
//         i + 2
//       }. format should be (YYYY/MM/DD)`;
//       isDate = false;
//       break;
//     }
//     obj.emission_expiry_date = isMomentValidate
//       ? formatDate(String(asset?.emission_expiry_date)?.trim(), "YYYY-MM-DD")
//       : isDate
//       ? formatDate(
//           ExcelDateToJSDate(Number(asset?.emission_expiry_date)),
//           "YYYY-MM-DD"
//         )
//       : "";

//     isDate = true;
//     isMomentValidate =
//       typeof asset?.permit_expiry_date === "string"
//         ? moment(asset?.permit_expiry_date).isValid()
//         : false;

//     if (
//       (Number(asset?.permit_expiry_date) < 1 &&
//         typeof asset?.permit_expiry_date !== "number") ||
//       (!isMomentValidate && typeof asset?.permit_expiry_date === "string")
//     ) {
//       message = `invalid expiry date in ${
//         i + 2
//       }. format should be (YYYY/MM/DD)`;
//       isDate = false;
//       break;
//     }
//     obj.permit_expiry_date = isMomentValidate
//       ? formatDate(String(asset?.permit_expiry_date)?.trim(), "YYYY-MM-DD")
//       : isDate
//       ? formatDate(
//           ExcelDateToJSDate(Number(asset?.permit_expiry_date)),
//           "YYYY-MM-DD"
//         )
//       : "";

//     obj.asset_model = asset_model;
//     obj.asset_registration_number = asset_registration_number;
//     obj.manufacture_year = manufacture_year;
//     obj.chassis_number = asset?.chassis_number;
//     obj.engine_number = asset?.engine_number;
//     obj.permit_number = asset?.permit_number;
//     obj.status = 1;

//     const validate = await validateSchema(manageAssetSchema, obj);
//     if (validate?.errors?.length) {
//       errors = [`Error in row ${i + 2}`, ...validate?.errors];
//       // if (message) errors = [...errors, message];
//       break;
//     }
//     // obj.status = asset?.status;
//     result.push({ ...obj });
//   }
//   return { failed, result, message, isSuccess, errors };
// };

// const checkStage = async <T extends StagePayload>(
//   stages: T[]
// ): Promise<BulkUploadReturn<T>> => {
//   let failed = "";
//   let message = "";
//   let isSuccess = false;
//   let result: T[] = [];
//   let errors: string[] = [];
//   for (let i = 0; i < stages.length; i++) {
//     const stage = stages[i];
//     // console.log(`\n\n ~ file: brand.ts:17 ~ stage:`, stage);
//     let obj: T = { ...stage };
//     const validate = await validateSchema(manageStageSchema, stage);
//     if (validate?.errors?.length) {
//       errors = [`Error in row ${i + 2}`, ...validate?.errors];
//       break;
//     }
//     // stage name
//     const stage_name: string = String(stage?.stage_name);
//     obj.stage_name = stage_name;
//     obj.status = 1;
//     result.push({ ...obj });
//   }
//   return { failed, result, message, isSuccess, errors };
// };

// const checkEmployee = async <T extends EmployeePayload>(
//   employees: T[]
// ): Promise<BulkUploadReturn<T>> => {
//   let failed = "";
//   let message = "";
//   let isSuccess = false;
//   let errors: string[] = [];
//   let result: T[] = [];
//   for (let i = 0; i < employees.length; i++) {
//     const employee = employees[i];
//     // console.log(`\n\n ~ file: brand.ts:17 ~ employee:`, employee);
//     let obj: T = { ...employee };
//     // check for valid email
//     if (!employee?.employee_name) {
//       failed += " employee_name,";
//     }
//     if (!employee?.employee_type) {
//       failed += " employee_type,";
//     }
//     if (!employee?.email) {
//       failed += " email,";
//     }
//     if (!employee?.phone_number) {
//       failed += " phone_number,";
//     }
//     if (!employee?.date_of_birth) {
//       failed += " date_of_birth,";
//     }
//     if (!employee?.aadhar_number) {
//       failed += " aadhar_number,";
//     }
//     if (!employee?.city) {
//       failed += " city,";
//     }
//     if (!employee?.pincode) {
//       failed += " pincode,";
//     }
//     if (!employee?.address_1) {
//       failed += " address_1,";
//     }
//     if (!employee?.address_2) {
//       failed += " address_2,";
//     }
//     // if (!employee?.password) {
//     //   failed += " password,";
//     // }
//     if (failed) {
//       message = `Missing field ${failed} in row ${i + 2}`;
//       break;
//     }

//     let isDate = true;
//     let isMomentValidate =
//       typeof employee?.date_of_birth === "string"
//         ? moment(employee?.date_of_birth).isValid()
//         : false;
//     if (
//       (Number(employee?.date_of_birth) < 1 &&
//         typeof employee?.date_of_birth !== "number") ||
//       (!isMomentValidate && typeof employee?.date_of_birth === "string")
//     ) {
//       message = `invalid date of birth in ${
//         i + 2
//       }. format should be (YYYY/MM/DD)`;
//       isDate = false;
//       break;
//     }
//     obj.date_of_birth = isMomentValidate
//       ? formatDate(String(employee?.date_of_birth)?.trim(), "YYYY-MM-DD")
//       : isDate
//       ? formatDate(
//           ExcelDateToJSDate(Number(employee?.date_of_birth)),
//           "YYYY-MM-DD"
//         )
//       : "";
//     // console.log(`\n\n ~ file: operator.ts:379 ~ obj:`, obj);
//     const validate = await validateSchema(employeeExcelSchema, obj);
//     // console.log(`\n\n  validate:`, validate);
//     const employee_type: string = String(employee?.employee_type);
//     const findIndex = employeeTypes.findIndex((item) => item === employee_type);
//     if (findIndex === -1 && typeof employee_type !== "number") {
//       message = `Invalid employee type in row ${
//         i + 2
//       }. Valid values are ${employeeTypes.join(", ")}`;
//       // break;
//     }
//     if (validate?.errors?.length) {
//       errors = [`Error in row ${i + 2}`, ...validate?.errors];
//       if (message) errors = [...errors, message];
//       break;
//     }
//     obj.employee_type = (findIndex + 1)?.toString();
//     obj.employee_name = employee?.employee_name;
//     obj.email = employee?.email;
//     obj.phone_number = employee?.phone_number;
//     obj.aadhar_number = employee?.aadhar_number;
//     obj.city = employee?.city;
//     obj.pincode = employee?.pincode;
//     obj.address_1 = employee?.address_1;
//     obj.address_2 = employee?.address_2;
//     obj.password = "0";
//     result.push({ ...obj });
//   }
//   return { failed, result, message, isSuccess, errors };
// };

// const checkPos = async <T extends PosPayload>(
//   poses: T[],
//   operatorId?: string
// ): Promise<BulkUploadReturn<T>> => {
//   let failed = "";
//   let message = "";
//   let isSuccess = false;
//   let errors: string[] = [];
//   let result: T[] = [];
//   for (let i = 0; i < poses.length; i++) {
//     const pos = poses[i];
//     // console.log(`\n\n ~ file: brand.ts:17 ~ pos:`, pos);
//     let obj: T = { ...pos, operator_id: operatorId };
//     let isDate = true;
//     let isMomentValidate =
//       typeof pos?.date_of_acceptance === "string"
//         ? moment(pos?.date_of_acceptance).isValid()
//         : false;
//     if (
//       (Number(pos?.date_of_acceptance) < 1 &&
//         typeof pos?.date_of_acceptance !== "number") ||
//       (!isMomentValidate && typeof pos?.date_of_acceptance === "string")
//     ) {
//       message = `invalid date of birth in ${
//         i + 2
//       }. format should be (YYYY/MM/DD)`;
//       isDate = false;
//       break;
//     }
//     obj.date_of_acceptance = isMomentValidate
//       ? formatDate(String(pos?.date_of_acceptance)?.trim(), "YYYY-MM-DD")
//       : isDate
//       ? formatDate(
//           ExcelDateToJSDate(Number(pos?.date_of_acceptance)),
//           "YYYY-MM-DD"
//         )
//       : "";
//     const validate = await validateSchema(managePosSchema, obj);
//     if (validate?.errors?.length) {
//       errors = [`Error in row ${i + 2}`, ...validate?.errors];
//       break;
//     }
//     result.push(obj);
//   }
//   return { failed, result, message, isSuccess, errors };
// };

// export {
//   checkAsset,
//   checkEmployee,
//   checkPos,
//   checkStage,
//   dayPassList,
//   halfyearlyPassList,
//   monthPassList,
//   quaterlyPassList,
//   sampleAsset,
//   sampleEmployee,
//   samplePos,
//   sampleStage,
//   weekPassList,
//   yearlyPassList,
// };
