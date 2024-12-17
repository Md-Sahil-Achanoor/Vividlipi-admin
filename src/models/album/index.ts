import * as Yup from 'yup'
import { alphanumericOnly } from '@/utils/regx.constants'

// Validation schema for albums
export const albumSchema = Yup.object().shape({
  Title: Yup.string()
    .required('Title is Required')
    .matches(alphanumericOnly, 'Title should be alphanumeric'),
  coverPic: Yup.string().required('Cover Picture is Required'),
})

// Type inference for managing albums
export type IManageAlbum = Yup.InferType<typeof albumSchema>

// Extended schema for album responses with additional ID field
export const albumResponseSchema = albumSchema.concat(
  Yup.object({
    id: Yup.number().required('Album ID is Required'),
  }),
)

// Type inference for album responses
export type IAlbumResponse = Yup.InferType<typeof albumResponseSchema>
