import * as Yup from 'yup'

export const publisherSchema = Yup.object({
  Name: Yup.string().required('Name is Required'),
  description: Yup.string().required('Description is Required'),
})

export type IManagePublisher = Yup.InferType<typeof publisherSchema>
