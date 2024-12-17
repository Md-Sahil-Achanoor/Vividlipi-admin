import * as Yup from 'yup'
import { alphanumericOnly } from '@/utils/regx.constants'

// Validation schema for photos
export const photoSchema = Yup.object().shape({
  Name: Yup.string()
    .required('Photo Name is Required')
    .matches(alphanumericOnly, 'Photo Name should be alphanumeric'),
  Pic: Yup.string().required('Photo is Required'),
  AlbumId: Yup.string()
    .required('Album is Required')
    .notOneOf([''], 'Please select a valid album'),
})

// Type inference for managing photos
export type IManagePhoto = Yup.InferType<typeof photoSchema>

// Extended schema for photo responses with additional ID field
export const photoResponseSchema = photoSchema.concat(
  Yup.object({
    id: Yup.number().required('Photo ID is Required'),
  }),
)

// Type inference for photo responses
export type IPhotoResponse = Yup.InferType<typeof photoResponseSchema>
