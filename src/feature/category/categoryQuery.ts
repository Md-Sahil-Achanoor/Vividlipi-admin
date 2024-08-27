import { categoryTag, couponCategoryTag } from '@/constants/query-tags.constant'
import toast from 'react-hot-toast'
import API from '../../app/services/api'
import { endpoints } from '../../constants/endpoints'
import {
  ApiResponse,
  CategoryPayload,
  CategoryQuery,
  CategoryResponse,
  ManagePayload,
  ManagePayloadQuery,
  ManageQuery,
  SubCategoryPayload,
} from '../../types'
import { coreAction } from '../core/coreSlice'
import { categoryAction } from './categorySlice'

const categoryQuery = API.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    getCategories: builder.query<
      ApiResponse<CategoryResponse[]>,
      ManageQuery<Partial<CategoryQuery>>
    >({
      query: ({ query, conditions }) => {
        const url =
          conditions?.type === 'category1'
            ? endpoints.category_list1
            : endpoints.category_list2
        return {
          url,
          method: 'POST',
          params: query,
        }
      },
      providesTags: categoryTag,
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

    getCategoryById: builder.query<
      ApiResponse<CategoryResponse>,
      ManageQuery<Partial<CategoryQuery>, null>
    >({
      query: ({ query }) => ({
        url: endpoints.category,
        method: 'GET',
        params: query,
        headers: {
          id: String(query?.id),
        },
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled
          dispatch(categoryAction.setSelectedCategory(result?.data?.data))
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
    manageCategory: builder.mutation<
      any,
      ManagePayload<CategoryPayload, Partial<CategoryQuery>>
    >({
      query: ({ data, id }) => ({
        url: id ? endpoints.edit_category1 : endpoints.add_category1,
        // method: id ? "PUT" : "POST",
        method: 'POST',
        body: data,
        headers: {
          cat1: String(id),
        },
      }),
      invalidatesTags: categoryTag,
      async onQueryStarted({ options }, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled
          if (result?.data?.status === 1) {
            options?.resetForm()
            options?.setSubmitting(false)
            toast.success(result?.data?.message || 'Success')
            dispatch(coreAction.toggleModal({ open: false, type: '' }))
            dispatch(categoryAction.resetCategory())
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

    deleteCategory: builder.mutation<
      any,
      ManagePayloadQuery<Partial<CategoryQuery>>
    >({
      query: ({ id }) => ({
        url: endpoints.delete_category1,
        method: 'POST',
        // params: query,
        headers: {
          cat1: String(id),
        },
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled
          if (result?.data?.status === 1) {
            dispatch(coreAction.toggleModal({ open: false, type: '' }))
            // dispatch(categoryAction.resetWithReload());
            dispatch(categoryAction.resetCategory())
            dispatch(
              categoryQuery.util.updateQueryData(
                'getCategories',
                {
                  query: _arg.query,
                  conditions: {
                    type: 'category1',
                  },
                },
                (draft) => {
                  draft.data = draft?.data?.filter(
                    (item) => item?.id !== Number(_arg.id),
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

    getSubCategoryById: builder.query<
      ApiResponse<CategoryResponse>,
      ManageQuery<Partial<CategoryQuery>, null>
    >({
      query: ({ query }) => ({
        url: endpoints.category,
        method: 'GET',
        params: query,
        headers: {
          id: String(query?.id),
        },
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled
          dispatch(categoryAction.setSelectedCategory(result?.data?.data))
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
    manageSubCategory: builder.mutation<
      any,
      ManagePayload<SubCategoryPayload, Partial<CategoryQuery>>
    >({
      query: ({ data, query, id }) => {
        const { category, ...rest } = data
        const body: any = {
          ...rest,
        }
        if (id) {
          body.cat1id = category
        }
        return {
          url: id ? endpoints.edit_category2 : endpoints.add_category2,
          // url: endpoints.category,
          // method: id ? "PUT" : "POST",
          method: 'POST',
          body,
          params: query,
          headers: {
            cat1: String(category),
            cat2: id ? String(id) : '',
          },
        }
      },
      invalidatesTags: categoryTag,
      async onQueryStarted({ options }, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled
          if (result?.data?.status === 1) {
            options?.resetForm()
            options?.setSubmitting(false)
            toast.success(result?.data?.message || 'Success')
            dispatch(coreAction.toggleModal({ open: false, type: '' }))
            dispatch(categoryAction.resetSubCategory())
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

    deleteSubCategory: builder.mutation<
      any,
      ManagePayloadQuery<Partial<CategoryQuery>>
    >({
      query: ({ id }) => ({
        url: endpoints.delete_category2,
        method: 'POST',
        // params: query,
        headers: {
          cat2: String(id),
        },
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled
          if (result?.data?.status === 1) {
            console.log(`\n\n _arg:`, _arg.query)
            dispatch(
              categoryQuery.util.updateQueryData(
                'getCategories',
                {
                  query: _arg.query,
                },
                (draft) => {
                  draft.data = draft?.data?.filter(
                    (item) => item?.id !== Number(_arg.id),
                  )
                },
              ),
            )
            dispatch(coreAction.toggleModal({ open: false, type: '' }))
            dispatch(categoryAction.resetSubCategory())
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
    // get Category by cat1 ids
    getSubCategoryByCategoryIds: builder.query<
      ApiResponse<CategoryResponse[]>,
      ManageQuery<Partial<CategoryQuery>>
    >({
      query: ({ query }) => {
        return {
          url: endpoints.cat2_by_cat1,
          method: 'GET',
          params: query,
        }
      },
      providesTags: couponCategoryTag,
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
  }),
})

export const {
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useManageCategoryMutation,
  useDeleteCategoryMutation,

  useGetSubCategoryByIdQuery,
  useManageSubCategoryMutation,
  useDeleteSubCategoryMutation,

  useGetSubCategoryByCategoryIdsQuery,
} = categoryQuery

export default categoryQuery
