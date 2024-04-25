import toast from "react-hot-toast";
import API from "../../app/services/api";
import { endpoints } from "../../constants/api/endpoints";
import { ApiResponse, ManagePayload } from "../../types";
import type {
  AuthResponse,
  LoginData,
  SignUpPayload,
  UserPasswordPayload,
} from "../../types/auth";
import { OperatorPayload } from "../../types/operator";
import { authAction } from "./authSlice";

const authQuery = API.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    signup: builder.mutation<any, SignUpPayload>({
      query: (user) => ({
        url: endpoints.login,
        method: "POST",
        body: user,
      }),
    }),

    // Login user
    signIn: builder.mutation<AuthResponse, ManagePayload<LoginData, any>>({
      query: ({ data }) => ({
        url: endpoints.login,
        method: "POST",
        body: data,
      }),
      async onQueryStarted({ options }, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const res = result.data;
          if (res?.status === 1) {
            dispatch(authAction.loginSuccess(res));
            localStorage.setItem("user", JSON.stringify(res));
            const role = res?.user?.role;
            if (options?.router) {
              if (role === "Admin") {
                toast.success("Signed in successfully");
                options?.router("/admin/dashboard");
              } else if (role === "Operator") {
                toast.success("Signed in successfully");
                options?.router("/operator/dashboard");
              } else if (role === "EventManager") {
                toast.success("Signed in successfully");
                options?.router("/event-manager/dashboard");
              } else if (role === "Saleman") {
                toast.success("Signed in successfully");
                options?.router("/ad-partner/dashboard");
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

    // operator
    operatorSignUp: builder.mutation<
      ApiResponse<string>,
      ManagePayload<OperatorPayload, any>
    >({
      query: ({ data, options }) => {
        let url =
          options?.conditions?.as === "operator"
            ? endpoints.operator_register
            : endpoints.eventmanager_register;
        return {
          url,
          method: "POST",
          body: data,
        };
      },
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          // console.log(`\n\n result:`, result);
          if (result?.data?.status === 1) {
            toast.success(
              "Signed up successfully. You can login after admin approval"
            );
            _arg?.options?.resetForm();
            _arg?.options?.setSubmitting(false);
            if (_arg?.options?.router) _arg?.options?.router("/account/login");
          } else {
            toast.error(result?.data?.data);
            _arg?.options?.setSubmitting(false);
          }
        } catch (err: unknown) {
          const error = err as any;
          const message = error?.response?.data?.message;
          toast.error(message || "Invalid Credentials");
        }
      },
    }),

    // update password
    updatePassword: builder.mutation<
      ApiResponse<{ message: string }>,
      ManagePayload<UserPasswordPayload>
    >({
      query: ({ data }) => ({
        url: endpoints.updatePassword,
        method: "POST",
        body: data,
      }),
      async onQueryStarted({ options }, { queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          const res = result.data;
          // setTimeout(() => {
          if (res?.status === 1) {
            const message = res?.message + ".\nPlease login again.";
            toast.success(message);
            options?.resetForm();
            options?.setSubmitting(false);
            localStorage.clear();
            options?.router && options?.router("/account/login");
            // removeValue("@user");
            // options?.router("Login");
          } else {
            toast.success(res?.message || "");
          }
          // }, 500);
        } catch (err: unknown) {
          const error = err as any;
          // console.log(`\n\ error:`, error);
          options?.setSubmitting(false);
          const message = error?.response?.data?.message;
          toast.success("Error", message || "Invalid Credentials");
        }
      },
    }),
  }),
});

export const {
  useSignupMutation,
  useSignInMutation,
  useOperatorSignUpMutation,
  useUpdatePasswordMutation,
} = authQuery;

export const { endpoints: signIn } = authQuery;

export default authQuery;
