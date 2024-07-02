import * as Yup from 'yup'

export const authorSchema = Yup.object({
  Pic: Yup.string().required('Image is Required'),
  Name: Yup.string().required('Name is Required'),
  Slug: Yup.string().required('Slug is Required'),
  description: Yup.string().required('Description is Required'),
})

export type IManageAuthor = Yup.InferType<typeof authorSchema>
