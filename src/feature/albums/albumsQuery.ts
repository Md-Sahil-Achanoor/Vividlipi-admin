import API from '@/app/services/api'
import { endpoints } from '@/constants/endpoints'
import { albumTag } from '@/constants/query-tags.constant'
import {
  ApiResponse,
  AlbumPayload,
  AlbumQuery,
  AlbumResponse,
  ManagePayload,
  ManageQuery,
} from '@/types/albums'
import toast from 'react-hot-toast'
import { albumAction } from './albumsSlice'

const albumsQuery = API.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    // GET all albums
    getAlbums: builder.query<
      ApiResponse<AlbumResponse[]>,
      ManageQuery<Partial<AlbumQuery>>
    >({
      query: ({ query } = { query: {} }) => ({
        url: '/api/Albums',
        method: 'GET',
        params: query,
      }),
      providesTags: albumTag,
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          await queryFulfilled
        } catch (err: unknown) {
          const error = err as any
          const message =
            error?.response?.data?.message || 'Failed to fetch albums!'
          toast.error(message)
        }
      },
    }),

    // GET an album by ID
    getAlbumById: builder.query<
      ApiResponse<AlbumResponse>,
      ManageQuery<AlbumQuery>
    >({
      query: ({ query }) => ({
        url: endpoints.albums,
        method: 'GET',
        params: query,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled
          dispatch(albumAction.setSelectedAlbum(result?.data?.data))
        } catch (err: unknown) {
          const error = err as any
          const message =
            error?.response?.data?.message || 'Failed to fetch album details!'
          toast.error(message)
        }
      },
    }),

    // CREATE or UPDATE an album
    manageAlbum: builder.mutation<any, ManagePayload<AlbumPayload>>({
      query: ({ data, id }) => ({
        url: endpoints.albums,
        method: id ? 'PUT' : 'POST',
        body: data,
        params: { id },
      }),
      invalidatesTags: albumTag,
      async onQueryStarted({ options }, { queryFulfilled }) {
        try {
          const result = await queryFulfilled
          if (result?.data?.status === 1) {
            options?.resetForm()
            options?.setSubmitting(false)
            toast.success(result?.data?.message || 'Album saved successfully!')
          } else {
            toast.error(result?.data?.message || 'Failed to save album!')
          }
        } catch (err: unknown) {
          options?.setSubmitting(false)
          const error = err as any
          const message =
            error?.response?.data?.message || 'Failed to save album!'
          toast.error(message)
        }
      },
    }),

    // DELETE an album
    deleteAlbum: builder.mutation<any, ManagePayload<Partial<AlbumQuery>>>({
      query: ({ id }) => ({
        url: `/api/Albums?id=${id}`,
        method: 'DELETE',
        params: { id },
      }),
      invalidatesTags: albumTag,
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled
          if (result?.data?.status === 1) {
            dispatch(albumAction.resetAlbum())
            toast.success('Album deleted successfully!')
          } else {
            toast.error(result?.data?.message || 'Failed to delete album!')
          }
        } catch (err: unknown) {
          const error = err as any
          const message =
            error?.response?.data?.message || 'Failed to delete album!'
          toast.error(message)
        }
      },
    }),
  }),
})

export const {
  useGetAlbumsQuery,
  useGetAlbumByIdQuery,
  useManageAlbumMutation,
  useDeleteAlbumMutation,
} = albumsQuery

export default albumsQuery
