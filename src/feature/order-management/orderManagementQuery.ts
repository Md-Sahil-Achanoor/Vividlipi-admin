import API from '@/app/services/api'
import { endpoints } from '@/constants/endpoints'
import { coreAction } from '@/feature/core/coreSlice'
import { UpdateOrderType } from '@/models'
import {
  ApiResponse,
  AssignOrderQuery,
  AssignOrderResponse,
  IAssignOrderPayload,
  ListResponse,
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
          url: endpoints.get_assign_book,
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
        url: endpoints.assign_book,
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
            options?.router?.('/admin/order-management/assign-order-list')
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
        url: endpoints.delete_assign_book,
        method: 'DELETE',
        params: {
          Orderid: id,
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
      ApiResponse<ListResponse<OrderUserResponse>>,
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

    getOrderUserInfinite: builder.query<
      ApiResponse<ListResponse<OrderUserResponse>>,
      ManageQuery<AssignOrderQuery>
    >({
      query: ({ query }) => {
        return {
          url: endpoints.order_user,
          method: 'GET',
          params: query,
        }
      },
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName
      },
      // Always merge incoming data to the cache entry
      merge: (currentCache, newItems, { arg: { query } }) => {
        // const currentData = currentCache?.search
        const newSearchQuery = query?.search
        const newProducts = newItems.data.data
        // console.log(`\n\n ~ newProducts:`, currentCache?.search, query?.search)
        currentCache.search = newSearchQuery
        if (newItems?.data?.data?.length !== 10) {
          newItems.data.hasMore = false
        }
        if (
          (query?.search && currentCache?.search !== query?.search) ||
          (!currentCache?.search && query?.search)
        ) {
          // If 'search' is applied or changes, replace the cache
          currentCache.data.data = newProducts
        } else {
          // If 'page' changes but 'search' stays the same, merge the new data
          currentCache.data.data.push(...newProducts)
        }
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return (
          currentArg?.query?.page !== previousArg?.query?.page || // Refetch on page change
          currentArg?.query?.search !== previousArg?.query?.search // Refetch on search change
        )
      },
      providesTags: ['OrderUserInfinite'],
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
                  query: _arg.query,
                },
                (draft) => {
                  draft.data.data = draft?.data?.data?.filter(
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

    getOrders: builder.query<
      ApiResponse<ListResponse<AssignOrderResponse>>,
      ManageQuery<AssignOrderQuery>
    >({
      query: ({ query }) => {
        return {
          url: endpoints.order_list,
          method: 'GET',
          params: query,
        }
      },
      providesTags: ['OrderList'],
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

    updateOrder: builder.mutation<any, ManagePayload<UpdateOrderType>>({
      query: ({ data }) => ({
        url: endpoints.update_order,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['OrderList'],
      async onQueryStarted({ options }, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled
          if (result?.data?.status === 1) {
            options?.resetForm()
            dispatch(coreAction.toggleModal({ open: false, type: '' }))
            dispatch(orderManagementAction.resetAll())
            toast.success(result?.data?.message || 'Success')
          } else {
            toast.error(result?.data?.message || 'Something went wrong!')
          }
        } catch (err: unknown) {
          const error = err as any
          // console.log(`\n\n error:`, error);
          const message =
            error?.response?.data?.message || 'Something went wrong!'
          toast.error(message)
        } finally {
          options?.setSubmitting(false)
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
  useGetOrderUserInfiniteQuery,
  useGetOrderUserByIdQuery,
  useManageOrderUserMutation,
  useDeleteOrderUserMutation,
  useUpdateOrderMutation,

  useGetOrdersQuery,
} = orderManagementQuery

export default orderManagementQuery
