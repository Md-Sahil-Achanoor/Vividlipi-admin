/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unsafe-optional-chaining */
import toast from 'react-hot-toast'
import API from '../../app/services/api'
import { endpoints } from '../../constants/endpoints'
import {
  ApiResponse,
  ListResponse,
  ManagePayload,
  ManagePayloadQuery,
  ManageQuery,
  ProductPayload,
  ProductQuery,
  ProductResponse,
} from '../../types'
import { coreAction } from '../core/coreSlice'
import { productAction } from './productSlice'

const productQuery = API.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    getProducts: builder.query<
      ApiResponse<ListResponse<ProductResponse>>,
      ManagePayload<Partial<ProductQuery>>
    >({
      query: ({ query, data }) => ({
        url: endpoints.product_list,
        method: 'POST',
        body: data,
        params: query,
      }),
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          const result = await queryFulfilled
          console.log(`\n\n result:`, result?.data)
          // dispatch(productAction.setProductList(result?.data?.data));
        } catch (err: unknown) {
          // do nothing
          const error = err as any
          const message =
            error?.response?.data?.message || 'Something went wrong!'
          toast.error(message)
        }
      },
    }),

    getProductById: builder.query<
      ApiResponse<ProductResponse>,
      ManageQuery<Partial<ProductQuery>, null>
    >({
      query: ({ query }) => ({
        url: endpoints.product_list,
        method: 'POST',
        params: query,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled
          const { isDeleted, id, ...rest }: ProductResponse = result?.data?.data
          const data: Partial<ProductResponse> = {
            ...rest,
            author_name: rest?.author?.Name,
            AuthorId: rest?.author?.id,
            tags:
              rest?.tags?.length > 0
                ? rest?.tags?.filter((el) => el !== '')
                : [],
            translator_name: rest?.translator_name || '',
            category: [],
            HardCopyPrice: rest?.HardCopyPrice || '',
            AudioPrice: rest?.AudioPrice || '',
            EbookPrice: rest?.EbookPrice || '',
            Stock: rest?.Stock || '',
            Audio_URL: rest?.Audio_URL || '',
            File_URL: rest?.File_URL || '',
            book_format: rest?.book_format?.length
              ? rest?.book_format?.map((el) => Number(el))
              : [],
          }
          console.log(`\n\n data:`, data)
          dispatch(productAction.setSelectedProduct(data as ProductResponse))
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
    manageProduct: builder.mutation<
      any,
      ManagePayload<ProductPayload, Partial<ProductQuery>>
    >({
      query: ({ data, query, id }) => ({
        url: id ? endpoints?.edit_product : endpoints.add_product,
        // method: id ? "PUT" : "POST",
        method: 'POST',
        body: data,
        params: query,
        headers: {
          productid: String(id),
        },
      }),
      async onQueryStarted({ options }, { queryFulfilled }) {
        try {
          const result = await queryFulfilled
          if (result?.data?.status === 1) {
            options?.resetForm()
            toast.success(result?.data?.message || 'Success')
            if (options?.router) {
              options?.router('/admin/products/product-list')
            }
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

    deleteProduct: builder.mutation<
      any,
      ManagePayloadQuery<Partial<ProductQuery>>
    >({
      query: ({ id }) => ({
        url: endpoints.delete_product,
        method: 'POST',
        headers: {
          productid: String(id),
        },
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled
          if (result?.data?.status === 1) {
            dispatch(coreAction.toggleModal({ open: false, type: '' }))
            dispatch(
              productQuery.util.updateQueryData(
                'getProducts',
                {
                  query: _arg.query,
                  data: {
                    page: 1,
                  },
                },
                (draft) => {
                  draft.data.data = draft.data.data?.filter(
                    (item) => item.id !== _arg.id,
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

    // update vendor
    updateProduct: builder.mutation<
      any,
      ManagePayload<Partial<ProductPayload>, Partial<ProductQuery>>
    >({
      query: ({ data, query }) => ({
        url: endpoints.product,
        method: 'POST',
        body: data,
        params: query,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled
          if (result?.data?.status === 1) {
            dispatch(coreAction.toggleModal({ open: false, type: '' }))
            // dispatch(productAction.resetWithReload());
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
  useGetProductsQuery,
  useGetProductByIdQuery,
  useManageProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
} = productQuery

export default productQuery
