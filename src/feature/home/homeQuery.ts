import toast from "react-hot-toast";
import API from "../../app/services/api";
import { endpoints } from "../../constants/endpoints";
import {
  ApiResponse,
  FeatureProductPayload,
  FeatureProductQuery,
  FeatureProductResponse,
  FeatureSliderQuery,
  FeatureSliderResponse,
  FeatureSubSliderQuery,
  FeatureSubSliderResponse,
  ManagePayload,
  ManagePayloadQuery,
  ManageQuery,
} from "../../types";
import { coreAction } from "../core/coreSlice";
import { homeAction } from "./homeSlice";

const homeQuery = API.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    /**
     * **************** ----------------------------- ****************
     * **************** @module FeatureSlider Module ****************
     * **************** ----------------------------- ****************
     * */

    /**
     * @module GetFeatureSliders
     * @param { Partial<FeatureSliderQuery> }
     * @returns { ApiResponse<FeatureSliderResponse[]> }
     * @description Get Home Feature Slider List
     */
    getHomeFeatureSlider: builder.query<
      ApiResponse<FeatureSliderResponse[]>,
      ManageQuery<Partial<FeatureSliderQuery>>
    >({
      query: ({ query }) => {
        return {
          url: endpoints.list_home_slider,
          method: "GET",
          params: query,
        };
      },
      providesTags: ["HomeFeatureSlider"],
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (err: unknown) {
          // do nothing
          const error = err as any;
          const message =
            error?.response?.data?.message || "Something went wrong!";
          toast.error(message);
        }
      },
    }),

    /**
     * @module ManageFeatureSlider
     * @param { FormData }
     * @returns { any }
     * @description Manage Home Feature Slider
     */
    manageFeatureSlide: builder.mutation<any, ManagePayload<FormData>>({
      query: ({ data, id }) => {
        return {
          url: id ? endpoints.edit_home_slider : endpoints.add_home_slider,
          method: "POST",
          body: data,
          params: {
            sliderid: id,
          },
        };
      },
      invalidatesTags: ["HomeFeatureSlider"],
      async onQueryStarted({ options }, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result?.data?.status === 1) {
            options?.resetForm();
            options?.setSubmitting(false);
            toast.success(result?.data?.message || "Success");
            dispatch(homeAction.resetHome());
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

    /**
     * @module DeleteFeatureSlider
     * @param { Partial<FeatureSliderQuery> }
     * @returns { any }
     * @description Delete Home Feature Slider
     */
    deleteFeatureSlide: builder.mutation<
      any,
      ManagePayloadQuery<Partial<FeatureSliderQuery>>
    >({
      query: ({ id }) => ({
        url: endpoints.delete_home_slider,
        method: "DELETE",
        params: {
          picid: id,
        },
      }),
      invalidatesTags: ["HomeFeatureSlider"],
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          // console.log(`\n\n result:`, result?.data, _arg.query, _arg.id);
          if (result?.data?.status === 1) {
            toast.success(result?.data?.message || "Success");
            // dispatch(
            //   homeQuery.util.updateQueryData(
            //     "getHomeFeatureSlider",
            //     {
            //       query: _arg.query,
            //     },
            //     (draft) => {
            //       draft.data = draft?.data?.filter(
            //         (item) => Number(item?.id) !== Number(_arg.id)
            //       );
            //     }
            //   )
            // );
            dispatch(homeAction.resetHome());
            dispatch(coreAction.toggleModal({ open: false, type: "" }));
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

    /**
     * **************** ----------------------------- ****************
     * **************** @module FeatureSubSlider Module ****************
     * **************** ----------------------------- ****************
     * */

    /**
     *  * @module GetFeatureSubSlider
     *  * @param { Partial<FeatureSubSliderQuery> }
     *  * @returns { ApiResponse<FeatureSubSliderResponse[]> }
     * */
    getHomeFeatureSubSlider: builder.query<
      ApiResponse<FeatureSubSliderResponse[]>,
      ManageQuery<Partial<FeatureSubSliderQuery>>
    >({
      query: ({ query }) => {
        return {
          url: endpoints.list_home_sub_slider,
          method: "GET",
          params: query,
        };
      },
      providesTags: ["HomeFeatureSubSlider"],
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (err: unknown) {
          // do nothing
          const error = err as any;
          const message =
            error?.response?.data?.message || "Something went wrong!";
          toast.error(message);
        }
      },
    }),

    /**
     * @module ManageFeatureSubSlider
     * @param { FormData }
     * @returns { any }
     * @description Manage Home Feature Sub Slider
     */
    manageFeatureSubSlide: builder.mutation<any, ManagePayload<FormData>>({
      query: ({ data, id }) => {
        return {
          url: id
            ? endpoints.edit_home_sub_slider
            : endpoints.add_home_sub_slider,
          method: "POST",
          body: data,
          params: {
            sliderid: id,
          },
        };
      },
      invalidatesTags: ["HomeFeatureSubSlider"],
      async onQueryStarted({ options }, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result?.data?.status === 1) {
            options?.resetForm();
            options?.setSubmitting(false);
            toast.success(result?.data?.message || "Success");
            dispatch(homeAction.resetHome());
            dispatch(coreAction.toggleModal({ open: false, type: "" }));
          } else {
            toast.error(result?.data?.message || "Something went wrong!");
          }
        } catch (err: unknown) {
          // do nothing
          options?.setSubmitting(false);
          const error = err as any;
          const message =
            error?.response?.data?.message || "Something went wrong!";
          toast.error(message);
        }
      },
    }),

    /**
     * @module DeleteFeatureSubSlider
     * @param { Partial<FeatureSubSliderQuery> }
     * @returns { any }
     * @description Delete Home Feature Sub Slider
     */
    deleteFeatureSubSlide: builder.mutation<
      any,
      ManagePayloadQuery<Partial<FeatureSubSliderQuery>>
    >({
      query: ({ id }) => ({
        url: endpoints.delete_home_sub_slider,
        method: "DELETE",
        params: {
          picid: id,
        },
      }),
      invalidatesTags: ["HomeFeatureSubSlider"],
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          if (result?.data?.status === 1) {
            toast.success(result?.data?.message || "Success");
            dispatch(homeAction.resetHome());
            dispatch(coreAction.toggleModal({ open: false, type: "" }));
            // dispatch(
            //   homeQuery.util.updateQueryData(
            //     "getHomeFeatureSubSlider",
            //     {
            //       query: _arg.query,
            //     },
            //     (draft) => {
            //       draft.data = draft?.data?.filter(
            //         (item) => item?.id !== _arg.id
            //       );
            //     }
            //   )
            // );
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

    /**
     * **************** ----------------------------- ****************
     * **************** @module FeatureProduct Module ****************
     * **************** ----------------------------- ****************
     * */

    /**
     * @module GetFeatureProducts
     * @param { Partial<FeatureProductPayload> }
     * @returns { any }
     * @description  Home Feature Products
     */
    getHomeFeatureProducts: builder.query<
      ApiResponse<FeatureProductResponse[]>,
      ManageQuery<Partial<FeatureProductQuery>>
    >({
      query: ({ query }) => {
        return {
          url: endpoints.list_home_product,
          method: "GET",
          params: query,
        };
      },
      providesTags: ["HomeFeatureProducts"],
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (err: unknown) {
          // do nothing
          const error = err as any;
          const message =
            error?.response?.data?.message || "Something went wrong!";
          toast.error(message);
        }
      },
    }),

    /**
     * @module ManageFeatureProducts
     * @param { FormData }
     * @returns { any }
     * @description Manage Home Feature Products
     */
    manageFeatureProduct: builder.mutation<
      any,
      ManagePayload<FeatureProductPayload>
    >({
      query: ({ data, id }) => {
        return {
          url: id ? endpoints.edit_home_product : endpoints.add_home_product,
          method: "POST",
          body: data,
          params: {
            sliderid: id,
          },
        };
      },
      invalidatesTags: ["HomeFeatureProducts"],
      async onQueryStarted({ options }, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result?.data?.status === 1) {
            options?.resetForm();
            options?.setSubmitting(false);
            toast.success(result?.data?.message || "Success");
            dispatch(homeAction.resetHome());
            dispatch(coreAction.toggleModal({ open: false, type: "" }));
          } else {
            toast.error(result?.data?.message || "Something went wrong!");
          }
        } catch (err: unknown) {
          // do nothing
          options?.setSubmitting(false);
          const error = err as any;
          const message =
            error?.response?.data?.message || "Something went wrong!";
          toast.error(message);
        }
      },
    }),

    /**
     * @module DeleteFeatureProducts
     * @param { Partial<FeatureProductQuery> }
     * @returns { any }
     * @description Delete Home Feature Products
     */

    deleteFeatureProduct: builder.mutation<
      any,
      ManagePayloadQuery<Partial<FeatureProductQuery>>
    >({
      query: ({ id }) => ({
        url: endpoints.delete_home_product,
        method: "DELETE",
        params: {
          productId: id,
        },
      }),
      invalidatesTags: ["HomeFeatureProducts"],
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          if (result?.data?.status === 1) {
            toast.success(result?.data?.message || "Success");
            dispatch(homeAction.resetHome());
            dispatch(coreAction.toggleModal({ open: false, type: "" }));
            // dispatch(
            //   homeQuery.util.updateQueryData(
            //     "getHomeFeatureProducts",
            //     {
            //       query: _arg.query,
            //     },
            //     (draft) => {
            //       draft.data = draft?.data?.filter(
            //         (item) => item?.id !== _arg.id
            //       );
            //     }
            //   )
            // );
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
  useGetHomeFeatureSliderQuery,
  useManageFeatureSlideMutation,
  useDeleteFeatureSlideMutation,

  useGetHomeFeatureSubSliderQuery,
  useManageFeatureSubSlideMutation,
  useDeleteFeatureSubSlideMutation,

  useGetHomeFeatureProductsQuery,
  useManageFeatureProductMutation,
  useDeleteFeatureProductMutation,
} = homeQuery;

export default homeQuery;
