import { strongPasswordRegex } from '@/utils/regx.constants'
import * as Yup from 'yup'

export const manageOrderUserSchema = Yup.object().shape({
  first_name: Yup.string().required('First Name is required'),
  last_name: Yup.string().required('Last Name is required'),
  MobileNumber: Yup.string().required('Phone Number is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  country: Yup.string().required('Country is required'),
  password: Yup.string()
    .matches(
      strongPasswordRegex,
      'Password must contain at least 8 characters, including at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character',
    )
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
  countryInfo: Yup.object()
    .shape({
      countryCode: Yup.string(),
      dialCode: Yup.string(),
      format: Yup.string(),
      name: Yup.string(),
    })
    .optional(),
})

export type ManageOrderUserType = Yup.InferType<typeof manageOrderUserSchema>

export const assignOrderSchema = Yup.object().shape({
  userid: Yup.mixed()
    .nullable()
    .test({
      name: 'userid',
      message: 'User is required',
      test(value) {
        return value !== null
      },
    }),
  Productdatas: Yup.array().of(
    Yup.object().shape({
      id: Yup.mixed()
        .nullable()
        .test({
          name: 'id',
          message: 'Product is required',
          test(value) {
            return value !== null
          },
        }),
      selectedFormat: Yup.string().required('Format is required'),
      selectedFormatPrice: Yup.number().required('Price is required'),
      quantity: Yup.number().required('Quantity is required'),
    }),
  ),
})

export type AssignOrderType = Yup.InferType<typeof assignOrderSchema>
