export const isValidImageUrl = (url: string): boolean => {
  const imagePattern = /\.(jpeg|jpg|gif|png|svg|bmp)$/i;
  return imagePattern.test(url);
};

const alphanumericWithoutSpaceOnly = new RegExp(/^[a-z\d]+$/, "gi");
const alphanumericOnly = new RegExp(/^[a-z\d\-_\s]+$/, "gi");
// const alphanumericWithSpecial = new RegExp(
//   /^[a-z\d\-_\s\.\,\;\:\'\"\?\!\@\#\$\%\^\&\*\(\)\[\]\{\}]+$/,
//   "gi"
// );
const digitOnly = new RegExp(/^\d+$/, "gi");
const iemiNumber = new RegExp(/^\d{15,16}$/, "gi");
const HardwareId = new RegExp(/^\d{9}$/, "gi");
const SerialNo = new RegExp(/^\d{10}$/, "gi");
const TID = new RegExp(/^\d{6}$/, "gi");
const textOnly = new RegExp(/^[a-z\-_\s]+$/, "gi");
// indian mobile number without country code
const phonePattern = new RegExp(/^[6-9]\d{9}$/, "gi");
const pincodePattern = new RegExp(/^\d{6}$/, "gi");
const manufacture_year = new RegExp(/^\d{4}$/, "gi");
// 12 digit aadhar number
const aadharPattern = new RegExp(/^\d{12}$/, "gi");
// 10 digit pan number
const panPattern = new RegExp(/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/, "gi");
// 10 digit gst number
const gstPattern = new RegExp(
  /^([0-9]){2}([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}([a-zA-Z0-9]){1}([a-zA-Z0-9]){1}?$/,
  "gi"
);
// 10 digit tan number
const tanPattern = new RegExp(/^([a-zA-Z]){4}([0-9]){5}([a-zA-Z]){1}?$/, "gi");
// 10 digit cin number
const cinPattern = new RegExp(
  /^([a-zA-Z]){1}([a-zA-Z0-9]){5}([0-9]){4}([a-zA-Z]){1}([a-zA-Z0-9]){6}?$/,
  "gi"
);
// 21 digit llpin number
const llpinPattern = new RegExp(
  /^([a-zA-Z]){2}([0-9]){2}([a-zA-Z]){4}([0-9]){7}([a-zA-Z]){1}?$/,
  "gi"
);

const isValid = (pattern: RegExp, value: string): boolean => {
  return pattern.test(value);
};

const isValidPhone = (value: string): boolean => {
  return isValid(phonePattern, value);
};

const isValidPincode = (value: string): boolean => {
  return isValid(pincodePattern, value);
};

const isValidAadhar = (value: string): boolean => {
  return isValid(aadharPattern, value);
};

const isValidPan = (value: string): boolean => {
  return isValid(panPattern, value);
};

const isValidGst = (value: string): boolean => {
  return isValid(gstPattern, value);
};

const isValidTan = (value: string): boolean => {
  return isValid(tanPattern, value);
};

const isValidCin = (value: string): boolean => {
  return isValid(cinPattern, value);
};

const isValidLlpin = (value: string): boolean => {
  return isValid(llpinPattern, value);
};

const isValidAlphanumeric = (value: string): boolean => {
  return isValid(alphanumericOnly, value);
};

const isValidAlphanumericWithoutSpace = (value: string): boolean => {
  return isValid(alphanumericWithoutSpaceOnly, value);
};

const isValidText = (value: string): boolean => {
  return isValid(textOnly, value);
};

const isValidManufactureYear = (value: string): boolean => {
  return isValid(manufacture_year, value);
};

export {
  HardwareId,
  SerialNo,
  TID,
  aadharPattern,
  alphanumericOnly,
  alphanumericWithoutSpaceOnly,
  cinPattern,
  digitOnly,
  gstPattern,
  iemiNumber,
  isValid,
  isValidAadhar,
  isValidAlphanumeric,
  isValidAlphanumericWithoutSpace,
  isValidCin,
  isValidGst,
  isValidLlpin,
  isValidManufactureYear,
  isValidPan,
  isValidPhone,
  isValidPincode,
  isValidTan,
  isValidText,
  llpinPattern,
  panPattern,
  phonePattern,
  pincodePattern,
  tanPattern,
  textOnly,
};
