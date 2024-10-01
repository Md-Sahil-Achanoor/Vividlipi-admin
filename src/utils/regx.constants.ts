const isValidImageUrl = (url: string): boolean => {
  const imagePattern = /\.(jpeg|jpg|gif|png|svg|bmp)$/i
  return imagePattern.test(url)
}

const alphanumericWithoutSpaceOnly = new RegExp(/^[a-z\d]+$/, 'gi')
const alphanumericOnly = new RegExp(/^[a-z\d\-_\s]+$/, 'gi')

const digitOnly = new RegExp(/^\d+$/, 'gi')
const iemiNumber = new RegExp(/^\d{15,16}$/, 'gi')
const textOnly = new RegExp(/^[a-z\-_\s]+$/, 'gi')
// indian mobile number without country code
const phonePattern = new RegExp(/^[6-9]\d{9}$/, 'gi')
const pincodePattern = new RegExp(/^\d{6}$/, 'gi')

const strongPasswordRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()?~])[A-Za-z\d!@#$%^&*()?~]{8,}$/

const isValid = (pattern: RegExp, value: string): boolean => {
  return pattern.test(value)
}

export {
  alphanumericOnly,
  alphanumericWithoutSpaceOnly,
  digitOnly,
  iemiNumber,
  isValid,
  isValidImageUrl,
  phonePattern,
  pincodePattern,
  strongPasswordRegex,
  textOnly,
}
