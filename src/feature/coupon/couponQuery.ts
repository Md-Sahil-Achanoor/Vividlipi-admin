import API from '@/app/services/api'
import { endpoints } from '@/constants/endpoints'
import { couponTag } from '@/constants/query-tags.constant'
import {
  ApiResponse,
  CouponPayload,
  CouponQuery,
  CouponResponse,
  ManagePayload,
  ManagePayloadQuery,
  ManageQuery,
} from '@/types'
import toast from 'react-hot-toast'
import { coreAction } from '../core/coreSlice'
import { couponAction } from './couponSlice'

const couponQuery = API.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    getCoupons: builder.query<
      ApiResponse<CouponResponse[]>,
      ManageQuery<Partial<CouponQuery>>
    >({
      query: ({ query }) => {
        return {
          url: endpoints.coupon,
          method: 'GET',
          params: query,
        }
      },
      providesTags: couponTag,
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

    getCouponById: builder.query<
      ApiResponse<CouponResponse>,
      ManageQuery<CouponQuery>
    >({
      query: ({ query }) => ({
        url: endpoints.coupon,
        method: 'GET',
        params: query,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled
          dispatch(couponAction.setSelectedCoupon(result?.data?.data))
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
    manageCoupon: builder.mutation<any, ManagePayload<CouponPayload>>({
      query: ({ data, id }) => ({
        url: endpoints.coupon,
        method: id ? 'PUT' : 'POST',
        body: data,
        params: {
          id,
        },
      }),
      invalidatesTags: couponTag,
      async onQueryStarted({ options }, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled
          if (result?.data?.status === 1) {
            options?.resetForm()
            options?.setSubmitting(false)
            dispatch(couponAction.resetCoupon())
            toast.success(result?.data?.data)
            options?.router?.('/admin/coupon/coupon-list')
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

    deleteCoupon: builder.mutation<
      any,
      ManagePayloadQuery<Partial<CouponQuery>>
    >({
      query: ({ id }) => ({
        url: endpoints.coupon,
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
            // dispatch(couponAction.resetWithReload());
            dispatch(couponAction.resetCoupon())
            dispatch(
              couponQuery.util.updateQueryData(
                'getCoupons',
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
  useGetCouponsQuery,
  useGetCouponByIdQuery,
  useManageCouponMutation,
  useDeleteCouponMutation,
} = couponQuery

export default couponQuery
