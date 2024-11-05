import API from '@/app/services/api'
import { endpoints } from '@/constants/endpoints'
import { commentTag } from '@/constants/query-tags.constant'
import {
  ApiResponse,
  CommentQuery,
  CommentResponse,
  ManagePayloadQuery,
  ManageQuery,
} from '@/types'
import toast from 'react-hot-toast'
import { coreAction } from '../core/coreSlice'
import { commentAction } from './commentSlice'

const commentQuery = API.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    getComments: builder.query<
      ApiResponse<CommentResponse[]>,
      ManageQuery<Partial<CommentQuery>>
    >({
      query: ({ query }) => {
        return {
          url: endpoints.product_comment,
          method: 'GET',
          params: query,
        }
      },
      providesTags: commentTag,
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

    updateCommentStatus: builder.mutation<
      any,
      ManagePayloadQuery<Partial<CommentQuery>>
    >({
      query: ({ id }) => ({
        url: endpoints.product_comment,
        method: 'PUT',
        params: {
          ReviewId: id,
        },
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled
          if (result?.data?.status === 1) {
            dispatch(coreAction.toggleModal({ open: false, type: '' }))
            // dispatch(
            //   commentQuery.util.updateQueryData(
            //     'getComments',
            //     {
            //       query: _arg.query,
            //     },
            //     (draft) => {
            //       draft.data = draft?.data?.map((item) =>
            //         item?.id === _arg.id
            //           ? { ...item, status: _arg.status }
            //           : item,
            //       )
            //     },
            //   ),
            // )
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

    deleteComment: builder.mutation<
      any,
      ManagePayloadQuery<Partial<CommentQuery>>
    >({
      query: ({ id }) => ({
        url: endpoints.product_comment,
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
            // dispatch(commentAction.resetWithReload());
            dispatch(commentAction.resetComment())
            dispatch(
              commentQuery.util.updateQueryData(
                'getComments',
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
  useGetCommentsQuery,
  useUpdateCommentStatusMutation,
  useDeleteCommentMutation,
} = commentQuery

export default commentQuery
