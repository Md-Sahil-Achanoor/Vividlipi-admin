import { AxiosProgressEvent } from "axios";
import toast from "react-hot-toast";
import API from "../../app/services/api";
import { endpoints } from "../../constants/api/endpoints";
import { ManagePayload } from "../../types";
import {
  BulkUploadQuery,
  GlobalSearchPayload,
  GlobalSearchResponse,
  bulkUploadPayload,
} from "../../types/common/common";
import { POST } from "../../utils/axios.config";
import { coreAction } from "../core/coreSlice";
import { commonAction } from "./commonSlice";

const commonQuery = API.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    uploadImage: builder.mutation<any, FormData>({
      query: (data: FormData) => ({
        url: "/v1/courses/image-upload",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    }),
    upload: builder.mutation({
      queryFn: async ({ url, data }: { url: string; data: FormData }, api) => {
        try {
          const result = await POST(url, data, {
            //...other options like headers here
            onUploadProgress: (upload: AxiosProgressEvent) => {
              //Set the progress value to show the progress bar
              if (upload?.total) {
                // console.log(`\n\n queryFn: ~ upload:`, upload);
                const progress = Math.round(
                  (100 * upload?.loaded) / upload?.total
                );
                // console.log(`\n\n  progress:`, progress);
                api.dispatch(commonAction.setProgress(progress));
              }
            },
          });
          // console.log(`\n\nqueryFn: ~ result:`, result);
          return { data: result };
        } catch (axiosError: any) {
          const err: any = axiosError;
          return {
            error: {
              status: err.response?.status,
              data: err.response?.data || err?.message,
            },
          };
        } finally {
          api.dispatch(commonAction.setProgress(0));
        }
      },
      // transformResponse: (response: any) => response,
      // transformErrorResponse: (data: ErrorType) => data,
    }),

    // bulk upload
    bulkUpload: builder.mutation<
      any,
      ManagePayload<bulkUploadPayload, BulkUploadQuery>
    >({
      query: ({ data, query }) => ({
        url: query?.endpoint as string,
        method: "POST",
        body: data,
        // headers: {
        //   "Content-Type": "multipart/form-data",
        // },
      }),
      async onQueryStarted({ options }, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          // console.log(`\n\n onQueryStarted: ~ result:`, result);
          if (result?.data?.status === 1) {
            dispatch(commonAction.setRerenderBulk());
          }
          const message = `${result?.data?.message} with ${result?.data?.Counts?.Imported} Success and ${result?.data?.Counts?.Duplicates} Duplicates`;
          toast.success(message);
          options?.resetForm();
          dispatch(
            coreAction.toggleModal({
              open: false,
              type: "",
            })
          );
          // dispatch(commonAction.setBulkUploadStatus(true));
        } catch (err) {
          const error = err as any;
          const message =
            error?.response?.data?.message || "Something went wrong!";
          toast.error(message);
        } finally {
          options?.setSubmitting(false);
        }
      },
    }),

    // global search
    globalSearch: builder.query<
      GlobalSearchResponse,
      ManagePayload<GlobalSearchPayload>
    >({
      query: ({ data }) => ({
        url: endpoints.login,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          // const data = response?.data?.data;
          // dispatch(commonAction.setGlobalSearch(data));
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
  useUploadImageMutation,
  useUploadMutation,
  useBulkUploadMutation,
  useGlobalSearchQuery,
} = commonQuery;
export default commonQuery;
