import { alphanumericOnly } from '@/utils/valid-image'
import * as Yup from 'yup'
import { authorResponseSchema } from '../author'
import { productResponseSchema } from '../product'
import { publisherResponseSchema } from '../publisher'

export const categoryResponseSchema = Yup.object().shape({
  id: Yup.number().required('Category ID is required'),
  title: Yup.string().required('Category name is required'),
  Slug: Yup.string().required('Category slug is required'),
})

export const couponSchema = Yup.object().shape({
  coupon_name: Yup.string()
    .matches(alphanumericOnly, 'Alphanumeric characters only allowed')
    .required('Coupon name is required'), // Alphanumeric, all caps, no spaces
  start_date: Yup.string().required('Start Date is Required'), // Starts at 12 AM on this date
  end_date: Yup.string().required('End Date is Required'), // Ends at 12 PM on this date
  discount_type: Yup.string()
    .oneOf(['PERCENTAGE', 'VALUE'], 'Invalid discount type')
    .required('Discount type is required'), // Can be 'PERCENTAGE' or 'VALUE'
  discount_value: Yup.mixed<number | string>().test({
    name: 'discount_value',
    message: 'Discount value is required',
    test: function (value) {
      const { discount_type } = this.parent
      if (!value) return false
      const numValue = Number(value)
      if (discount_type === 'PERCENTAGE') {
        return numValue >= 1 && numValue <= 100
      } else if (discount_type === 'VALUE') {
        return numValue >= 1
      }
      return false
    },
  }),
  minimum_cart_value: Yup.number()
    .min(0, 'Negative value is not allowed')
    .required('Minimum cart value is required'), // Minimum cart value required
  category_1: Yup.array().of(categoryResponseSchema),
  category_2: Yup.array().of(categoryResponseSchema),
  product_ids: Yup.array().of(productResponseSchema),
  publisher_ids: Yup.array().of(publisherResponseSchema),
  author_ids: Yup.array().of(authorResponseSchema),
})

export type IManageCoupon = Yup.InferType<typeof couponSchema>