import * as Yup from 'yup'

export const publisherSchema = Yup.object({
  Name: Yup.string().required('Name is Required'),
  description: Yup.string().required('Description is Required'),
  Slug: Yup.string().required('Slug is Required'),
})

export type IManagePublisher = Yup.InferType<typeof publisherSchema>

export const publisherResponseSchema = publisherSchema.concat(
  Yup.object({
    id: Yup.number().required('Publisher ID is Required'),
  }),
)

export type IPublisherResponse = Yup.InferType<typeof publisherResponseSchema>
