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
} from "@/types";
import toast from "react-hot-toast";

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
        url: endpoints.category,
        method: "GET",
        params: query,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          // dispatch(categoryAction.setSelectedRole(result?.data?.data));
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
        query: {
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
        url: endpoints.delete_category1,
        method: "POST",
        // params: query,
        headers: {
          cat1: String(id),
        },
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          if (result?.data?.status === 1) {
            dispatch(coreAction.toggleModal({ open: false, type: "" }));
            // dispatch(categoryAction.resetWithReload());
            // dispatch(categoryAction.resetRole());
            dispatch(
              userManagementQuery.util.updateQueryData(
                "getRolePermissions",
                {
                  query: _arg.query,
                },
                (draft) => {
                  draft.data = draft?.data?.filter(
                    (item) => item?.id !== Number(_arg.id)
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

    // getAdminUsers: builder.query<
    //   ApiResponse<RolePermissionResponse[]>,
    //   ManageQuery<Partial<RolePermissionQuery>>
    // >({
    //   query: ({ query }) => {
    //     return {
    //       url: endpoints.subAdmin_list,
    //       method: "GET",
    //       params: query,
    //     };
    //   },
    //   providesTags: ["AdminUsers"],
    //   async onQueryStarted(_arg, { queryFulfilled }) {
    //     try {
    //       await queryFulfilled;
    //     } catch (err: unknown) {
    //       // do nothing
    //       const error = err as any;
    //       const message =
    //         error?.response?.data?.message || "Something went wrong!";
    //       toast.error(message);
    //     }
    //   },
    // }),

    // getSubRoleById: builder.query<
    //   ApiResponse<RolePermissionResponse>,
    //   ManageQuery<Partial<RolePermissionQuery>, null>
    // >({
    //   query: ({ query }) => ({
    //     url: endpoints.category,
    //     method: "GET",
    //     params: query,
    //     headers: {
    //       id: query?.id,
    //     },
    //   }),
    //   async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
    //     try {
    //       const result = await queryFulfilled;
    //       dispatch(categoryAction.setSelectedRole(result?.data?.data));
    //     } catch (err: unknown) {
    //       // do nothing
    //       const error = err as any;
    //       const message =
    //         error?.response?.data?.message || "Something went wrong!";
    //       toast.error(message);
    //     }
    //   },
    // }),

    // // POST
    // manageSubRole: builder.mutation<
    //   any,
    //   ManagePayload<SubRolePermissionPayLoad, Partial<RolePermissionQuery>>
    // >({
    //   query: ({ data, query, id }) => {
    //     const { category, ...rest } = data;
    //     const body: any = {
    //       ...rest,
    //     };
    //     if (id) {
    //       body.cat1id = category;
    //     }
    //     return {
    //       url: id ? endpoints.edit_category2 : endpoints.add_category2,
    //       // url: endpoints.category,
    //       // method: id ? "PUT" : "POST",
    //       method: "POST",
    //       body,
    //       params: query,
    //       headers: {
    //         cat1: String(category),
    //         cat2: id ? String(id) : "",
    //       },
    //     };
    //   },
    //   invalidatesTags: ["RoleList"],
    //   async onQueryStarted({ options }, { queryFulfilled, dispatch }) {
    //     try {
    //       const result = await queryFulfilled;
    //       if (result?.data?.status === 1) {
    //         options?.resetForm();
    //         options?.setSubmitting(false);
    //         toast.success(result?.data?.message || "Success");
    //         dispatch(coreAction.toggleModal({ open: false, type: "" }));
    //       } else {
    //         toast.error(result?.data?.message || "Something went wrong!");
    //       }
    //     } catch (err: unknown) {
    //       // do nothing
    //       options?.setSubmitting(false);
    //       const error = err as any;
    //       // console.log(`\n\n error:`, error);
    //       const message =
    //         error?.response?.data?.message || "Something went wrong!";
    //       toast.error(message);
    //     }
    //   },
    // }),

    // deleteSubRole: builder.mutation<
    //   any,
    //   ManagePayloadQuery<Partial<RolePermissionQuery>>
    // >({
    //   query: ({ id }) => ({
    //     url: endpoints.delete_category2,
    //     method: "POST",
    //     // params: query,
    //     headers: {
    //       cat2: String(id),
    //     },
    //   }),
    //   async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
    //     try {
    //       const result = await queryFulfilled;
    //       if (result?.data?.status === 1) {
    //         console.log(`\n\n _arg:`, _arg.query);
    //         dispatch(
    //           userManagementQuery.util.updateQueryData(
    //             "getCategories",
    //             {
    //               query: _arg.query,
    //             },
    //             (draft) => {
    //               draft.data = draft?.data?.filter(
    //                 (item) => item?.id !== Number(_arg.id)
    //               );
    //             }
    //           )
    //         );
    //         dispatch(coreAction.toggleModal({ open: false, type: "" }));
    //         dispatch(categoryAction.resetSubRole());
    //         toast.success(result?.data?.message || "Delete Successful!");
    //       } else {
    //         toast.error(result?.data?.message || "Something went wrong!");
    //       }
    //     } catch (err: unknown) {
    //       // do nothing
    //       const error = err as any;
    //       const message =
    //         error?.response?.data?.message || "Something went wrong!";
    //       toast.error(message);
    //     }
    //   },
    // }),
  }),
});

export const {
  useGetRolePermissionsQuery,
  useGetRolePermissionByIdQuery,
  useManageRolePermissionMutation,
  useDeleteRolePermissionMutation,
  // useGetAdminUsersQuery,
  // useGetSubRoleByIdQuery,
  // useManageSubRoleMutation,
  // useDeleteSubRoleMutation,
} = userManagementQuery;

export default userManagementQuery;
