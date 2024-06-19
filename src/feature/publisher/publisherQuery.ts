import toast from 'react-hot-toast'
import API from '../../app/services/api'
import { endpoints } from '../../constants/endpoints'
import {
  ApiResponse,
  ManagePayload,
  ManagePayloadQuery,
  ManageQuery,
  PublisherPayload,
  PublisherQuery,
  PublisherResponse,
} from '../../types'
import { coreAction } from '../core/coreSlice'
import { publisherAction } from './publisherSlice'

const publisherQuery = API.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    getPublishers: builder.query<
      ApiResponse<PublisherResponse[]>,
      ManageQuery<Partial<PublisherQuery>>
    >({
      query: ({ query }) => {
        return {
          url: endpoints.publisher,
          method: 'GET',
          params: query,
        }
      },
      providesTags: ['Publisher'],
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

    getPublisherById: builder.query<
      ApiResponse<PublisherResponse>,
      ManageQuery<PublisherQuery>
    >({
      query: ({ query }) => ({
        url: endpoints.publisher,
        method: 'GET',
        params: query,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled
          dispatch(publisherAction.setSelectedPublisher(result?.data?.data))
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
    managePublisher: builder.mutation<any, ManagePayload<PublisherPayload>>({
      query: ({ data, id }) => ({
        url: endpoints.publisher,
        method: id ? 'PUT' : 'POST',
        body: data,
        params: {
          id,
        },
      }),
      invalidatesTags: ['Publisher'],
      async onQueryStarted({ options }, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled
          if (result?.data?.status === 1) {
            options?.resetForm()
            options?.setSubmitting(false)
            dispatch(publisherAction.resetPublisher())
            toast.success(result?.data?.message || 'Success')
            // dispatch(
            //   publisherQuery.util.updateQueryData(
            //     "getPublishers",
            //     {
            //       query: {},
            //     },
            //     (draft) => {
            //       if (id) {
            //         draft.data = draft?.data?.map((item) =>
            //           item?.id === id ? { ...data, id } : item
            //         );
            //       } else {
            //         draft?.data?.push(data as PublisherResponse);
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

    deletePublisher: builder.mutation<
      any,
      ManagePayloadQuery<Partial<PublisherQuery>>
    >({
      query: ({ id }) => ({
        url: endpoints.publisher,
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
            // dispatch(publisherAction.resetWithReload());
            dispatch(publisherAction.resetPublisher())
            dispatch(
              publisherQuery.util.updateQueryData(
                'getPublishers',
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
  useGetPublishersQuery,
  useGetPublisherByIdQuery,
  useManagePublisherMutation,
  useDeletePublisherMutation,
} = publisherQuery

export default publisherQuery
