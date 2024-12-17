import API from '@/app/services/api'
import { endpoints } from '@/constants/endpoints'
import { photoTag } from '@/constants/query-tags.constant'
import {
  ApiResponse,
  PhotoPayload,
  PhotoQuery,
  PhotoResponse,
  ManagePayload,
  ManageQuery,
} from '@/types/photo'
import toast from 'react-hot-toast'
import { photoAction } from './photosSlice'

const photosQuery = API.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    // GET all photos
    getPhotos: builder.query<
      ApiResponse<PhotoResponse[]>,
      ManageQuery<Partial<PhotoQuery>>
    >({
      query: ({ query } = { query: {} }) => ({
        url: '/api/AlbumsPhotos',
        method: 'GET',
        params: query,
      }),
      providesTags: photoTag,
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          await queryFulfilled
        } catch (err: unknown) {
          const error = err as any
          const message =
            error?.response?.data?.message || 'Failed to fetch photos!'
          toast.error(message)
        }
      },
    }),

    // GET a photo by ID
    getPhotoById: builder.query<
      ApiResponse<PhotoResponse>,
      ManageQuery<PhotoQuery>
    >({
      query: ({ query }) => ({
        url: endpoints.albumsPhotos,
        method: 'GET',
        params: query,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled
          dispatch(photoAction.setSelectedPhoto(result?.data?.data))
        } catch (err: unknown) {
          const error = err as any
          const message =
            error?.response?.data?.message || 'Failed to fetch photo details!'
          toast.error(message)
        }
      },
    }),

    // CREATE or UPDATE a photo
    managePhoto: builder.mutation<any, ManagePayload<PhotoPayload>>({
      query: ({ data, id }) => ({
        url: `/api/AlbumsPhotos`,
        method: id ? 'PUT' : 'POST',
        body: data,
      }),
      invalidatesTags: photoTag,
      async onQueryStarted({ options }, { queryFulfilled }) {
        try {
          const result = await queryFulfilled
          if (result?.data?.status === 1) {
            options?.resetForm()
            options?.setSubmitting(false)
            toast.success(result?.data?.message || 'Photo saved successfully!')
          } else {
            toast.error(result?.data?.message || 'Failed to save photo!')
          }
        } catch (err: any) {
          options?.setSubmitting(false)
          toast.error(err?.response?.data?.message || 'Failed to save photo!')
        }
      },
    }),

    // DELETE a photo
    deletePhoto: builder.mutation<any, ManagePayload<Partial<PhotoQuery>>>({
      query: ({ id }) => ({
        url: `/api/AlbumsPhotos?id=${id}`,
        method: 'DELETE',
        params: { id },
      }),
      invalidatesTags: photoTag,
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled
          if (result?.data?.status === 1) {
            dispatch(photoAction.resetPhoto())
            toast.success('Photo deleted successfully!')
          } else {
            toast.error(result?.data?.message || 'Failed to delete photo!')
          }
        } catch (err: unknown) {
          const error = err as any
          const message =
            error?.response?.data?.message || 'Failed to delete photo!'
          toast.error(message)
        }
      },
    }),
  }),
})

export const {
  useGetPhotosQuery,
  useGetPhotoByIdQuery,
  useManagePhotoMutation,
  useDeletePhotoMutation,
} = photosQuery

export default photosQuery
