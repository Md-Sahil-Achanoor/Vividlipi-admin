import toast from "react-hot-toast";
import API from "../../app/services/api";
import { endpoints } from "../../constants/api/endpoints";
import {
  ApiResponse,
  CategoryPayload,
  CategoryQuery,
  CategoryResponse,
  ManagePayload,
  ManagePayloadQuery,
  ManageQuery,
  SubCategoryPayload,
} from "../../types";
import { coreAction } from "../core/coreSlice";
import { categoryAction } from "./categorySlice";

const categoryQuery = API.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    getCategories: builder.query<
      ApiResponse<CategoryResponse[]>,
      ManageQuery<Partial<CategoryQuery>>
    >({
      query: ({ query, conditions }) => {
        let url =
          conditions?.type === "category1"
            ? endpoints.category_list1
            : endpoints.category_list2;
        return {
          url,
          method: "POST",
          params: query,
        };
      },
      providesTags: ["Category"],
    }),

    getCategoryById: builder.query<
      ApiResponse<CategoryResponse>,
      ManageQuery<Partial<CategoryQuery>, null>
    >({
      query: ({ query }) => ({
        url: endpoints.category,
        method: "GET",
        params: query,
        headers: {
          id: query?.id,
        },
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          dispatch(categoryAction.setSelectedCategory(result?.data?.data));
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
    manageCategory: builder.mutation<
      any,
      ManagePayload<CategoryPayload, Partial<CategoryQuery>>
    >({
      query: ({ data, query, id }) => ({
        url: id ? endpoints.edit_category1 : endpoints.add_category1,
        // method: id ? "PUT" : "POST",
        method: "POST",
        body: data,
        params: query,
      }),
      invalidatesTags: ["Category"],
      async onQueryStarted({ options }, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result?.data?.status === 1) {
            options?.resetForm();
            options?.setSubmitting(false);
            toast.success(result?.data?.message || "Success");
            dispatch(coreAction.toggleModal({ open: false, type: "" }));
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

    deleteCategory: builder.mutation<
      any,
      ManagePayloadQuery<Partial<CategoryQuery>>
    >({
      query: ({ query }) => ({
        url: endpoints.category,
        method: "DELETE",
        params: query,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          if (result?.data?.status === 1) {
            dispatch(coreAction.toggleModal({ open: false, type: "" }));
            dispatch(categoryAction.resetWithReload());
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

    getSubCategoryById: builder.query<
      ApiResponse<CategoryResponse>,
      ManageQuery<Partial<CategoryQuery>, null>
    >({
      query: ({ query }) => ({
        url: endpoints.category,
        method: "GET",
        params: query,
        headers: {
          id: query?.id,
        },
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          dispatch(categoryAction.setSelectedCategory(result?.data?.data));
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
    manageSubCategory: builder.mutation<
      any,
      ManagePayload<SubCategoryPayload, Partial<CategoryQuery>>
    >({
      query: ({ data, query, id }) => {
        const { category, ...rest } = data;
        return {
          url: id ? endpoints.edit_category2 : endpoints.add_category2,
          // url: endpoints.category,
          // method: id ? "PUT" : "POST",
          method: "POST",
          body: rest,
          params: query,
          headers: {
            cat1: String(category),
          },
        };
      },
      async onQueryStarted({ options }, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result?.data?.status === 1) {
            options?.resetForm();
            options?.setSubmitting(false);
            toast.success(result?.data?.message || "Success");
            dispatch(coreAction.toggleModal({ open: false, type: "" }));
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

    deleteSubCategory: builder.mutation<
      any,
      ManagePayloadQuery<Partial<CategoryQuery>>
    >({
      query: ({ query }) => ({
        url: endpoints.category,
        method: "DELETE",
        params: query,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          if (result?.data?.status === 1) {
            dispatch(coreAction.toggleModal({ open: false, type: "" }));
            dispatch(categoryAction.resetWithReload());
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
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useManageCategoryMutation,
  useDeleteCategoryMutation,

  useGetSubCategoryByIdQuery,
  useManageSubCategoryMutation,
  useDeleteSubCategoryMutation,
} = categoryQuery;

export default categoryQuery;
