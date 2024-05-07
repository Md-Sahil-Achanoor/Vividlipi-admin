import toast from "react-hot-toast";
import API from "../../app/services/api";
import { endpoints } from "../../constants/api/endpoints";
import {
  ApiResponse,
  ManagePayload,
  ManagePayloadQuery,
  ManageQuery,
  ProductPayload,
  ProductQuery,
  ProductResponse,
} from "../../types";
import { coreAction } from "../core/coreSlice";
import { productAction } from "./productSlice";

const productQuery = API.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    getProducts: builder.query<
      ApiResponse<ProductResponse[]>,
      ManageQuery<Partial<ProductQuery>>
    >({
      query: ({ query }) => ({
        url: endpoints.product_list,
        method: "POST",
        body: query,
      }),
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          console.log(`\n\n result:`, result?.data);
          // dispatch(productAction.setProductList(result?.data?.data));
        } catch (err: unknown) {
          // do nothing
          const error = err as any;
          const message =
            error?.response?.data?.message || "Something went wrong!";
          toast.error(message);
        }
      },
    }),

    getProductById: builder.query<
      ApiResponse<ProductResponse>,
      ManageQuery<Partial<ProductQuery>, null>
    >({
      query: ({ query }) => ({
        url: endpoints.product,
        method: "GET",
        params: query,
        headers: {
          id: query?.id,
        },
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          dispatch(productAction.setSelectedProduct(result?.data?.data));
        } catch (err: unknown) {
          // do nothing
          const error = err as any;
          const message =
            error?.response?.data?.message || "Something went wrong!";
          toast.error(message);
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
        method: "POST",
        body: data,
        params: query,
      }),
      async onQueryStarted({ options }, { queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          if (result?.data?.status === 1) {
            options?.resetForm();
            options?.setSubmitting(false);
            toast.success(result?.data?.message || "Success");
            if (options?.router) {
              options?.router("/admin/products/product-list");
            }
          } else {
            toast.error(result?.data?.message || "Something went wrong!");
          }
        } catch (err: unknown) {
          // do nothing
          options?.setSubmitting(false);
          const error = err as any;
          // console.log(`\n\n error:`, error);
          const message =
            error?.response?.data?.message || "Something went wrong!";
          toast.error(message);
        }
      },
    }),

    deleteProduct: builder.mutation<
      any,
      ManagePayloadQuery<Partial<ProductQuery>>
    >({
      query: ({ query }) => ({
        url: endpoints.product,
        method: "DELETE",
        params: query,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          if (result?.data?.status === 1) {
            dispatch(coreAction.toggleModal({ open: false, type: "" }));
            dispatch(productAction.resetWithReload());
          } else {
            toast.error(result?.data?.message || "Something went wrong!");
          }
        } catch (err: unknown) {
          // do nothing
          const error = err as any;
          const message =
            error?.response?.data?.message || "Something went wrong!";
          toast.error(message);
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
        method: "POST",
        body: data,
        params: query,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          if (result?.data?.status === 1) {
            dispatch(coreAction.toggleModal({ open: false, type: "" }));
            dispatch(productAction.resetWithReload());
          } else {
            toast.error(result?.data?.message || "Something went wrong!");
          }
        } catch (err: unknown) {
          // do nothing
          const error = err as any;
          const message =
            error?.response?.data?.message || "Something went wrong!";
          toast.error(message);
        }
      },
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useManageProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
} = productQuery;

export default productQuery;