import API from "@/app/services/api";
import { endpoints } from "@/constants/api/endpoints";
import { coreAction } from "@/feature/core/coreSlice";
import {
  ApiResponse,
  ManagePayload,
  ManagePayloadQuery,
  ManageQuery,
  RolePermissionPayLoad,
  RolePermissionQuery,
  RolePermissionResponse,
  UserManagementPayLoad,
  UserManagementResponse,
} from "@/types";
import toast from "react-hot-toast";
import { userManagementAction } from "./userManagementSlice";

const userManagementQuery = API.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    getRolePermissions: builder.query<
      ApiResponse<RolePermissionResponse[]>,
      ManageQuery<Partial<RolePermissionQuery>>
    >({
      query: ({ query }) => {
        return {
          url: endpoints.role_list,
          method: "GET",
          params: query,
        };
      },
      providesTags: ["RoleList"],
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

    getRolePermissionById: builder.query<
      ApiResponse<RolePermissionResponse>,
      ManageQuery<Partial<RolePermissionQuery>, null>
    >({
      query: ({ query }) => ({
        url: endpoints.role_list,
        method: "GET",
        params: query,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userManagementAction.setSelectedRolePermission(result?.data?.data)
          );
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
    manageRolePermission: builder.mutation<
      any,
      ManagePayload<RolePermissionPayLoad, Partial<RolePermissionQuery>>
    >({
      query: ({ data, id }) => ({
        url: endpoints.role_list,
        method: id ? "PUT" : "POST",
        body: data,
        params: {
          id,
        },
      }),
      invalidatesTags: ["RoleList"],
      async onQueryStarted({ options }, { queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          if (result?.data?.status === 1) {
            options?.resetForm();
            toast.success(result?.data?.message || "Success");
            options?.router?.("/admin/user-management/role-list");
          } else {
            toast.error(result?.data?.message || "Something went wrong!");
          }
          options?.setSubmitting(false);
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

    deleteRolePermission: builder.mutation<
      any,
      ManagePayloadQuery<Partial<RolePermissionQuery>>
    >({
      query: ({ id }) => ({
        url: endpoints.role_list,
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
              userManagementQuery.util.updateQueryData(
                "getRolePermissions",
                {
                  query: {},
                },
                (draft) => {
                  draft.data = draft?.data?.filter(
                    (item) => item?.id !== Number(_arg.id)
                  );
                }
              )
            );
            toast.success(result?.data?.message || "Delete Successful!");
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

    getAdminUsers: builder.query<
      ApiResponse<UserManagementResponse[]>,
      ManageQuery<Partial<RolePermissionQuery>>
    >({
      query: ({ query }) => {
        return {
          url: endpoints.subAdmin_list,
          method: "GET",
          params: query,
        };
      },
      providesTags: ["AdminUsers"],
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

    getAdminUserById: builder.query<
      ApiResponse<UserManagementResponse>,
      ManageQuery<Partial<RolePermissionQuery>, null>
    >({
      query: ({ query }) => ({
        url: endpoints.category,
        method: "GET",
        params: query,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          dispatch(userManagementAction.setSelectedUser(result?.data?.data));
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
    manageAdminUser: builder.mutation<
      any,
      ManagePayload<UserManagementPayLoad, Partial<RolePermissionQuery>>
    >({
      query: ({ data, id }) => {
        return {
          url: endpoints.subAdmin_list,
          method: id ? "PUT" : "POST",
          body: data,
          params: {
            id,
          },
        };
      },
      invalidatesTags: ["AdminUsers"],
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

    deleteAdminUser: builder.mutation<
      any,
      ManagePayloadQuery<Partial<RolePermissionQuery>>
    >({
      query: ({ id }) => ({
        url: endpoints.subAdmin_list,
        method: "DELETE",
        params: {
          id,
        },
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          if (result?.data?.status === 1) {
            // console.log(`\n\n _arg:`, _arg.query);
            dispatch(
              userManagementQuery.util.updateQueryData(
                "getAdminUsers",
                {
                  query: {},
                },
                (draft) => {
                  draft.data = draft?.data?.filter(
                    (item) => item?.id !== Number(_arg.id)
                  );
                }
              )
            );
            dispatch(coreAction.toggleModal({ open: false, type: "" }));
            // dispatch(categoryAction.resetSubRole());
            toast.success(result?.data?.message || "Delete Successful!");
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
  useGetRolePermissionsQuery,
  useGetRolePermissionByIdQuery,
  useManageRolePermissionMutation,
  useDeleteRolePermissionMutation,

  useGetAdminUsersQuery,
  useGetAdminUserByIdQuery,
  useManageAdminUserMutation,
  useDeleteAdminUserMutation,
} = userManagementQuery;

export default userManagementQuery;
