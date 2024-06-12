import config from "@/config/config";
import type { Middleware } from "@reduxjs/toolkit";
import { isRejectedWithValue } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import toast from "react-hot-toast";
import { RootState } from "../store";

/**
 * Log a warning and show a toast!
 */
export const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
  // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
  if (isRejectedWithValue(action)) {
    console.warn("We got a rejected action!");
    const { data } = action.payload;
    // console.log(`\n\n ~ file: api.ts:16 ~ data:`, data);
    if (data?.error === "JWT Token is Expired") {
      toast.error(data?.error);
      localStorage.clear();
      window.location.href = "/account/login";
    }
  }
  return next(action);
};

// Create our baseQuery instance
const baseQuery = fetchBaseQuery({
  baseUrl: config.baseURL,
  prepareHeaders: (headers, { getState }) => {
    // By default, if we have a token in the store, let's use that for authenticated requests
    const store = getState() as RootState;
    const token = store.auth?.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// const baseQueryWithRetry = retry(baseQuery, { maxRetries: 3 });

/**
 * Create a base API to inject endpoints into elsewhere.
 * Components using this API should import from the injected site,
 * in order to get the appropriate types,
 * and to ensure that the file injecting the endpoints is loaded
 */
const API = createApi({
  /**
   * `reducerPath` is optional and will not be required by most users.
   * This is useful if you have multiple API definitions,
   * e.g. where each has a different domain, with no interaction between endpoints.
   * Otherwise, a single API definition should be used in order to support tag invalidation,
   * among other features
   */
  reducerPath: "splitApi",
  /**
   * A bare bones base query would just be `baseQuery: fetchBaseQuery({ baseUrl: '/' })`
   */
  baseQuery,
  /**
   * Tag types must be defined in the original API definition
   * for any tags that would be provided by injected endpoints
   */
  tagTypes: [
    "Profile",
    "Category",
    "Product",
    "AdminUsers",
    "RoleList",
    "Publisher",
    "HomeFeatureSlider",
    "HomeFeatureSubSlider",
    "HomeFeatureProducts",
    "NewInProduct",
    "NewInProductToggle",
  ],
  /**
   * This api has endpoints injected in adjacent files,
   * which is why no endpoints are shown below.
   * If you want all endpoints defined in the same file, they could be included here instead
   */
  endpoints: () => ({}),
});

// Enhance api for caching
export const enhancedApi = API.enhanceEndpoints({
  addTagTypes: [],
  // // Add endpoints here, like:
  // endpoints: {
  //   createSchool: {
  //     invalidatesTags: ["School"],
  //   },
  //   // batch
  //   getBatch: {
  //     providesTags: ["Batch"],
  //   },
  //   manageBatch: {
  //     invalidatesTags: ["Batch"],
  //   },
  // },
});

export default API;
