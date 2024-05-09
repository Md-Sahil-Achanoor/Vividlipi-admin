import API from "@/app/services/api";
import { endpoints } from "@/constants/api/endpoints";
import { ISignIn } from "@/models/auth/signup-validation";
import { ManagePayload } from "@/types";
import type { AuthResponse } from "@/types/auth";
import toast from "react-hot-toast";
import { authAction } from "./authSlice";

const authQuery = API.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    signup: builder.mutation<any, any>({
      query: (user) => ({
        url: endpoints.login,
        method: "POST",
        body: user,
      }),
    }),

    // Login user
    signIn: builder.mutation<AuthResponse, ManagePayload<ISignIn, any>>({
      query: ({ data }) => ({
        url: endpoints.login,
        method: "POST",
        body: data,
      }),
      async onQueryStarted({ options }, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const res = result.data;
          console.log(res);
          if (res?.status === 1) {
            dispatch(authAction.loginSuccess(res));
            localStorage.setItem("user", JSON.stringify(res));
            const role = res?.user?.role;
            // console.log(role, "role", role === "admin");
            if (options?.router) {
              if (role === "admin") {
                toast.success("Signed in successfully");
                options?.router("/admin/dashboard");
              } else {
                toast.error("Invalid Role");
              }
            }
            options?.resetForm();
            options?.setSubmitting(false);
          } else {
            toast.error(res?.message);
          }
        } catch (err: unknown) {
          const error = err as any;
          const message = error?.response?.data?.message;
          toast.error(message || "Something went wrong!");
        }
      },
    }),

    // update password
    // updatePassword: builder.mutation<
    //   ApiResponse<{ message: string }>,
    //   ManagePayload<UserPasswordPayload>
    // >({
    //   query: ({ data }) => ({
    //     url: endpoints.login,
    //     method: "POST",
    //     body: data,
    //   }),
    //   async onQueryStarted({ options }, { queryFulfilled }) {
    //     try {
    //       const result = await queryFulfilled;
    //       const res = result.data;
    //       // setTimeout(() => {
    //       if (res?.status === 1) {
    //         const message = res?.message + ".\nPlease login again.";
    //         toast.success(message);
    //         options?.resetForm();
    //         options?.setSubmitting(false);
    //         localStorage.clear();
    //         options?.router && options?.router("/account/login");
    //         // removeValue("@user");
    //         // options?.router("Login");
    //       } else {
    //         toast.success(res?.message || "");
    //       }
    //       // }, 500);
    //     } catch (err: unknown) {
    //       const error = err as any;
    //       // console.log(`\n\ error:`, error);
    //       options?.setSubmitting(false);
    //       const message = error?.response?.data?.message;
    //       toast.success("Error", message || "Invalid Credentials");
    //     }
    //   },
    // }),
  }),
});

export const {
  useSignupMutation,
  useSignInMutation,
  // useUpdatePasswordMutation,
} = authQuery;

export const { endpoints: signIn } = authQuery;

export default authQuery;
