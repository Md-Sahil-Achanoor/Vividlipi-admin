import API from '@/app/services/api'
import { endpoints } from '@/constants/endpoints'
import { coreAction } from '@/feature/core/coreSlice'
import {
  ApiResponse,
  AssignOrderQuery,
  AssignOrderResponse,
  IAssignOrderPayload,
  ManagePayload,
  ManagePayloadQuery,
  ManageQuery,
  OrderUserPayload,
  OrderUserResponse,
} from '@/types'
import toast from 'react-hot-toast'
import { orderManagementAction } from './orderManagementSlice'

const orderManagementQuery = API.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    getAssignOrders: builder.query<
      ApiResponse<AssignOrderResponse[]>,
      ManageQuery<AssignOrderQuery>
    >({
      query: ({ query }) => {
        return {
          url: endpoints.role_list,
          method: 'GET',
          params: query,
        }
      },
      providesTags: ['AssignOrderList'],
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

    getAssignOrderById: builder.query<
      ApiResponse<AssignOrderResponse>,
      ManageQuery<AssignOrderQuery>
    >({
      query: ({ query }) => ({
        url: endpoints.role_list,
        method: 'GET',
        params: query,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled
          dispatch(
            orderManagementAction.setSelectedAssignUser(result?.data?.data),
          )
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
    manageAssignOrder: builder.mutation<
      any,
      ManagePayload<IAssignOrderPayload, AssignOrderQuery>
    >({
      query: ({ data, id }) => ({
        url: endpoints.role_list,
        method: id ? 'PUT' : 'POST',
        body: data,
        params: {
          id,
        },
      }),
      invalidatesTags: ['AssignOrderList'],
      async onQueryStarted({ options }, { queryFulfilled }) {
        try {
          const result = await queryFulfilled
          if (result?.data?.status === 1) {
            options?.resetForm()
            toast.success(result?.data?.message || 'Success')
            options?.router?.('/admin/order-management/role-list')
          } else {
            toast.error(result?.data?.message || 'Something went wrong!')
          }
          options?.setSubmitting(false)
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

    deleteAssignOrder: builder.mutation<
      any,
      ManagePayloadQuery<AssignOrderQuery>
    >({
      query: ({ id }) => ({
        url: endpoints.role_list,
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
            dispatch(
              orderManagementQuery.util.updateQueryData(
                'getAssignOrders',
                {
                  query: {},
                },
                (draft) => {
                  draft.data = draft?.data?.filter(
                    (item) => item?.id !== Number(_arg.id),
                  )
                },
              ),
            )
            toast.success(result?.data?.message || 'Delete Successful!')
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

    getOrderUser: builder.query<
      ApiResponse<OrderUserResponse[]>,
      ManageQuery<AssignOrderQuery>
    >({
      query: ({ query }) => {
        return {
          url: endpoints.order_user,
          method: 'GET',
          params: query,
        }
      },
      providesTags: ['OrderUser'],
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

    getOrderUserById: builder.query<
      ApiResponse<OrderUserResponse>,
      ManageQuery<AssignOrderQuery>
    >({
      query: ({ query }) => ({
        url: endpoints.order_user,
        method: 'GET',
        params: query,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled
          dispatch(
            orderManagementAction.setSelectedOrderUser(result?.data?.data),
          )
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
    manageOrderUser: builder.mutation<
      any,
      ManagePayload<OrderUserPayload, AssignOrderQuery>
    >({
      query: ({ data, id }) => {
        return {
          url: endpoints.order_user,
          method: id ? 'PUT' : 'POST',
          body: data,
          params: {
            id,
          },
        }
      },
      invalidatesTags: ['OrderUser'],
      async onQueryStarted({ options }, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled
          if (result?.data?.status === 1) {
            options?.resetForm()
            options?.setSubmitting(false)
            toast.success(result?.data?.message || 'Success')
            dispatch(orderManagementAction.resetAll())
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

    deleteOrderUser: builder.mutation<
      any,
      ManagePayloadQuery<AssignOrderQuery>
    >({
      query: ({ id }) => ({
        url: endpoints.order_user,
        method: 'DELETE',
        params: {
          id,
        },
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled
          if (result?.data?.status === 1) {
            // console.log(`\n\n _arg:`, _arg.query);
            dispatch(
              orderManagementQuery.util.updateQueryData(
                'getOrderUser',
                {
                  query: {},
                },
                (draft) => {
                  draft.data = draft?.data?.filter(
                    (item) => item?.id !== Number(_arg.id),
                  )
                },
              ),
            )
            dispatch(coreAction.toggleModal({ open: false, type: '' }))
            // dispatch(categoryAction.resetSubRole());
            toast.success(result?.data?.message || 'Delete Successful!')
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
  useGetAssignOrdersQuery,
  useGetAssignOrderByIdQuery,
  useManageAssignOrderMutation,
  useDeleteAssignOrderMutation,

  useGetOrderUserQuery,
  useGetOrderUserByIdQuery,
  useManageOrderUserMutation,
  useDeleteOrderUserMutation,
} = orderManagementQuery

export default orderManagementQuery
