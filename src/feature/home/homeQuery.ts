import toast from "react-hot-toast";
import API from "../../app/services/api";
import { endpoints } from "../../constants/endpoints";
import {
  ApiResponse,
  FeatureSliderQuery,
  FeatureSliderResponse,
  ManagePayload,
  ManagePayloadQuery,
  ManageQuery,
} from "../../types";
import { coreAction } from "../core/coreSlice";

const homeQuery = API.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
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

    // POST
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

    deleteFeatureSlide: builder.mutation<
      any,
      ManagePayloadQuery<Partial<FeatureSliderQuery>>
    >({
      query: ({ id }) => ({
        url: endpoints.delete_home_slider,
        method: "DELETE",
        params: {
          id,
        },
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          if (result?.data?.status === 1) {
            dispatch(coreAction.toggleModal({ open: false, type: "" }));
            dispatch(
              homeQuery.util.updateQueryData(
                "getHomeFeatureSlider",
                {
                  query: _arg.query,
                },
                (draft) => {
                  draft.data = draft?.data?.filter(
                    (item) => item?.id !== _arg.id
                  );
                }
              )
            );
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
} = homeQuery;

export default homeQuery;
