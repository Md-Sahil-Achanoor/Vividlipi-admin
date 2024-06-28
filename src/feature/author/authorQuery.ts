import toast from 'react-hot-toast'
import API from '../../app/services/api'
import { endpoints } from '../../constants/endpoints'
import {
  ApiResponse,
  AuthorPayload,
  AuthorQuery,
  AuthorResponse,
  ManagePayload,
  ManagePayloadQuery,
  ManageQuery,
} from '../../types'
import { coreAction } from '../core/coreSlice'
import { authorAction } from './authorSlice'

const authorQuery = API.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    getAuthors: builder.query<
      ApiResponse<AuthorResponse[]>,
      ManageQuery<Partial<AuthorQuery>>
    >({
      query: ({ query }) => {
        return {
          url: endpoints.author,
          method: 'GET',
          params: query,
        }
      },
      providesTags: ['Author'],
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          await queryFulfilled
        } catch (err: unknown) {
          // do nothing
          const error = err as any
          const message =
            error?.response?.data?.message || 'Something went wrong!'
          toast.error(message)
        }
      },
    }),

    getAuthorById: builder.query<
      ApiResponse<AuthorResponse>,
      ManageQuery<AuthorQuery>
    >({
      query: ({ query }) => ({
        url: endpoints.author,
        method: 'GET',
        params: query,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled
          dispatch(authorAction.setSelectedAuthor(result?.data?.data))
        } catch (err: unknown) {
          // do nothing
          const error = err as any
          const message =
            error?.response?.data?.message || 'Something went wrong!'
          toast.error(message)
        }
      },
    }),

    // POST
    manageAuthor: builder.mutation<any, ManagePayload<AuthorPayload>>({
      query: ({ data, id }) => ({
        url: endpoints.author,
        method: id ? 'PUT' : 'POST',
        body: data,
        params: {
          id,
        },
      }),
      invalidatesTags: ['Author'],
      async onQueryStarted({ options }, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled
          if (result?.data?.status === 1) {
            options?.resetForm()
            options?.setSubmitting(false)
            dispatch(authorAction.resetAuthor())
            toast.success(result?.data?.message || 'Success')
            // dispatch(
            //   authorQuery.util.updateQueryData(
            //     "getAuthors",
            //     {
            //       query: {},
            //     },
            //     (draft) => {
            //       if (id) {
            //         draft.data = draft?.data?.map((item) =>
            //           item?.id === id ? { ...data, id } : item
            //         );
            //       } else {
            //         draft?.data?.push(data as AuthorResponse);
            //       }
            //     }
            //   )
            // );
            dispatch(coreAction.toggleModal({ open: false, type: '' }))
          } else {
            toast.error(result?.data?.message || 'Something went wrong!')
          }
        } catch (err: unknown) {
          // do nothing
          options?.setSubmitting(false)
          const error = err as any
          // console.log(`\n\n error:`, error);
          const message =
            error?.response?.data?.message || 'Something went wrong!'
          toast.error(message)
        }
      },
    }),

    deleteAuthor: builder.mutation<
      any,
      ManagePayloadQuery<Partial<AuthorQuery>>
    >({
      query: ({ id }) => ({
        url: endpoints.author,
        method: 'DELETE',
        params: {
          id,
        },
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled
          if (result?.data?.status === 1) {
            dispatch(coreAction.toggleModal({ open: false, type: '' }))
            // dispatch(authorAction.resetWithReload());
            dispatch(authorAction.resetAuthor())
            dispatch(
              authorQuery.util.updateQueryData(
                'getAuthors',
                {
                  query: _arg.query,
                },
                (draft) => {
                  draft.data = draft?.data?.filter(
                    (item) => item?.id !== _arg.id,
                  )
                },
              ),
            )
          } else {
            toast.error(result?.data?.message || 'Something went wrong!')
          }
        } catch (err: unknown) {
          // do nothing
          const error = err as any
          const message =
            error?.response?.data?.message || 'Something went wrong!'
          toast.error(message)
        }
      },
    }),
  }),
})

export const {
  useGetAuthorsQuery,
  useGetAuthorByIdQuery,
  useManageAuthorMutation,
  useDeleteAuthorMutation,
} = authorQuery

export default authorQuery
