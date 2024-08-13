import * as Yup from 'yup'

export const signUpSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email address is required.'),
  code: Yup.string().min(6).max(6).required('Code is required.'),
  school: Yup.string().required('Academy name is required.'),
  name: Yup.string().required('Name is required.'),
  password: Yup.string()
    .min(8)
    .required('Password is required.')
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/,
      'Password must contain at least 8 characters, one letter and one number.',
    ),
  agree: Yup.boolean().oneOf(
    [true],
    'You must accept the terms and conditions.',
  ),
  contact: Yup.string().required('Phone number is required.'),
  address: Yup.string().required('address is required.'),
})

export const operatorSignUpSchema = Yup.object({
  CompanyName: Yup.string()
    // .matches(alphanumericOnly, "Must be alphanumeric only")
    .required('Company name is required.'),
  ShortName: Yup.string()
    // .matches(alphanumericOnly, "Must be alphanumeric only")
    .test({
      name: 'shortName',
      test: (value) => {
        if (value) {
          return value.length <= 7
        }
        return false
      },
      message: 'Short name must be less than 7 characters',
    })
    .required('Short name is required.'),
  CompanyEmail: Yup.string()
    .email('Invalid email format')
    .required('Company email is required.'),
  PhoneNo: Yup.string()
    // .matches(
    //   // phonePattern,
    //   "Invalid phone number format. It should be 10 digits only"
    // )
    .required('Phone number is required.'),
  ContactName: Yup.string()
    // .matches(alphanumericOnly, "Contact name must be alphanumeric only")
    .required('Contact name is required.'),
  ContactEmail: Yup.string()
    .email('Invalid email format')
    .required('Contact email is required.'),
  GSTIN: Yup.string()
    // .matches(alphanumericOnly, "GSTIN must be alphanumeric only")
    .required('GSTIN is required.'),
  CIN: Yup.string()
    // .matches(alphanumericOnly, "CIN must be alphanumeric only")
    .test({
      name: 'cin',
      test: (value, context) => {
        const { as } = context.parent
        if (as === 'Operator') {
          return !!value
        }
        return true
      },
      message: 'CIN must be 21 characters',
    }),
  Address1: Yup.string().required('address is required.'),
  Address2: Yup.string().optional(),
  City: Yup.string()
    // .matches(alphanumericOnly, "City must be alphanumeric only")
    .required('City is required.'),
  Pincode: Yup.string()
    // .matches(pincodePattern, "Pin code must be a digits")
    .test({
      name: 'pincode',
      test: (value) => {
        if (value) {
          return value.length === 6
        }
        return false
      },
      message: 'Pin code must be 6 digits',
    })
    .required('Pin code is required.'),
  Password: Yup.string()
    .required('Password is required.')
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/,
      'Password must contain at least 8 characters, one letter and one number.',
    ),
  passwordConfirm: Yup.string()
    .required('Please enter your confirm password')
    .oneOf([Yup.ref('Password')], 'Passwords must match'),
  as: Yup.string().required('Please select one option'),
})

export const signInSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email address is required.'),
  password: Yup.string().required('Password is required.'),
})

export type ISignIn = Yup.InferType<typeof signInSchema>

export const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email format'),
  password: Yup.string().matches(
    /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/,
    'Password must contain at least 8 characters, one letter and one number.',
  ),
})

export const updateAdminSchema = Yup.object().shape({
  Name: Yup.string().required('Name is required.'),
  profilepic: Yup.string().required('Profile picture is required.'),
})
