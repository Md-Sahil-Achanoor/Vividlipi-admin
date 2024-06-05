import { useAppDispatch, useAppSelector } from "@/app/store";
import CustomInput from "@/components/form/CustomInput";
import InfiniteSelect from "@/components/form/InfiniteSelect";
import Modal from "@/components/ui/Modal";
import { coreAction } from "@/feature/core/coreSlice";
import {
  useGetRolePermissionsQuery,
  useManageAdminUserMutation,
} from "@/feature/user-management/userManagementQuery";
import { userManagementAction } from "@/feature/user-management/userManagementSlice";
import {
  IUserManagementForm,
  userManagementFormSchema,
} from "@/models/user-management";
import { RolePermissionResponse } from "@/types";
import { cn } from "@/utils/twmerge";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { useEffect, useState } from "react";
import { BsArrowRightShort } from "react-icons/bs";

const initialValues: IUserManagementForm = {
  name: "",
  email: "",
  password: "",
  role: null,
};

const ManageAdminUser = () => {
  const { type, open } = useAppSelector((state) => state.core);
  const { selectedUser, singleUser } = useAppSelector(
    (state) => state.userManagement
  );
  const [manageAdminUser, { isLoading }] = useManageAdminUserMutation();
  const dispatch = useAppDispatch();
  const [viewPassword, setViewPassword] = useState(false);

  const handleModal = (type: string) => {
    if (type === "cancelled") {
      dispatch(coreAction.toggleModal({ open: false, type: "" }));
      dispatch(userManagementAction.setSelectedUser(null));
    }
  };

  console.log(`\n\n ~ ManageAdminUser ~ selectedUser:`, selectedUser);
  const onSubmit = async (
    values: IUserManagementForm,
    { setSubmitting, resetForm }: FormikHelpers<IUserManagementForm>
  ) => {
    // console.log("values", {
    //   ...values,
    //   role: Number(values?.role?.id),
    // });
    // return setSubmitting(false);
    const data = {
      ...values,
      role: Number(values?.role?.id),
    };
    await manageAdminUser({
      id: selectedUser?.id as number,
      data,
      options: {
        setSubmitting,
        resetForm,
      },
    });
  };

  const {
    isLoading: adminUserLoading,
    refetch: adminUserRefetch,
    data: adminUserList,
    isError: adminUserIsError,
    // error: adminUserErrorMessage,
  } = useGetRolePermissionsQuery(
    {
      query: {},
    },
    {
      skip: !open && type !== "manage-admin-user",
    }
  );

  useEffect(() => {
    if (open) {
      adminUserRefetch();
    }
  }, [open]);

  return (
    <Modal
      classes={
        type === "manage-admin-user" && open
          ? {
              top: "visible",
              body: `-translate-y-[0%] max-w-[400px] p-3 min-w-[400px]`,
            }
          : {
              top: "invisible",
              body: "-translate-y-[300%] max-w-[400px] p-3 min-w-[400px]",
            }
      }
      handleModal={handleModal}
      wrapperClass="h-full"
      headText={selectedUser?.id ? "Update User" : "Create User"}
      isModalHeader
      outSideClick
    >
      <div className="w-full h-full">
        <Formik
          initialValues={singleUser || initialValues}
          validationSchema={userManagementFormSchema}
          onSubmit={onSubmit}
          enableReinitialize
        >
          {({ isSubmitting, values, setFieldValue }) => (
            <Form noValidate>
              {/* {console.log(JSON.stringify(errors))} */}
              <div className="mt-2">
                <div>
                  <Field
                    label={"Role"}
                    name="role"
                    isRequired
                    renderData={adminUserList?.data}
                    isLoading={adminUserLoading}
                    isError={adminUserIsError}
                    // errorMessage={adminUserErrorMessage}
                    errorMessage={"Failed to fetch roles"}
                    renderItem={(item: RolePermissionResponse) => (
                      <span className="uppercase">{item?.Title}</span>
                    )}
                    isActive={(item: RolePermissionResponse) =>
                      values?.role?.id === item?.id
                    }
                    renderName={() => {
                      return (
                        <span
                          className={cn(
                            "text-sm text-gray-700 truncate",
                            values?.role?.Title && "uppercase"
                          )}
                        >
                          {values?.role?.Title || "Select Category"}
                        </span>
                      );
                    }}
                    onChangeCallback={(item: RolePermissionResponse) => {
                      setFieldValue(`role`, item);
                    }}
                    clearData={() => {
                      setFieldValue(`role`, null);
                    }}
                    isSelected={values?.role !== null}
                    component={InfiniteSelect}
                    isAuth
                  />
                </div>

                <Field
                  name="name"
                  label={"Name"}
                  type="text"
                  component={CustomInput}
                  placeholder="Type here..."
                  isRequired
                />

                <Field
                  name="email"
                  label={"Email"}
                  type="email"
                  component={CustomInput}
                  placeholder="Type here..."
                  isRequired
                />

                <Field
                  name="password"
                  label={"Password"}
                  type={viewPassword ? "text" : "password"}
                  component={CustomInput}
                  handleViewPassword={() => setViewPassword(!viewPassword)}
                  placeholder="Type here..."
                  isRequired
                  isPassword
                />
              </div>
              {/* <div className="flex"> */}
              <button
                type="submit"
                className="button_primary"
                disabled={isSubmitting || isLoading}
              >
                {isLoading || isSubmitting ? (
                  <>
                    <span className="w-5 h-5 border-2 animate-spin rounded-full border-transparent border-t-white mr-2"></span>
                    <span className="font-medium">Processing</span>
                  </>
                ) : (
                  <>
                    <span className="font-medium">
                      {selectedUser?.id ? "Update" : "Create"}
                    </span>
                    <span className="text-2xl ml-1">
                      <BsArrowRightShort />
                    </span>
                  </>
                )}
              </button>
              {/* </div> */}
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};

export default ManageAdminUser;
