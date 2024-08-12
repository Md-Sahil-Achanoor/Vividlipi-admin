import * as Yup from 'yup'

export const couponSchema = Yup.object().shape({
  name: Yup.string().required('Name is Required'),
  product: Yup.string().required('Product is Required'),
  category1: Yup.string().required('Category 1 is Required'),
  category2: Yup.string().required('Category 2 is Required'),
  publishers: Yup.string().required('Publishers is Required'),
  authors: Yup.string().required('Authors is Required'),
  startDate: Yup.string().required('Start Date is Required'),
  endDate: Yup.string().required('End Date is Required'),
  percentageOff: Yup.number().required('Percentage Off is Required'),
  valueOff: Yup.number().required('Value Off is Required'),
  cartConditions: Yup.string().required('Cart Conditions is Required'),
})

export type IManageCoupon = Yup.InferType<typeof couponSchema>
